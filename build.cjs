const fs = require("node:fs");
const path = require("node:path");
require("./assets/config.js");
require("./assets/render.js");

const config = globalThis.CLEARWATER;
const render = globalThis.ClearwaterRender;
const {esc} = render;
const theme = {...config.theme,...config.presets[config.defaultTheme]};
const tokens = Object.entries(theme)
  .map(([key,value]) => "  --" + key + ": " + (key.endsWith("Font") ? JSON.stringify(value) : value) + ";")
  .join("\n");
fs.writeFileSync(path.join(__dirname,"assets","tokens.css"),":root {\n" + tokens + "\n  --ease: cubic-bezier(0.22, 1, 0.36, 1);\n}\n");

const names = new Set();
for (const id of render.pages) {
  if (!/^[a-z0-9-]+$/.test(id) || names.has(id)) throw new Error("Invalid or duplicate page slug: " + id);
  names.add(id);
  const {title,description,image} = render.metadata(id);
  const website = config.clinic.website;
  const absolute = src => website ? new URL(src,website.endsWith("/") ? website : website+"/").href : src;
  const ogUrl = website ? '<meta property="og:url" content="' + esc(absolute(id+".html")) + '">' : "";
  const schema = JSON.stringify(render.schema()).replace(/</g,"\\u003c");
  const html = '<!doctype html>\n<html lang="en-PK">\n<head>\n' +
    '<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '<title>' + esc(title) + '</title>\n<meta name="description" data-meta="description" content="' + esc(description) + '">\n' +
    '<meta property="og:type" content="website">\n<meta property="og:locale" content="en_PK">\n' +
    '<meta property="og:title" data-meta="og:title" content="' + esc(title) + '">\n' +
    '<meta property="og:description" data-meta="og:description" content="' + esc(description) + '">\n' +
    '<meta property="og:image" data-meta="og:image" content="' + esc(image ? absolute(image) : "") + '">\n' + ogUrl + '\n' +
    (config.clinic.demo ? '<meta name="robots" content="noindex, nofollow">\n' : '') +
    '<script type="application/ld+json" id="dentist-schema">' + schema + '</script>\n' +
    '<link rel="stylesheet" href="assets/site.css">\n' +
    '<script defer src="assets/config.js"></script>\n<script defer src="assets/render.js"></script>\n<script defer src="assets/site.js"></script>\n' +
    '<noscript><style>.menu-button,.to-top,[data-dismiss]{display:none}.desktop-nav{display:flex;flex-wrap:wrap;gap:12px}</style></noscript>\n' +
    '</head>\n<body data-page="' + esc(id) + '">\n<div id="site">' + render.markup(id) + '</div>\n</body>\n</html>\n';
  fs.writeFileSync(path.join(__dirname,id+".html"),html);
}
console.log("Built " + names.size + " static pages.");

