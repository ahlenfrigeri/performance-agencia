// Gera versões otimizadas das fotos: AVIF, WebP e JPG (fallback) em 3 larguras.
// Uso: npm run imagens
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";

const ORIGEM = "img/original";
const DESTINO = "img";
const LARGURAS = [480, 960, 1440];

await mkdir(DESTINO, { recursive: true });

for (const arquivo of await readdir(ORIGEM)) {
  const { name } = parse(arquivo);
  const entrada = join(ORIGEM, arquivo);

  for (const largura of LARGURAS) {
    // resize mantém a proporção 4:3; withoutEnlargement nunca aumenta a foto
    const base = sharp(entrada).resize({ width: largura, withoutEnlargement: true });

    await base.clone().avif({ quality: 50, effort: 6 }).toFile(join(DESTINO, `${name}-${largura}.avif`));
    await base.clone().webp({ quality: 70 }).toFile(join(DESTINO, `${name}-${largura}.webp`));
    await base.clone().jpeg({ quality: 72, progressive: true, mozjpeg: true }).toFile(join(DESTINO, `${name}-${largura}.jpg`));
  }

  const original = (await stat(entrada)).size;
  const avif = (await stat(join(DESTINO, `${name}-960.avif`))).size;
  console.log(`${arquivo}: original ${Math.round(original / 1024)} KB -> 960px AVIF ${Math.round(avif / 1024)} KB`);
}
