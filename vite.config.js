import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, readdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

function excludeJpegAssets() {
  let outputDirectory = 'dist'

  return {
    name: 'exclude-jpeg-assets',
    configResolved(config) {
      outputDirectory = config.build.outDir
    },
    closeBundle() {
      const imageDirectory = resolve(outputDirectory, 'images')
      if (!existsSync(imageDirectory)) return

      readdirSync(imageDirectory)
        .filter((fileName) => /\.jpe?g$/i.test(fileName))
        .forEach((fileName) => rmSync(resolve(imageDirectory, fileName)))
    },
  }
}

export default defineConfig({
  plugins: [react(), excludeJpegAssets()],
})
