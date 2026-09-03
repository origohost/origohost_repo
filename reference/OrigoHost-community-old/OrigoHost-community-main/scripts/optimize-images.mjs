import fs from "fs";
import path from "path";
import sharp from "sharp";

async function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fileDir = path.join(dir, file);
    const stat = fs.statSync(fileDir);
    if (stat && stat.isDirectory()) {
      results = results.concat(await walk(fileDir));
    } else if (fileDir.match(/\.(png|jpe?g)$/i)) {
      results.push(fileDir);
    }
  }
  return results;
}

async function run() {
  const files = [...(await walk("public")), ...(await walk("src/assets"))];
  let saved = 0;
  let total = 0;
  for (const file of files) {
    const stat = fs.statSync(file);
    total += stat.size;
    const parsed = path.parse(file);
    const avifOut = path.join(parsed.dir, `${parsed.name}.avif`);
    const webpOut = path.join(parsed.dir, `${parsed.name}.webp`);

    // Create AVIF
    if (!fs.existsSync(avifOut)) {
      await sharp(file).avif({ quality: 65, speed: 5 }).toFile(avifOut);
      console.log(`Created ${avifOut}`);
    }

    // Create WebP
    if (!fs.existsSync(webpOut)) {
      await sharp(file).webp({ quality: 78 }).toFile(webpOut);
      console.log(`Created ${webpOut}`);
    }
  }
}
run().catch(console.error);
