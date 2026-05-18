import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'

const projectRoot = resolve(__dirname, '..')

describe('Vercel Deployment Configuration', () => {
  it('should have vercel.json in project root', () => {
    const vercelJsonPath = resolve(projectRoot, 'vercel.json')
    expect(existsSync(vercelJsonPath)).toBe(true)
  })

  it('should have cleanUrls enabled in vercel.json', () => {
    const vercelJsonPath = resolve(projectRoot, 'vercel.json')
    const content = JSON.parse(readFileSync(vercelJsonPath, 'utf-8'))
    expect(content.cleanUrls).toBe(true)
  })

  it('should have trailingSlash set to false in vercel.json', () => {
    const vercelJsonPath = resolve(projectRoot, 'vercel.json')
    const content = JSON.parse(readFileSync(vercelJsonPath, 'utf-8'))
    expect(content.trailingSlash).toBe(false)
  })
})
