import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
// Using global crypto for UUIDs
// Cloudinary config is now initialized dynamically inside the server function.

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Helper to verify magic bytes
function isRealPDF(buffer: Uint8Array): boolean {
  const arr = buffer.subarray(0, 5);
  return String.fromCharCode(...arr) === "%PDF-";
}

function isRealImage(buffer: Uint8Array): boolean {
  const arr = buffer.subarray(0, 4);
  const hex = Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
  // JPEG (FF D8 FF), PNG (89 50 4E 47), GIF (47 49 46 38), WEBP (52 49 46 46)
  if (hex.startsWith("FFD8FF") || hex === "89504E47" || hex === "47494638" || hex === "52494646") {
    return true;
  }
  
  // Basic SVG check
  const text = new TextDecoder().decode(buffer.subarray(0, 100)).trim();
  if (text.toLowerCase().includes("<svg") || text.toLowerCase().includes("<?xml")) {
    return true;
  }
  
  return false;
}

export const secureUploadFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(
    (d: {
      fileData: string;
      fileName: string;
      mimeType: string;
      bucket: string;
      allowedType?: "pdf" | "image";
    }) => d,
  )
  .handler(async (ctx) => {
    const { fileData, fileName, mimeType, bucket, allowedType = "pdf" } = ctx.data;
    
    // Basic validation
    if (bucket !== "secure_resumes" && bucket !== "sponsor_assets") {
      throw new Error("Invalid bucket destination.");
    }

    // Strict MIME check
    if (allowedType === "pdf") {
      if (mimeType !== "application/pdf" || !fileName.toLowerCase().endsWith(".pdf")) {
        throw new Error("Only PDF files are allowed.");
      }
    } else if (allowedType === "image") {
      if (
        !mimeType.startsWith("image/") ||
        (!fileName.toLowerCase().endsWith(".png") &&
          !fileName.toLowerCase().endsWith(".jpg") &&
          !fileName.toLowerCase().endsWith(".jpeg") &&
          !fileName.toLowerCase().endsWith(".gif") &&
          !fileName.toLowerCase().endsWith(".svg") &&
          !fileName.toLowerCase().endsWith(".webp"))
      ) {
        throw new Error("Only PNG, JPEG, GIF, SVG, or WebP images are allowed.");
      }
    }

    // Convert base64 to buffer
    const base64Data = fileData.split(",")[1] || fileData;
    const buffer = Buffer.from(base64Data, "base64");

    // Size limit
    if (buffer.length > MAX_FILE_SIZE) {
      throw new Error("File exceeds 5MB limit.");
    }

    // Magic Bytes Verification (OWASP)
    if (allowedType === "pdf" && !isRealPDF(buffer)) {
      throw new Error("Invalid file format. Magic bytes do not match PDF.");
    } else if (allowedType === "image" && !isRealImage(buffer)) {
      throw new Error("Invalid file format. Magic bytes do not match Image.");
    }

    // Malware/JS stripped via buffer validation (simulate deep scan)
    if (allowedType === "pdf") {
      const pdfContent = buffer.toString("binary");
      if (pdfContent.includes("/JavaScript") || pdfContent.includes("/JS")) {
        throw new Error("Malicious active content (JavaScript) detected in PDF.");
      }
      if (pdfContent.includes("/Encrypt")) {
        throw new Error("Password protected or encrypted PDFs are not allowed.");
      }

      // UUID renaming to prevent path traversal & XSS
      const secureFileName = `${crypto.randomUUID()}.pdf`;

      // Upload to Supabase Secure Bucket
      const { data, error } = await supabase.storage.from(bucket).upload(secureFileName, buffer, {
        contentType: mimeType,
        upsert: false,
      });

      if (error) {
        console.error("[Upload Error]", error.message);
        throw new Error("Storage service unavailable.");
      }

      // Log the successful upload event
      await supabase.from("security_audit_logs").insert({
        action: "SECURE_FILE_UPLOAD",
        metadata: { bucket, secureFileName, originalSize: buffer.length, allowedType },
      });

      // Return the safe UUID path
      return { success: true, path: data.path, provider: "supabase" };
    } else {
      // Image Upload to Cloudinary
      try {
        const cloudinaryModule = await import("cloudinary");
        const cloudinary = cloudinaryModule.v2;
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const uploadResponse = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: bucket, // Use bucket name as Cloudinary folder
              public_id: crypto.randomUUID(),
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          
          uploadStream.end(buffer);
        });

        // Log the successful upload event
        await supabase.from("security_audit_logs").insert({
          action: "SECURE_FILE_UPLOAD_CLOUDINARY",
          metadata: { bucket, secureFileName: uploadResponse.public_id, originalSize: buffer.length, allowedType },
        });

        // Return the ready-to-use Cloudinary URL
        return { success: true, path: uploadResponse.secure_url, provider: "cloudinary" };
      } catch (err: any) {
        console.error("[Cloudinary Upload Error]", err);
        throw new Error("Storage service unavailable.");
      }
    }
  });
