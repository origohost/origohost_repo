const fs = require("fs");

const path = "./src/components/motion/primitives.tsx";
let content = fs.readFileSync(path, "utf8");

// Upgrade easing to Apple-tier
content = content.replace(/\[0.2, 0.7, 0.2, 1\]/g, "[0.16, 1, 0.3, 1]");

// Force hardware acceleration by injecting will-change: transform
// Add style={{ willChange: "transform, opacity" }} safely where possible, or just let Framer handle it internally.
// Framer Motion actually does a great job of using hardware acceleration for transform/opacity,
// so upgrading the ease and spring configurations is the biggest win.

fs.writeFileSync(path, content, "utf8");
console.log("Optimized motion primitives.");
