(() => {
  'use strict'

  const header = document.querySelector('.site-header')
  const menuButton = document.querySelector('.menu-toggle')
  const navigation = document.querySelector('.main-nav')

  const closeMenu = () => {
    navigation?.classList.remove('is-open')
    menuButton?.setAttribute('aria-expanded', 'false')
  }

  menuButton?.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open')
    menuButton.setAttribute('aria-expanded', String(isOpen))
  })

  document.querySelectorAll('.main-nav a, .brand').forEach((link) => {
    link.addEventListener('click', closeMenu)
  })

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 28)
  updateHeader()
  window.addEventListener('scroll', updateHeader, { passive: true })

  const revealItems = [...document.querySelectorAll('[data-reveal]')]
  const showAll = () => revealItems.forEach((item) => item.classList.add('is-visible'))
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    showAll()
  } else {
    document.documentElement.classList.add('reveal-ready')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -42px 0px' })
    revealItems.forEach((item) => observer.observe(item))
  }

  let lightbox = null
  let activeImage = 0
  const galleryImages = [...document.querySelectorAll('.gallery-card img')].map((image) => ({
    src: image.currentSrc || image.src,
    alt: image.alt,
  }))

  const closeLightbox = () => {
    lightbox?.remove()
    lightbox = null
    document.body.classList.remove('dialog-open')
  }

  const renderLightbox = () => {
    const image = galleryImages[activeImage]
    lightbox = document.createElement('div')
    lightbox.className = 'lightbox'
    lightbox.setAttribute('role', 'dialog')
    lightbox.setAttribute('aria-modal', 'true')
    lightbox.setAttribute('aria-label', 'Просмотр фотографии')
    lightbox.innerHTML =       '<button class="lightbox-close" type="button" aria-label="Закрыть фото">×</button>' +
      '<button class="lightbox-arrow lightbox-previous" type="button" aria-label="Предыдущее фото">←</button>' +
      '<figure><img src="' + image.src + '" alt="' + image.alt + '"><figcaption>' + (activeImage + 1) + ' / ' + galleryImages.length + ' · ' + image.alt + '</figcaption></figure>' +
      '<button class="lightbox-arrow lightbox-next" type="button" aria-label="Следующее фото">→</button>'

    lightbox.addEventListener('mousedown', (event) => {
      if (event.target === lightbox) closeLightbox()
    })
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox)
    lightbox.querySelector('.lightbox-previous').addEventListener('click', () => {
      activeImage = activeImage === 0 ? galleryImages.length - 1 : activeImage - 1
      closeLightbox()
      renderLightbox()
    })
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
      activeImage = (activeImage + 1) % galleryImages.length
      closeLightbox()
      renderLightbox()
    })
    document.body.append(lightbox)
    document.body.classList.add('dialog-open')
  }

  document.querySelectorAll('.gallery-card').forEach((card, index) => {
    card.addEventListener('click', () => {
      activeImage = index
      renderLightbox()
    })
  })

  let procedureModal = null
  const closeProcedure = () => {
    procedureModal?.remove()
    procedureModal = null
    document.body.classList.remove('dialog-open')
  }

  document.querySelectorAll('.procedure-card').forEach((card) => {
    card.querySelector('.procedure-card-expand')?.addEventListener('click', () => {
      const type = card.querySelector('.procedure-card-top p')?.textContent ?? ''
      const title = card.querySelector('h3')?.textContent ?? ''
      const description = card.querySelector('span')?.textContent ?? ''
      procedureModal = document.createElement('div')
      procedureModal.className = 'procedure-modal'
      procedureModal.setAttribute('role', 'dialog')
      procedureModal.setAttribute('aria-modal', 'true')
      procedureModal.setAttribute('aria-labelledby', 'procedure-modal-title')
      procedureModal.innerHTML =         '<article class="procedure-modal-card">' +
        '<button class="procedure-modal-close" type="button" aria-label="Закрыть описание">×</button>' +
        '<p class="procedure-modal-type">' + type + '</p>' +
        '<h2 id="procedure-modal-title">' + title + '</h2>' +
        '<p class="procedure-modal-lead">' + description + '</p>' +
        '<div class="procedure-modal-details"><p>Программа и интенсивность процедуры подбираются индивидуально после консультации.</p></div>' +
        '<div class="procedure-modal-actions"><a class="procedure-modal-channel" href="https://max.ru/se13476423_biz" target="_blank" rel="noreferrer">Полное описание в канале MAX →</a><a class="button" href="https://dikidi.ru/2103148" target="_blank" rel="noreferrer">Записаться онлайн →</a></div>' +
        '</article>'
      procedureModal.addEventListener('mousedown', (event) => {
        if (event.target === procedureModal) closeProcedure()
      })
      procedureModal.querySelector('.procedure-modal-close').addEventListener('click', closeProcedure)
      document.body.append(procedureModal)
      document.body.classList.add('dialog-open')
    })
  })

  window.addEventListener('keydown', (event) => {
    if (procedureModal && event.key === 'Escape') closeProcedure()
    if (!lightbox) return
    if (event.key === 'Escape') closeLightbox()
    if (event.key === 'ArrowLeft') lightbox.querySelector('.lightbox-previous').click()
    if (event.key === 'ArrowRight') lightbox.querySelector('.lightbox-next').click()
  })
})()
