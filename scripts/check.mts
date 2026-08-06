import { readdirSync } from "node:fs";
import { join } from "node:path";
import { PROCEDURES } from "./data.mjs";

let bad = 0;
for (const p of PROCEDURES) {
  const dir = p.imagesDir ? join(p.dir, p.imagesDir) : p.dir;
  const imgs = readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f));
  const ok = imgs.length === p.steps.length;
  if (!ok) bad++;
  console.log(
    `${ok ? "✓" : "✗"} ${p.key.padEnd(20)} ảnh=${String(imgs.length).padStart(2)} caption=${String(p.steps.length).padStart(2)}  ${p.registrationUrl}`,
  );
}
console.log(bad ? `\n${bad} thủ tục lệch số ảnh/caption` : "\nTất cả khớp.");
