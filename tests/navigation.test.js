// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import fs from 'fs'
import { resolve } from 'path'

const navJsPath = resolve(__dirname, '../src/js/nav.js')
const navJsContent = fs.readFileSync(navJsPath, 'utf-8')

// Track and clean up document-level event listeners between tests
let registeredListeners = []
const originalAddEventListener = document.addEventListener.bind(document)
const originalRemoveEventListener = document.removeEventListener.bind(document)

document.addEventListener = (type, handler, options) => {
  registeredListeners.push({ type, handler, options })
  originalAddEventListener(type, handler, options)
}

document.removeEventListener = (type, handler, options) => {
  registeredListeners = registeredListeners.filter(
    (l) => !(l.type === type && l.handler === handler)
  )
  originalRemoveEventListener(type, handler, options)
}

function setupDOM(pathname = '/') {
  document.body.innerHTML = ''
  document.body.style.overflow = ''

  document.body.innerHTML = `
    <button id="hamburger-btn" aria-label="Buka menu navigasi" aria-expanded="false" aria-controls="mobile-menu">
      <span id="menu-icon">menu</span>
    </button>
    <div id="mobile-menu" class="md:hidden" style="grid-template-rows: 0fr; opacity: 0;">
      <div class="overflow-hidden">
        <div class="flex flex-col">
          <a href="/" class="nav-link mobile-menu-item">Beranda</a>
          <a href="/products/blue-diode-laser" class="nav-link mobile-menu-item">Produk</a>
          <a href="/about" class="nav-link mobile-menu-item">Tentang Kami</a>
          <a href="/contact" class="nav-link mobile-menu-item">Kontak</a>
          <a href="/contact" class="mobile-menu-cta">Minta Penawaran</a>
        </div>
      </div>
    </div>
  `

  Object.defineProperty(window, 'location', {
    value: { pathname },
    writable: true,
  })
}

function runNavJs() {
  // nav.js wraps everything in DOMContentLoaded; dispatch it after eval
  eval(navJsContent)
  document.dispatchEvent(new Event('DOMContentLoaded'))
}

function cleanupListeners() {
  for (const { type, handler, options } of registeredListeners) {
    originalRemoveEventListener(type, handler, options)
  }
  registeredListeners = []
}

describe('Navigation Behavior', () => {
  afterEach(() => {
    cleanupListeners()
  })

  describe('Hamburger Toggle', () => {
    beforeEach(() => {
      setupDOM('/')
      runNavJs()
    })

    it('should add .open class to mobile-menu when hamburger is clicked', () => {
      const hamburger = document.getElementById('hamburger-btn')
      const mobileMenu = document.getElementById('mobile-menu')

      hamburger.click()

      expect(mobileMenu.classList.contains('open')).toBe(true)
    })

    it('should remove .open class from mobile-menu when hamburger is clicked again', () => {
      const hamburger = document.getElementById('hamburger-btn')
      const mobileMenu = document.getElementById('mobile-menu')

      hamburger.click()
      hamburger.click()

      expect(mobileMenu.classList.contains('open')).toBe(false)
    })

    it('should set aria-expanded to "true" when menu opens', () => {
      const hamburger = document.getElementById('hamburger-btn')

      hamburger.click()

      expect(hamburger.getAttribute('aria-expanded')).toBe('true')
    })

    it('should set aria-expanded to "false" when menu closes', () => {
      const hamburger = document.getElementById('hamburger-btn')

      hamburger.click()
      hamburger.click()

      expect(hamburger.getAttribute('aria-expanded')).toBe('false')
    })

    it('should swap menuIcon text to "close" when menu opens', () => {
      const hamburger = document.getElementById('hamburger-btn')
      const menuIcon = document.getElementById('menu-icon')

      hamburger.click()

      expect(menuIcon.textContent).toBe('close')
    })

    it('should swap menuIcon text to "menu" when menu closes', () => {
      const hamburger = document.getElementById('hamburger-btn')
      const menuIcon = document.getElementById('menu-icon')

      hamburger.click()
      hamburger.click()

      expect(menuIcon.textContent).toBe('menu')
    })
  })

  describe('Scroll Lock', () => {
    beforeEach(() => {
      setupDOM('/')
      runNavJs()
    })

    it('should set document.body.style.overflow to "hidden" when menu opens', () => {
      const hamburger = document.getElementById('hamburger-btn')

      hamburger.click()

      expect(document.body.style.overflow).toBe('hidden')
    })

    it('should reset document.body.style.overflow to "" when menu closes', () => {
      const hamburger = document.getElementById('hamburger-btn')

      hamburger.click()
      hamburger.click()

      expect(document.body.style.overflow).toBe('')
    })
  })

  describe('Escape Key', () => {
    beforeEach(() => {
      setupDOM('/')
      runNavJs()
    })

    it('should close mobile menu when Escape key is pressed', () => {
      const hamburger = document.getElementById('hamburger-btn')
      const mobileMenu = document.getElementById('mobile-menu')

      hamburger.click()
      expect(mobileMenu.classList.contains('open')).toBe(true)

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

      expect(mobileMenu.classList.contains('open')).toBe(false)
    })

    it('should focus hamburger button after Escape key closes menu', () => {
      const hamburger = document.getElementById('hamburger-btn')
      const focusSpy = vi.spyOn(hamburger, 'focus')

      hamburger.click()
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

      expect(focusSpy).toHaveBeenCalled()
    })

    it('should reset aria-expanded and menuIcon after Escape key', () => {
      const hamburger = document.getElementById('hamburger-btn')
      const menuIcon = document.getElementById('menu-icon')

      hamburger.click()
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

      expect(hamburger.getAttribute('aria-expanded')).toBe('false')
      expect(menuIcon.textContent).toBe('menu')
    })
  })

  describe('Click Outside', () => {
    beforeEach(() => {
      setupDOM('/')
      runNavJs()
    })

    it('should close mobile menu when clicking outside of it', () => {
      const hamburger = document.getElementById('hamburger-btn')
      const mobileMenu = document.getElementById('mobile-menu')

      hamburger.click()
      expect(mobileMenu.classList.contains('open')).toBe(true)

      const outsideElement = document.createElement('div')
      outsideElement.id = 'outside'
      document.body.appendChild(outsideElement)

      outsideElement.dispatchEvent(new MouseEvent('click', { bubbles: true }))

      expect(mobileMenu.classList.contains('open')).toBe(false)
    })

    it('should not close menu when clicking inside mobile menu', () => {
      const hamburger = document.getElementById('hamburger-btn')
      const mobileMenu = document.getElementById('mobile-menu')

      hamburger.click()
      expect(mobileMenu.classList.contains('open')).toBe(true)

      mobileMenu.dispatchEvent(new MouseEvent('click', { bubbles: true }))

      expect(mobileMenu.classList.contains('open')).toBe(true)
    })
  })

  describe('Active State Detection', () => {
    beforeEach(() => {
      cleanupListeners()
    })

    it('should add .active class to matching nav link for /about path', () => {
      setupDOM('/about')
      runNavJs()

      const aboutLink = document.querySelector('a[href="/about"]')

      expect(aboutLink.classList.contains('active')).toBe(true)
    })

    it('should add .active class to "Produk" link on /products/* path', () => {
      setupDOM('/products/blue-diode-laser')
      runNavJs()

      const produkLink = document.querySelector('a[href="/products/blue-diode-laser"]')

      expect(produkLink.classList.contains('active')).toBe(true)
    })

    it('should add .active class to "Produk" link on /products/ultrasonic-surgery path', () => {
      setupDOM('/products/ultrasonic-surgery')
      runNavJs()

      const produkLink = document.querySelector('a[href="/products/blue-diode-laser"]')

      expect(produkLink.classList.contains('active')).toBe(true)
    })

    it('should add .active class to "Beranda" link on / path', () => {
      setupDOM('/')
      runNavJs()

      const homeLink = document.querySelector('a[href="/"]')

      expect(homeLink.classList.contains('active')).toBe(true)
    })

    it('should not add .active class to "Beranda" on /about path', () => {
      setupDOM('/about')
      runNavJs()

      const homeLink = document.querySelector('a[href="/"]')

      expect(homeLink.classList.contains('active')).toBe(false)
    })
  })
})
