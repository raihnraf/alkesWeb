import { describe, it, expect } from 'vitest'
import { existsSync, readdirSync, statSync } from 'fs'
import { resolve } from 'path'
import sharp from 'sharp'

const imagesDir = resolve(__dirname, '../public/images')
const distImagesDir = resolve(__dirname, '../dist/images')

describe('Image Optimization', () => {
  it('should have public/images/ directory', () => {
    expect(existsSync(imagesDir)).toBe(true)
  })

  it('should contain 4 PNG source images', () => {
    const files = readdirSync(imagesDir).filter(f => f.endsWith('.png'))
    expect(files).toHaveLength(4)
  })

  it('should contain 4 WebP optimized images', () => {
    const files = readdirSync(imagesDir).filter(f => f.endsWith('.webp'))
    expect(files).toHaveLength(4)
  })

  it('should have WebP versions smaller than PNG originals', () => {
    const pngFiles = readdirSync(imagesDir).filter(f => f.endsWith('.png'))
    for (const png of pngFiles) {
      const base = png.replace('.png', '')
      const webpPath = resolve(imagesDir, base + '.webp')
      expect(existsSync(webpPath)).toBe(true)
      const pngSize = statSync(resolve(imagesDir, png)).size
      const webpSize = statSync(webpPath).size
      expect(webpSize).toBeLessThan(pngSize)
    }
  })

  it('should have valid image dimensions (non-zero)', async () => {
    const pngFiles = readdirSync(imagesDir).filter(f => f.endsWith('.png'))
    for (const png of pngFiles) {
      const metadata = await sharp(resolve(imagesDir, png)).metadata()
      expect(metadata.width).toBeGreaterThan(0)
      expect(metadata.height).toBeGreaterThan(0)
    }
  })

  it('should have WebP files in dist/images/ after build', () => {
    if (!existsSync(distImagesDir)) {
      return // Skip if build hasn't run
    }
    const webpFiles = readdirSync(distImagesDir).filter(f => f.endsWith('.webp'))
    expect(webpFiles).toHaveLength(4)
  })

  it('should have PNG fallbacks in dist/images/ after build', () => {
    if (!existsSync(distImagesDir)) {
      return // Skip if build hasn't run
    }
    const pngFiles = readdirSync(distImagesDir).filter(f => f.endsWith('.png'))
    expect(pngFiles).toHaveLength(4)
  })

  it('should have matching WebP-PNG pairs', () => {
    const pngFiles = readdirSync(imagesDir).filter(f => f.endsWith('.png'))
    const webpFiles = readdirSync(imagesDir).filter(f => f.endsWith('.webp'))
    const pngBases = pngFiles.map(f => f.replace('.png', ''))
    const webpBases = webpFiles.map(f => f.replace('.webp', ''))
    for (const base of pngBases) {
      expect(webpBases).toContain(base)
    }
  })
})
