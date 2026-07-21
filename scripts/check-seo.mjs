import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve('dist')
const files = {
  html: resolve(dist, 'index.html'),
  robots: resolve(dist, 'robots.txt'),
  sitemap: resolve(dist, 'sitemap.xml'),
  manifest: resolve(dist, 'site.webmanifest'),
}

const required = [
  [files.html, 'https://lpg-max.ru/'],
  [files.html, 'rel="canonical"'],
  [files.html, 'application/ld+json'],
  [files.html, 'og:title'],
  [files.robots, 'Sitemap: https://lpg-max.ru/sitemap.xml'],
  [files.sitemap, '<loc>https://lpg-max.ru/</loc>'],
  [files.sitemap, '<image:image>'],
  [files.manifest, 'Кабинет эстетики LPG MAX'],
]

const failures = required.flatMap(([file, text]) => {
  if (!existsSync(file)) return [`Не найден SEO-файл: ${file}`]
  return readFileSync(file, 'utf8').includes(text) ? [] : [`В ${file} нет: ${text}`]
})

if (existsSync(files.html)) {
  const html = readFileSync(files.html, 'utf8')
  const structuredData = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/)

  try {
    const data = JSON.parse(structuredData?.[1] ?? '')
    if (data['@id'] !== 'https://lpg-max.ru/#business') failures.push('У микроразметки указан неверный @id.')
    if (!Array.isArray(data['@type']) || !data['@type'].includes('BeautySalon')) failures.push('В микроразметке нет типа BeautySalon.')
  } catch {
    failures.push('Микроразметка JSON-LD невалидна.')
  }
}

const imageDirectory = resolve(dist, 'images')
if (existsSync(imageDirectory)) {
  const jpegAssets = readdirSync(imageDirectory).filter((fileName) => /\.jpe?g$/i.test(fileName))
  if (jpegAssets.length > 0) failures.push(`В production-сборке остались JPG: ${jpegAssets.join(', ')}`)
}

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log('SEO-файлы, canonical и микроразметка проверены.')
