import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const productsDir = resolve(__dirname, '../src/products')

const products = [
  {
    file: 'blue-diode-laser.html',
    name: 'Blue Diode Laser',
    hasBanner: true,
    waText: 'Blue%20Diode%20Laser',
    emailSubject: 'Inquiry%20Blue%20Diode%20Laser',
    relatedPages: [
      '/products/ultrasonic-surgery',
      '/products/holmium-laser',
      '/products/consumables',
    ],
    ownPage: '/products/blue-diode-laser',
    minAppCards: 3,
  },
  {
    file: 'ultrasonic-surgery.html',
    name: 'Ultrasonic Surgery System',
    hasBanner: true,
    waText: 'Ultrasonic%20Surgery%20System',
    emailSubject: 'Inquiry%20Ultrasonic%20Surgery%20System',
    relatedPages: [
      '/products/blue-diode-laser',
      '/products/holmium-laser',
      '/products/consumables',
    ],
    ownPage: '/products/ultrasonic-surgery',
    minAppCards: 3,
  },
  {
    file: 'holmium-laser.html',
    name: 'Laser Holmium',
    hasBanner: true,
    waText: 'Laser%20Holmium',
    emailSubject: 'Inquiry%20Laser%20Holmium',
    relatedPages: [
      '/products/blue-diode-laser',
      '/products/ultrasonic-surgery',
      '/products/consumables',
    ],
    ownPage: '/products/holmium-laser',
    minAppCards: 3,
  },
  {
    file: 'consumables.html',
    name: 'Consumable Urologi',
    hasBanner: false,
    waText: 'Consumable%20Urologi',
    emailSubject: 'Inquiry%20Consumable%20Urologi',
    relatedPages: [
      '/products/blue-diode-laser',
      '/products/ultrasonic-surgery',
      '/products/holmium-laser',
    ],
    ownPage: '/products/consumables',
    minAppCards: 3,
  },
]

// Helper: count occurrences of a pattern in content
function countMatches(content, regex) {
  const matches = content.match(regex)
  return matches ? matches.length : 0
}

// Test Group 1: Page Structure (4 products x 6 checks = 24 tests)
describe('Page Structure', () => {
  describe.each(products)('$name ($file)', (product) => {
    const filePath = resolve(productsDir, product.file)
    const content = existsSync(filePath) ? readFileSync(filePath, 'utf-8') : ''

    it('file should exist in src/products/', () => {
      expect(existsSync(filePath)).toBe(true)
    })

    it('should contain <main id="main-content"> element', () => {
      expect(content).toMatch(/<main[^>]*id="main-content"/)
    })

    it('should contain breadcrumb with "Produk > [Product Name]"', () => {
      expect(content).toMatch(new RegExp(`Produk[\\s\\S]*${product.name.replace(/ /g, '\\s*')}`))
    })

    it('should contain product name in <h1> heading', () => {
      expect(content).toMatch(new RegExp(`<h1[^>]*>[^<]*${product.name.replace(/ /g, '\\s*')}[^<]*</h1>`))
    })

    it('should contain "Spesifikasi Teknis" section heading', () => {
      expect(content).toContain('Spesifikasi Teknis')
    })

    it('should contain "Aplikasi Klinis" section heading', () => {
      expect(content).toContain('Aplikasi Klinis')
    })
  })
})

// Test Group 2: Specifications Table (4 products x 3 checks = 12 tests)
describe('Specifications Table', () => {
  describe.each(products)('$name ($file)', (product) => {
    const filePath = resolve(productsDir, product.file)
    const content = existsSync(filePath) ? readFileSync(filePath, 'utf-8') : ''

    it('should contain <table> with <thead> and <tbody>', () => {
      const tableMatch = content.match(/<table[\s\S]*?<\/table>/)
      expect(tableMatch).not.toBeNull()
      expect(tableMatch[0]).toContain('<thead>')
      expect(tableMatch[0]).toContain('<tbody>')
    })

    it('should contain at least 6 data rows in the table', () => {
      const tbodyMatch = content.match(/<tbody>([\s\S]*?)<\/tbody>/)
      expect(tbodyMatch).not.toBeNull()
      const rowCount = countMatches(tbodyMatch[1], /<tr[\s>]/g)
      expect(rowCount).toBeGreaterThanOrEqual(6)
    })

    it('table should have 2 column headers', () => {
      const theadMatch = content.match(/<thead>([\s\S]*?)<\/thead>/)
      expect(theadMatch).not.toBeNull()
      const thCount = countMatches(theadMatch[1], /<th[\s>]/g)
      expect(thCount).toBe(2)
    })
  })
})

// Test Group 3: Clinical Applications (4 products x 2 checks = 8 tests)
describe('Clinical Applications', () => {
  describe.each(products)('$name ($file)', (product) => {
    const filePath = resolve(productsDir, product.file)
    const content = existsSync(filePath) ? readFileSync(filePath, 'utf-8') : ''

    it('should contain at least 3 application cards', () => {
      // Count cards by looking for the card pattern: rounded-xl border with material-symbols icon
      const appsSection = content.match(/Aplikasi Klinis[\s\S]*?Produk Lainnya/)
      const sectionContent = appsSection ? appsSection[0] : content
      const cardCount = countMatches(sectionContent, /material-symbols-outlined text-medical-teal text-\[36px\]/g)
      expect(cardCount).toBeGreaterThanOrEqual(product.minAppCards)
    })

    it('each card should have icon, title, and description', () => {
      const appsSection = content.match(/Aplikasi Klinis[\s\S]*?(?:Produk Lainnya|<footer>)/)
      const sectionContent = appsSection ? appsSection[0] : content

      // Check for material-symbols icons
      expect(sectionContent).toMatch(/material-symbols-outlined/)
      // Check for h3 titles within the section
      const h3Count = countMatches(sectionContent, /<h3 class="font-headline-md/g)
      expect(h3Count).toBeGreaterThanOrEqual(product.minAppCards)
      // Check for description paragraphs
      const pCount = countMatches(sectionContent, /<p class="font-body-md text-on-surface-variant"/g)
      expect(pCount).toBeGreaterThanOrEqual(product.minAppCards)
    })
  })
})

// Test Group 4: Purchase/Rental Banner (4 tests)
describe('Purchase/Rental Banner', () => {
  describe.each(products)('$name ($file)', (product) => {
    const filePath = resolve(productsDir, product.file)
    const content = existsSync(filePath) ? readFileSync(filePath, 'utf-8') : ''

    it(`${product.hasBanner ? 'should' : 'should NOT'} contain "Tersedia untuk Pembelian atau Penyewaan"`, () => {
      const hasText = content.includes('Tersedia untuk Pembelian atau Penyewaan')
      if (product.hasBanner) {
        expect(hasText).toBe(true)
      } else {
        expect(hasText).toBe(false)
      }
    })
  })
})

// Test Group 5: WhatsApp CTA (4 products x 3 checks = 12 tests)
describe('WhatsApp CTA', () => {
  describe.each(products)('$name ($file)', (product) => {
    const filePath = resolve(productsDir, product.file)
    const content = existsSync(filePath) ? readFileSync(filePath, 'utf-8') : ''

    it('should contain link to wa.me/6281112129779', () => {
      expect(content).toContain('wa.me/6281112129779')
    })

    it('link should contain URL-encoded product name', () => {
      expect(content).toContain(product.waText)
    })

    it('link should have target="_blank" and rel="noopener noreferrer"', () => {
      // Find WhatsApp links and verify security attributes
      const waLinks = content.match(/href="https:\/\/wa\.me\/[^"]*"/g)
      expect(waLinks).not.toBeNull()
      expect(waLinks.length).toBeGreaterThan(0)

      // Check that WhatsApp links have proper security attributes
      const waSections = content.match(/<a[^>]*wa\.me[^>]*>[\s\S]*?<\/a>/g)
      expect(waSections).not.toBeNull()
      for (const link of waSections) {
        expect(link).toContain('target="_blank"')
        expect(link).toContain('rel="noopener noreferrer"')
      }
    })
  })
})

// Test Group 6: Email CTA (4 products x 3 checks = 12 tests)
describe('Email CTA', () => {
  describe.each(products)('$name ($file)', (product) => {
    const filePath = resolve(productsDir, product.file)
    const content = existsSync(filePath) ? readFileSync(filePath, 'utf-8') : ''

    it('should contain mailto:info@apbagroup.com link', () => {
      expect(content).toContain('mailto:info@apbagroup.com')
    })

    it('link should contain URL-encoded product name in subject', () => {
      expect(content).toContain(product.emailSubject)
    })

    it('link should contain pre-filled body with Nama and Institusi fields', () => {
      // The body should contain "Nama:" and "Institusi:" fields (colon is literal, space is %20)
      expect(content).toMatch(/Nama[%:\s]/)
      expect(content).toMatch(/Institusi[%:\s]/)
    })
  })
})

// Test Group 7: Related Products (4 products x 4 checks = 16 tests)
describe('Related Products', () => {
  describe.each(products)('$name ($file)', (product) => {
    const filePath = resolve(productsDir, product.file)
    const content = existsSync(filePath) ? readFileSync(filePath, 'utf-8') : ''

    it('should contain "Produk Lainnya" section heading', () => {
      expect(content).toContain('Produk Lainnya')
    })

    it('should contain exactly 3 related product cards', () => {
      // Count related product cards by looking for /products/ links in the related section
      const relatedSection = content.match(/Produk Lainnya[\s\S]*?(?:<footer>|<\/main>)/)
      const sectionContent = relatedSection ? relatedSection[0] : content
      const linkCount = countMatches(sectionContent, /href="\/products\//g)
      expect(linkCount).toBe(3)
    })

    it('related product links should NOT include the current page URL (no self-link)', () => {
      const relatedSection = content.match(/Produk Lainnya[\s\S]*?(?:<footer>|<\/main>)/)
      const sectionContent = relatedSection ? relatedSection[0] : content
      expect(sectionContent).not.toContain(product.ownPage)
    })

    it('each related product link should point to a valid /products/* URL', () => {
      const relatedSection = content.match(/Produk Lainnya[\s\S]*?(?:<footer>|<\/main>)/)
      const sectionContent = relatedSection ? relatedSection[0] : content
      const links = sectionContent.match(/href="(\/products\/[^"]+)"/g)
      expect(links).not.toBeNull()
      expect(links.length).toBe(3)
      for (const link of links) {
        expect(link).toMatch(/href="\/products\/[a-z-]+"/)
      }
    })
  })
})

// Test Group 8: Accessibility (4 products x 3 checks = 12 tests)
describe('Accessibility', () => {
  describe.each(products)('$name ($file)', (product) => {
    const filePath = resolve(productsDir, product.file)
    const content = existsSync(filePath) ? readFileSync(filePath, 'utf-8') : ''

    it('product hero image should have descriptive alt text (not empty)', () => {
      // Find the hero section image (the eager-loaded one, not lazy-loaded related images)
      const heroSection = content.match(/<section class="bg-deep-blue[\s\S]*?<\/section>/)
      expect(heroSection).not.toBeNull()
      const imgMatch = heroSection[0].match(/<img[^>]*alt="([^"]*)"/)
      expect(imgMatch).not.toBeNull()
      expect(imgMatch[1].length).toBeGreaterThan(5)
    })

    it('interactive elements should have min-h-[44px] touch targets', () => {
      // WhatsApp and email buttons should have min-h-[44px]
      const ctaSection = content.match(/Hubungi Kami[\s\S]*?(?:Produk Lainnya|<footer>)/)
      const sectionContent = ctaSection ? ctaSection[0] : content
      expect(sectionContent).toContain('min-h-[44px]')
    })

    it('page should have <html lang="id"> attribute', () => {
      expect(content).toMatch(/<html[^>]*lang="id"/)
    })
  })
})
