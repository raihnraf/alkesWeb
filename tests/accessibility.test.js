import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'

const srcDir = resolve(__dirname, '../src')

function getHtmlFiles(dir, excludeDirs = []) {
  let results = []
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      if (excludeDirs.includes(entry.name)) continue
      results = results.concat(getHtmlFiles(fullPath, excludeDirs))
    } else if (entry.name.endsWith('.html')) {
      results.push({ name: entry.name, path: fullPath })
    }
  }
  return results
}

// Only test actual page files, exclude partials
const htmlFiles = getHtmlFiles(srcDir, ['partials'])

describe('Accessibility Compliance', () => {
  describe.each(htmlFiles)('$name', ({ name, path }) => {
    const content = readFileSync(path, 'utf-8')

    it('should contain <header> element', () => {
      expect(content).toMatch(/<header[\s>]/)
    })

    it('should contain <nav> element inside header', () => {
      expect(content).toMatch(/<nav[\s>]/)
    })

    it('should contain <main id="main-content"> element', () => {
      expect(content).toMatch(/<main[^>]*id="main-content"/)
    })

    it('should contain <footer> element', () => {
      expect(content).toMatch(/<footer[\s>]/)
    })

    it('should contain skip link with href="#main-content"', () => {
      expect(content).toMatch(/href="#main-content"/)
    })

    it('should have <html lang="id">', () => {
      expect(content).toMatch(/<html[^>]*lang="id"/)
    })

    it('should have hamburger button with aria-label="Buka menu navigasi"', () => {
      expect(content).toMatch(/aria-label="Buka menu navigasi"/)
    })

    it('should have hamburger button with aria-expanded="false" (initial state)', () => {
      expect(content).toMatch(/aria-expanded="false"/)
    })

    it('should have hamburger button with aria-controls="mobile-menu"', () => {
      expect(content).toMatch(/aria-controls="mobile-menu"/)
    })

    it('should have mobile menu with id="mobile-menu"', () => {
      expect(content).toMatch(/id="mobile-menu"/)
    })
  })

  describe('Cross-page consistency', () => {
    it('should have identical header markup across all pages', () => {
      const headerRegex = /(<header[\s\S]*?<\/header>)/
      const headers = htmlFiles.map(({ path }) => {
        const content = readFileSync(path, 'utf-8')
        const match = content.match(headerRegex)
        return match ? match[1] : ''
      })

      // Normalize whitespace for comparison
      const normalize = (s) => s.replace(/\s+/g, ' ').trim()
      const firstHeader = normalize(headers[0])
      for (let i = 1; i < headers.length; i++) {
        expect(normalize(headers[i])).toBe(firstHeader)
      }
    })

    it('should have identical footer markup across all pages', () => {
      const footerRegex = /(<footer[\s\S]*?<\/footer>)/
      const footers = htmlFiles.map(({ path }) => {
        const content = readFileSync(path, 'utf-8')
        const match = content.match(footerRegex)
        return match ? match[1] : ''
      })

      const normalize = (s) => s.replace(/\s+/g, ' ').trim()
      const firstFooter = normalize(footers[0])
      for (let i = 1; i < footers.length; i++) {
        expect(normalize(footers[i])).toBe(firstFooter)
      }
    })

    it('should have skip link as first element in body across all pages', () => {
      for (const { name, path } of htmlFiles) {
        const content = readFileSync(path, 'utf-8')
        const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/)
        expect(bodyMatch, `${name}: should have <body>`).not.toBeNull()
        const bodyContent = bodyMatch[1].trim()
        expect(bodyContent, `${name}: skip link should be first body element`).toMatch(
          /<a[^>]*href="#main-content"[^>]*class="skip-link"/
        )
      }
    })
  })
})
