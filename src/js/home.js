const HEADER_OFFSET = 80

function smoothScrollTo(targetId) {
  const target = document.querySelector(targetId)
  if (!target) return

  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top, behavior: 'smooth' })
}

document.addEventListener('DOMContentLoaded', () => {
  const scrollLinks = document.querySelectorAll('.home-scroll, a[href^="#"]')
  scrollLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href')
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault()
        smoothScrollTo(href)
      }
    })
  })

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function animateCounter(el) {
    const dynamicType = el.getAttribute('data-dynamic')
    let target = parseInt(el.getAttribute('data-target'), 10)
    const suffix = el.getAttribute('data-suffix') || ''

    if (dynamicType === 'years-since-2017') {
      target = new Date().getFullYear() - 2017
      el.setAttribute('data-target', target)
    }

    if (prefersReducedMotion) {
      el.textContent = target + suffix
      return
    }

    const duration = 2000
    const startTime = performance.now()

    function update(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)
      el.textContent = current + suffix

      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }

    requestAnimationFrame(update)
  }

  const counters = document.querySelectorAll('.counter')
  if (counters.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counterEls = entry.target.querySelectorAll('.counter')
          counterEls.forEach(animateCounter)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )

  const statsSection = document.getElementById('stats')
  if (statsSection) {
    observer.observe(statsSection)
  }
})
