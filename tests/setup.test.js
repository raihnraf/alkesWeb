import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import { existsSync, readdirSync, statSync } from 'fs'
import { resolve } from 'path'

const distDir = resolve(__dirname, '../dist')

function findHtmlFiles(dir) {
  let results = []
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath))
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath)
    }
  }
  return results
}

describe('Build Output', () => {
  it('should complete npm run build without errors', () => {
    const result = execSync('npm run build', { encoding: 'utf-8', cwd: resolve(__dirname, '..') })
    expect(result).toContain('built in')
  })

  it('should produce exactly 7 HTML files in dist/', () => {
    const htmlFiles = findHtmlFiles(distDir)
    expect(htmlFiles).toHaveLength(7)
  })

  it('should contain compiled CSS bundle in dist/assets/', () => {
    const assetsDir = resolve(distDir, 'assets')
    expect(existsSync(assetsDir)).toBe(true)
    const cssFiles = readdirSync(assetsDir).filter(f => f.endsWith('.css'))
    expect(cssFiles.length).toBeGreaterThan(0)
  })
})
