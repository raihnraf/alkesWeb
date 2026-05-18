import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const cssPath = resolve(__dirname, '../src/css/main.css')
const cssContent = readFileSync(cssPath, 'utf-8')

describe('Design Tokens', () => {
  it('should have src/css/main.css file', () => {
    expect(existsSync(cssPath)).toBe(true)
  })

  it('should contain @import "tailwindcss"', () => {
    expect(cssContent).toContain('@import "tailwindcss"')
  })

  it('should contain @theme directive', () => {
    expect(cssContent).toContain('@theme')
  })

  it('should have deep-blue color token (#003366)', () => {
    expect(cssContent).toContain('--color-deep-blue: #003366')
  })

  it('should have medical-teal color token (#00A3AD)', () => {
    expect(cssContent).toContain('--color-medical-teal: #00A3AD')
  })

  it('should have surface color token (#f9f9ff)', () => {
    expect(cssContent).toContain('--color-surface: #f9f9ff')
  })

  it('should have section-padding spacing token (80px)', () => {
    expect(cssContent).toContain('--spacing-section-padding: 80px')
  })

  it('should have margin-desktop spacing token (48px)', () => {
    expect(cssContent).toContain('--spacing-margin-desktop: 48px')
  })

  it('should have headline-xl font token', () => {
    expect(cssContent).toContain('--font-headline-xl:')
  })

  it('should have body-md font token', () => {
    expect(cssContent).toContain('--font-body-md:')
  })

  it('should have border-radius-default token', () => {
    expect(cssContent).toContain('--radius-default: 0.125rem')
  })

  it('should have border-radius-lg token', () => {
    expect(cssContent).toContain('--radius-lg: 0.25rem')
  })

  it('should have border-radius-xl token', () => {
    expect(cssContent).toContain('--radius-xl: 0.5rem')
  })

  it('should have border-radius-full token', () => {
    expect(cssContent).toContain('--radius-full: 0.75rem')
  })

  it('should have at least 50 color tokens', () => {
    const colorMatches = cssContent.match(/--color-/g)
    expect(colorMatches).not.toBeNull()
    expect(colorMatches.length).toBeGreaterThanOrEqual(50)
  })

  it('should have all 8 spacing tokens', () => {
    const spacingTokens = [
      '--spacing-stack-lg',
      '--spacing-section-padding',
      '--spacing-stack-sm',
      '--spacing-container-max',
      '--spacing-margin-desktop',
      '--spacing-gutter',
      '--spacing-margin-mobile',
      '--spacing-stack-md',
    ]
    for (const token of spacingTokens) {
      expect(cssContent).toContain(token)
    }
  })
})
