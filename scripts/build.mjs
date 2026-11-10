// Build de produção: gera a pasta dist/ com tudo minificado.
//  1. compila o SASS já comprimido (sem espaços nem comentários)
//  2. coloca esse CSS direto no <head> (CSS crítico inline = zero requisição bloqueante)
//  3. minifica o HTML
//  4. copia fontes, imagens otimizadas e favicon
// Uso: npm run build
import * as sass from "sass";
import { minify } from "html-minifier-terser";
import { readFile, writeFile, mkdir, cp, readdir, rm } from "node:fs/promises";

const DIST = "dist";
await rm(DIST, { recursive: true, force: true });
await mkdir(`${DIST}/img`, { recursive: true });

// 1) SASS -> CSS comprimido
const { css } = sass.compile("scss/estilos.scss", { style: "compressed" });

// 2) Troca o <link> do CSS por um <style> com o conteúdo
let html = await readFile("index.html", "utf8");
const link = '<link rel="stylesheet" href="css/estilos.css">';
if (!html.includes(link)) throw new Error("Não encontrei o <link> do CSS no index.html");
html = html.replace(link, `<style>${css}</style>`);

// 3) HTML minificado
const minificado = await minify(html, {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
});
await writeFile(`${DIST}/index.html`, minificado);

// 4) Arquivos estáticos (as fotos originais ficam de fora)
await cp("fonts", `${DIST}/fonts`, { recursive: true });
await cp("favicon.svg", `${DIST}/favicon.svg`);
for (const arquivo of await readdir("img")) {
  if (/\.(avif|webp|jpg)$/.test(arquivo)) await cp(`img/${arquivo}`, `${DIST}/img/${arquivo}`);
}

const kb = (texto) => (Buffer.byteLength(texto) / 1024).toFixed(1);
console.log(`HTML original: ${kb(await readFile("index.html", "utf8"))} KB | CSS comprimido: ${kb(css)} KB`);
console.log(`dist/index.html (HTML + CSS inline, minificado): ${kb(minificado)} KB`);
