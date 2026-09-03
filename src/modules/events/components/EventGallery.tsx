import React from "react";
import { m as motion } from "framer-motion";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface EventGalleryProps {
  gallery: { id: string; image_url: string; caption?: string }[];
}

export const EventGallery = React.memo(function EventGallery({ gallery }: EventGalleryProps) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="py-12">
      <h2 className="text-3xl font-black text-gray-900 mb-8">Event Gallery</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((img, idx) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100"
          >
            <OptimizedImage
              src={img.image_url}
              alt={img.caption || "Event Gallery"}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              containerClassName="w-full h-full"
            />
            {img.caption && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium">{img.caption}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
});
