// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import fs from 'fs'
import { resolve } from 'path'

const homeHtmlPath = resolve(__dirname, '../src/home.html')
const homeHtmlContent = fs.readFileSync(homeHtmlPath, 'utf-8')
const homeJsPath = resolve(__dirname, '../src/js/home.js')
const homeJsContent = fs.readFileSync(homeJsPath, 'utf-8')

function parseHtml(content) {
  const parser = new DOMParser()
  return parser.parseFromString(content, 'text/html')
}

describe('Home Page HTML Structure', () => {
  let doc

  beforeEach(() => {
    doc = parseHtml(homeHtmlContent)
  })

  describe('Hero Section (HOME-01)', () => {
    it('should have hero section with id="hero"', () => {
      const hero = doc.querySelector('#hero')
      expect(hero).not.toBeNull()
    })

    it('should display company name "PT Abadi Perkasa Bersama Alkesindo"', () => {
      expect(homeHtmlContent).toContain('PT Abadi Perkasa Bersama Alkesindo')
    })

    it('should display tagline "Solusi Alat Kesehatan Urologi Terpercaya di Indonesia"', () => {
      expect(homeHtmlContent).toContain('Solusi Alat Kesehatan Urologi Terpercaya di Indonesia')
    })

    it('should have primary CTA "Lihat Produk Kami"', () => {
      expect(homeHtmlContent).toContain('Lihat Produk Kami')
    })

    it('should have secondary CTA "Hubungi Kami"', () => {
      expect(homeHtmlContent).toContain('Hubungi Kami')
    })

    it('should have background image with picture element', () => {
      const hero = doc.querySelector('#hero')
      const picture = hero.querySelector('picture')
      expect(picture).not.toBeNull()
    })
  })

  describe('About Summary Section (HOME-02)', () => {
    it('should have about section with id="about"', () => {
      const about = doc.querySelector('#about')
      expect(about).not.toBeNull()
    })

    it('should contain founding year "2017"', () => {
      expect(homeHtmlContent).toContain('2017')
    })

    it('should contain hospital count "270+"', () => {
      expect(homeHtmlContent).toContain('270+')
    })

    it('should have image with picture element', () => {
      const about = doc.querySelector('#about')
      const picture = about.querySelector('picture')
      expect(picture).not.toBeNull()
    })
  })

  describe('Products & Services Bento Grid (HOME-03, HOME-04)', () => {
    it('should have products section with id="products"', () => {
      const products = doc.querySelector('#products')
      expect(products).not.toBeNull()
    })

    it('should have 6 cards total (3 product + 3 service)', () => {
      const products = doc.querySelector('#products')
      const gridItems = products.querySelectorAll(':scope > div > div > div')
      expect(gridItems.length).toBeGreaterThanOrEqual(6)
    })

    it('should have Blue Diode Laser product card', () => {
      expect(homeHtmlContent).toContain('Blue Diode Laser')
    })

    it('should have Ultrasonic Surgery product card', () => {
      expect(homeHtmlContent).toContain('Ultrasonic Surgery')
    })

    it('should have Laser Holmium product card', () => {
      expect(homeHtmlContent).toContain('Laser Holmium')
    })

    it('should have Consumable Urologi service card', () => {
      expect(homeHtmlContent).toContain('Consumable Urologi')
    })

    it('should have Penyewaan Alat Medis service card', () => {
      expect(homeHtmlContent).toContain('Penyewaan Alat Medis')
    })

    it('should have Laundry Rumah Sakit service card', () => {
      expect(homeHtmlContent).toContain('Laundry Rumah Sakit')
    })

    it('should link Blue Diode Laser card to /products/blue-diode-laser', () => {
      const products = doc.querySelector('#products')
      const link = products.querySelector('a[href="/products/blue-diode-laser"]')
      expect(link).not.toBeNull()
    })

    it('should link Ultrasonic Surgery card to /products/ultrasonic-surgery', () => {
      const products = doc.querySelector('#products')
      const link = products.querySelector('a[href="/products/ultrasonic-surgery"]')
      expect(link).not.toBeNull()
    })

    it('should link Laser Holmium card to /products/holmium-laser', () => {
      const products = doc.querySelector('#products')
      const link = products.querySelector('a[href="/products/holmium-laser"]')
      expect(link).not.toBeNull()
    })
  })

  describe('Why Choose Us Section (HOME-05)', () => {
    it('should have why-us section with id="why-us"', () => {
      const whyUs = doc.querySelector('#why-us')
      expect(whyUs).not.toBeNull()
    })

    it('should have 5 feature cards', () => {
      const whyUs = doc.querySelector('#why-us')
      const featureCards = whyUs.querySelectorAll('.grid > div')
      expect(featureCards.length).toBe(5)
    })

    it('should contain "Spesialis Urologi"', () => {
      expect(homeHtmlContent).toContain('Spesialis Urologi')
    })

    it('should contain "Bisa Beli & Sewa"', () => {
      expect(homeHtmlContent).toContain('Bisa Beli & Sewa')
    })

    it('should contain "Produk Original"', () => {
      expect(homeHtmlContent).toContain('Produk Original')
    })

    it('should contain "Tim Support Berpengalaman"', () => {
      expect(homeHtmlContent).toContain('Tim Support Berpengalaman')
    })

    it('should contain "Layanan Seluruh Indonesia"', () => {
      expect(homeHtmlContent).toContain('Layanan Seluruh Indonesia')
    })
  })

  describe('Subsidiaries Section (HOME-06)', () => {
    it('should have subsidiaries section with id="subsidiaries"', () => {
      const subsidiaries = doc.querySelector('#subsidiaries')
      expect(subsidiaries).not.toBeNull()
    })

    it('should have 3 subsidiary cards', () => {
      const subsidiaries = doc.querySelector('#subsidiaries')
      const cards = subsidiaries.querySelectorAll('.grid > div')
      expect(cards.length).toBe(3)
    })

    it('should contain PT APBA card', () => {
      expect(homeHtmlContent).toContain('PT APBA')
    })

    it('should contain PT APBATECH card', () => {
      expect(homeHtmlContent).toContain('PT APBATECH')
    })

    it('should contain PT APBS card', () => {
      expect(homeHtmlContent).toContain('PT APBS')
    })

    it('should use glassmorphism styling (backdrop-blur)', () => {
      expect(homeHtmlContent).toContain('backdrop-blur-md')
    })
  })

  describe('Stats Section (HOME-07)', () => {
    it('should have stats section with id="stats"', () => {
      const stats = doc.querySelector('#stats')
      expect(stats).not.toBeNull()
    })

    it('should have counter elements with data-target attributes', () => {
      const stats = doc.querySelector('#stats')
      const counters = stats.querySelectorAll('.counter')
      expect(counters.length).toBeGreaterThan(0)
      counters.forEach((counter) => {
        expect(counter.getAttribute('data-target')).not.toBeNull()
      })
    })

    it('should have counter for founding year (2017)', () => {
      const stats = doc.querySelector('#stats')
      const counter = stats.querySelector('.counter[data-target="2017"]')
      expect(counter).not.toBeNull()
    })

    it('should have counter for hospital count (270)', () => {
      const stats = doc.querySelector('#stats')
      const counter = stats.querySelector('.counter[data-target="270"]')
      expect(counter).not.toBeNull()
    })
  })

  describe('Smooth Scroll (HOME-08)', () => {
    it('should have home-scroll class on hero CTA linking to #products', () => {
      const hero = doc.querySelector('#hero')
      const link = hero.querySelector('.home-scroll[href="#products"]')
      expect(link).not.toBeNull()
    })
  })
})

describe('Home Page JS', () => {
  let registeredListeners = []
  const originalAddEventListener = document.addEventListener.bind(document)
  const originalRemoveEventListener = document.removeEventListener.bind(document)
  let MockIntersectionObserver
  let observerInstances = []

  beforeEach(() => {
    registeredListeners = []
    observerInstances = []

    document.body.innerHTML = `
      <section id="stats">
        <span class="counter" data-target="270" data-suffix="+">0</span>
        <span class="counter" data-target="2017" data-suffix="">0</span>
        <span class="counter" data-target="0" data-suffix="+" data-dynamic="years-since-2017">0</span>
      </section>
      <a href="#stats" class="home-scroll">Scroll to stats</a>
    `

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

    MockIntersectionObserver = vi.fn(function (callback) {
      const instance = {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
        _callback: callback,
      }
      observerInstances.push(instance)
      return instance
    })

    globalThis.IntersectionObserver = MockIntersectionObserver
    globalThis.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 16))
    globalThis.window.matchMedia = vi.fn(() => ({ matches: false }))
  })

  afterEach(() => {
    for (const { type, handler, options } of registeredListeners) {
      originalRemoveEventListener(type, handler, options)
    }
    registeredListeners = []
    delete globalThis.IntersectionObserver
    delete globalThis.requestAnimationFrame
    delete globalThis.window.matchMedia
  })

  function runHomeJs() {
    eval(homeJsContent)
    document.dispatchEvent(new Event('DOMContentLoaded'))
  }

  describe('Smooth Scroll', () => {
    it('should prevent default on anchor clicks with hash hrefs', () => {
      runHomeJs()

      const link = document.querySelector('.home-scroll')
      const event = new MouseEvent('click', { bubbles: true, cancelable: true })
      link.dispatchEvent(event)

      expect(event.defaultPrevented).toBe(true)
    })

    it('should not prevent default on non-hash links', () => {
      document.body.innerHTML = '<a href="/contact" class="home-scroll">Contact</a>'
      runHomeJs()

      const link = document.querySelector('.home-scroll')
      const event = new MouseEvent('click', { bubbles: true, cancelable: true })
      link.dispatchEvent(event)

      expect(event.defaultPrevented).toBe(false)
    })
  })

  describe('Animated Counters', () => {
    it('should create IntersectionObserver for stats section', () => {
      runHomeJs()

      expect(MockIntersectionObserver).toHaveBeenCalled()
    })

    it('should observe the stats section', () => {
      runHomeJs()

      expect(observerInstances.length).toBeGreaterThan(0)
      expect(observerInstances[0].observe).toHaveBeenCalled()
    })

    it('should animate counter from 0 to target value', () => {
      vi.useFakeTimers()
      runHomeJs()

      const callback = observerInstances[0]._callback
      const statsSection = document.getElementById('stats')
      callback([{ target: statsSection, isIntersecting: true }])

      vi.advanceTimersByTime(2500)

      const counter = document.querySelector('.counter[data-target="270"]')
      expect(counter.textContent).not.toBe('0')

      vi.useRealTimers()
    })

    it('should append suffix to counter value', () => {
      vi.useFakeTimers()
      runHomeJs()

      const callback = observerInstances[0]._callback
      const statsSection = document.getElementById('stats')
      callback([{ target: statsSection, isIntersecting: true }])

      vi.advanceTimersByTime(2500)

      const counter = document.querySelector('.counter[data-target="270"]')
      expect(counter.textContent.endsWith('+')).toBe(true)

      vi.useRealTimers()
    })

    it('should calculate dynamic years-since-2017 counter', () => {
      vi.useFakeTimers()
      runHomeJs()

      const callback = observerInstances[0]._callback
      const statsSection = document.getElementById('stats')
      callback([{ target: statsSection, isIntersecting: true }])

      vi.advanceTimersByTime(2500)

      const dynamicCounter = document.querySelector('.counter[data-dynamic="years-since-2017"]')
      const expectedYears = new Date().getFullYear() - 2017
      expect(parseInt(dynamicCounter.textContent, 10)).toBeGreaterThanOrEqual(expectedYears - 1)

      vi.useRealTimers()
    })
  })
})

describe('Home Page Build Output', () => {
  it('should have home.js referenced in home.html', () => {
    expect(homeHtmlContent).toContain('src="/src/js/home.js"')
  })

  it('should have nav.js referenced in home.html', () => {
    expect(homeHtmlContent).toContain('src="/src/js/nav.js"')
  })
})
