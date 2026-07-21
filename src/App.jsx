import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import './App.css'

const bookingUrl = 'https://dikidi.ru/2103148'
const whatsappUrl = 'https://wa.me/79858938585'
const maxUrl = 'https://max.ru/se13476423_biz'

const galleryImages = [
  {
    src: '/images/lpg-max-cabinet-equipment.webp',
    alt: 'Кабинет LPG MAX с кушеткой и профессиональными аппаратами',
    className: 'gallery-wide',
  },
  {
    src: '/images/lpg-max-luxor-device.webp',
    alt: 'Аппарат Luxor для LPG-массажа в кабинете LPG MAX',
    className: 'gallery-tall gallery-luxor',
  },
  {
    src: '/images/lpg-max-devices-detail.webp',
    alt: 'Аппараты для процедур и рабочая зона кабинета LPG MAX',
    className: 'gallery-detail',
  },
  {
    src: '/images/lpg-max-studio-sign.webp',
    alt: 'Интерьер кабинета LPG MAX с фирменной фразой «Красота — это ты»',
    className: 'gallery-angle',
  },
  {
    src: '/images/lpg-max-luxor-treatment.webp',
    alt: 'Процедура LPG-массажа на аппарате Luxor',
    className: 'gallery-treatment',
  },
  {
    src: '/images/cabinet-angle.webp',
    alt: 'Кушетка и интерьер кабинета эстетики в стиле зебра',
    className: 'gallery-cabinet',
  },
  {
    src: '/images/cabinet-wall.webp',
    alt: 'Акцентная стена с зебровым рисунком в кабинете LPG MAX',
    className: 'gallery-wall',
  },
  {
    src: '/images/cabinet-zebra-bed.webp',
    alt: 'Кушетка с зебровым текстилем в кабинете LPG MAX',
    className: 'gallery-zebra-bed',
  },
]

const resultsImages = [
  {
    src: '/images/result-dull-dehydrated-skin.webp',
    title: 'Тусклая / обезвоженная кожа',
    alt: 'Фото до и после: тусклая и обезвоженная кожа',
  },
  {
    src: '/images/result-fine-lines-wrinkles.webp',
    title: 'Мелкие и глубокие морщины',
    alt: 'Фото до и после: мелкие и глубокие морщины',
  },
  {
    src: '/images/result-clogged-pores.webp',
    title: 'Забитые поры',
    alt: 'Фото до и после: забитые поры',
  },
  {
    src: '/images/result-acne-blemishes.webp',
    title: 'Акне / прыщи',
    alt: 'Фото до и после: кожа с акне и высыпаниями',
  },
  {
    src: '/images/result-signs-of-aging.webp',
    title: 'Признаки старения',
    alt: 'Фото до и после: признаки старения кожи',
  },
]

const procedureCards = [
  {
    name: 'LPG-массаж',
    type: 'Вакуумно-роликовая методика',
    description: 'Настоящая перезагрузка для тела: процедура помогает бороться с целлюлитом, уменьшать объёмы и выводить лишнюю жидкость. Кожа становится невероятно упругой и гладкой.',
    details: [
      'Аппарат захватывает кожную складку и с помощью специальных роликов глубоко разминает ткани. Такая проработка помогает выровнять микрорельеф и поддержать естественный лимфодренаж.',
      'Курс подбирается индивидуально: в зависимости от задач он может быть направлен на работу с отёчностью, проявлениями целлюлита и тонусом кожи.',
    ],
  },
  {
    name: 'RF-лифтинг',
    type: 'Радиочастотная методика',
    description: 'Безоперационная подтяжка для лица и тела. Радиоволны стимулируют выработку собственного коллагена, возвращая коже плотность, упругость и разглаживая мелкие морщинки.',
    details: [
      'Радиоволны мягко прогревают глубокие слои дермы и активизируют работу фибробластов — клеток, которые участвуют в выработке коллагена и эластина.',
      'Методика используется на лице и теле, когда задача — поддержать плотность кожи, подчеркнуть контур и уменьшить выраженность возрастных изменений.',
    ],
  },
  {
    name: 'Кавитация',
    type: 'Ультразвуковая методика',
    description: 'Главный помощник в борьбе с локальными жировыми отложениями. Ультразвуковая волна деликатно воздействует на проблемные зоны живота, боков и «галифе» — без боли и реабилитации.',
    details: [
      'Ультразвуковые волны работают с локальными жировыми отложениями: в тканях создаётся эффект кавитации, а продукты распада естественным образом выводятся через лимфоток.',
      'Процедура подходит для работы с зонами живота, боков, бёдер и «галифе». Оптимальную программу Ирина подбирает после консультации.',
    ],
  },
  {
    name: 'Диодный липо-лазер',
    type: 'Лазерный липолиз',
    description: 'Современная аппаратная методика безоперационной липосакции, которая позволяет локально уменьшить объёмы и избавиться от лишних сантиметров. Во время сеанса вы просто лежите и расслабляетесь.',
    details: [
      'На проблемные зоны устанавливаются лазерные диодные насадки. Низкочастотное излучение воздействует на подкожно-жировую клетчатку, а далее организм естественным образом выводит продукты обмена.',
      'Методика помогает работать с локальными зонами — животом, бёдрами, руками или вторым подбородком — без разрезов и периода восстановления.',
    ],
  },
  {
    name: 'EMS-миостимуляция',
    type: 'Электромагнитные сокращения',
    description: 'Аппарат создаёт импульсы, вызывающие интенсивные сокращения мышц и ускоряющие местный метаболизм. Мышечный корсет уплотняется и поддерживает мягкие ткани изнутри.',
    details: [
      'Аппарат создаёт импульсы, вызывающие интенсивные сокращения мышц. Это помогает поддерживать мышечный тонус и активизировать локальный метаболизм.',
      'Миостимуляцию включают в программу, когда нужен более собранный силуэт, поддержка мышечного корсета и выраженный рельеф тела.',
    ],
  },
  {
    name: 'Криомолот',
    type: 'Локальная криотерапия',
    description: 'Сочетает воздействие экстремально низких температур и вибрационный массаж. Помогает уменьшить отёчность, тонизирует кожу и дарит ощущение лёгкости после нагрузок или долгого дня.',
    details: [
      'Криомолот сочетает локальное охлаждение и вибрационный массаж. Контрастное воздействие помогает успокоить ткани, уменьшить покраснение и поддержать лимфодренажный эффект.',
      'Его часто используют как завершающий этап после интенсивных процедур или для ощущения лёгкости после тренировки и долгого дня.',
    ],
  },
  {
    name: 'Гидропилинг',
    type: 'Очищение и увлажнение',
    description: 'Высокотехнологичная процедура «три в одном»: глубокое очищение, интенсивное увлажнение и омоложение кожи. Вакуумная система бережно очищает поры и одновременно подаёт сыворотки.',
    details: [
      'Вакуумная система деликатно удаляет загрязнения и ороговевшие клетки, а затем насыщает кожу индивидуально подобранными сыворотками с увлажняющими и ухаживающими компонентами.',
      'За один сеанс кожа проходит путь от очищения до увлажнения: выравнивается рельеф, сокращается ощущение стянутости, появляется свежий и ухоженный вид.',
    ],
  },
  {
    name: 'Фотон-терапия',
    type: 'LED-свет',
    description: 'Бережное омоложение светом, которое работает на клеточном уровне. Световые волны поддерживают естественное восстановление кожи, возвращая ей ровный тон, упругость и свежий вид.',
    details: [
      'Световые волны разной длины работают с задачами ухода на клеточном уровне. Режим подбирается под состояние кожи и цель процедуры.',
      'Фотон-терапия помогает поддержать ровный тон, свежий вид кожи, уменьшить выраженность воспалений и дополнить программу омоложения.',
    ],
  },
  {
    name: 'Массаж лица',
    type: 'Ручные техники',
    description: 'Завершающий и очень приятный этап ухода. Специальные техники снимают напряжение, улучшают кровообращение, формируют красивый овал лица и возвращают коже свежий вид.',
    details: [
      'Массаж лица — это проработка мышц, снятие спазмов и зажимов, улучшение микроциркуляции и расслабление.',
      'Регулярный уход помогает поддерживать чёткий овал, здоровый румянец и свежий вид кожи. Техники подбираются с учётом индивидуальных особенностей.',
    ],
  },
]

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.7',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const icons = {
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    metro: <><path d="M4 18 12 4l8 14" /><path d="M8 11h8M6.5 15h11" /></>,
    phone: <path d="M6.6 3.7 9 3l1.5 4.3-2 1.2c1.2 2.5 2.9 4.2 5.4 5.4l1.2-2L19.4 13l-.7 2.4c-.3 1.1-1.5 1.7-2.5 1.3C9.4 14.2 5.8 10.6 3.3 3.8 2.9 2.8 3.5 1.6 4.6 1.3L6.6 3.7Z" />,
    message: <><path d="M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 20l1.8-5A7.5 7.5 0 1 1 20 11.5Z" /><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    chevronLeft: <path d="m14.5 5-7 7 7 7" />,
    chevronRight: <path d="m9.5 5 7 7-7 7" />,
  }

  return <svg {...common}>{icons[name]}</svg>
}

function ExternalLink({ href, className = '', children, ...props }) {
  return <a href={href} className={className} target="_blank" rel="noreferrer" {...props}>{children}</a>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeProcedure, setActiveProcedure] = useState(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lenis = null
    let animationFrame = null

    const stopLenis = () => {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame)
      animationFrame = null
      lenis?.destroy()
      lenis = null
    }

    const startLenis = () => {
      if (lenis || reducedMotion.matches || window.innerWidth <= 800) return
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.82,
        touchMultiplier: 1,
      })

      const animate = (time) => {
        lenis?.raf(time)
        animationFrame = requestAnimationFrame(animate)
      }
      animationFrame = requestAnimationFrame(animate)
    }

    const syncScrollMode = () => {
      if (reducedMotion.matches || window.innerWidth <= 800) stopLenis()
      else startLenis()
    }

    syncScrollMode()
    reducedMotion.addEventListener('change', syncScrollMode)
    window.addEventListener('resize', syncScrollMode)

    return () => {
      reducedMotion.removeEventListener('change', syncScrollMode)
      window.removeEventListener('resize', syncScrollMode)
      stopLenis()
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (activeProcedure !== null) {
        if (event.key === 'Escape') setActiveProcedure(null)
        return
      }
      if (activeImage === null) return
      if (event.key === 'Escape') setActiveImage(null)
      if (event.key === 'ArrowLeft') {
        setActiveImage((current) => (current === 0 ? galleryImages.length - 1 : current - 1))
      }
      if (event.key === 'ArrowRight') {
        setActiveImage((current) => (current + 1) % galleryImages.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeImage, activeProcedure])

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 28)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('dialog-open', activeImage !== null || activeProcedure !== null)
    return () => document.body.classList.remove('dialog-open')
  }, [activeImage, activeProcedure])

  useEffect(() => {
    const revealItems = [...document.querySelectorAll('[data-reveal]')]
    if (!revealItems.length) return undefined

    const showAll = () => revealItems.forEach((item) => item.classList.add('is-visible'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showAll()
      return undefined
    }

    document.documentElement.classList.add('reveal-ready')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -42px 0px' })

    revealItems.forEach((item) => observer.observe(item))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('reveal-ready')
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const showPreviousImage = () => setActiveImage((current) => (current === 0 ? galleryImages.length - 1 : current - 1))
  const showNextImage = () => setActiveImage((current) => (current + 1) % galleryImages.length)

  return (
    <>
      <a className="skip-link" href="#content">Перейти к содержимому</a>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          <a className="brand" href="#content" aria-label="LPG MAX — на главную" onClick={closeMenu}>
            <img src="/images/lpg-max-logo.webp" alt="Логотип LPG MAX" />
            <span><strong>LPG MAX</strong><small>Кабинет Ирины · эстетика тела</small></span>
          </a>

          <button className="menu-toggle" type="button" aria-label="Открыть меню" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <Icon name="close" size={23} /> : <Icon name="menu" size={23} />}
          </button>

          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Основная навигация">
            <a href="#about" onClick={closeMenu}>О кабинете</a>
            <a href="#services" onClick={closeMenu}>Процедуры</a>
            <a href="#results" onClick={closeMenu}>До / после</a>
            <a href="#gallery" onClick={closeMenu}>Галерея</a>
            <a href="#contacts" onClick={closeMenu}>Контакты</a>
            <ExternalLink href={bookingUrl} className="nav-booking" onClick={closeMenu}>Онлайн-запись <Icon name="arrow" size={16} /></ExternalLink>
          </nav>

          <ExternalLink href={bookingUrl} className="button button-small header-booking">Онлайн-запись <Icon name="arrow" size={16} /></ExternalLink>
        </div>
      </header>

      <main id="content">
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-image" src="/images/lpg-max-hero-care.webp" alt="Ритуал бережного ухода за кожей в кабинете эстетики" fetchPriority="high" />
          <div className="hero-overlay" />
          <span className="flower flower-hero flower-hero-one" aria-hidden="true" />
          <span className="flower flower-hero flower-hero-two" aria-hidden="true" />
          <div className="hero-inner container">
            <p className="eyebrow"><span className="eyebrow-dot" /> Кабинет Ирины · LPG MAX</p>
            <h1 id="hero-title" className="hero-title-architecture">Архитектура тела:<br className="desktop-break" /> точная эстетика<br className="desktop-break" /> без диет и<br className="desktop-break" /> изнурительных тренировок</h1>
            <p className="hero-description">«Жировые ловушки» существуют. Для точечной работы с ними есть умная аппаратная косметология.</p>
            <div className="hero-actions">
              <ExternalLink href={bookingUrl} className="button">Записаться онлайн <Icon name="arrow" size={18} /></ExternalLink>
              <ExternalLink href={whatsappUrl} className="button button-ghost">Написать в WhatsApp</ExternalLink>
            </div>
            <p className="hero-location"><Icon name="pin" size={17} /> Москва · ул. Щухова, 19 · кабинет 10</p>
          </div>
          <a className="scroll-cue" href="#about" aria-label="Перейти к информации о кабинете"><span /></a>
        </section>

        <section className="care-ribbon" aria-label="Философия LPG MAX">
          <div className="care-ribbon-track" aria-hidden="true">
            <span>Точность в деталях</span><i>✦</i><span>Бережный подход</span><i>✦</i><span>Красота в вашем ритме</span><i>✦</i><span>Время для себя</span><i>✦</i>
            <span>Точность в деталях</span><i>✦</i><span>Бережный подход</span><i>✦</i><span>Красота в вашем ритме</span><i>✦</i><span>Время для себя</span><i>✦</i>
            <span>Точность в деталях</span><i>✦</i><span>Бережный подход</span><i>✦</i><span>Красота в вашем ритме</span><i>✦</i><span>Время для себя</span><i>✦</i>
            <span>Точность в деталях</span><i>✦</i><span>Бережный подход</span><i>✦</i><span>Красота в вашем ритме</span><i>✦</i><span>Время для себя</span><i>✦</i>
            <span>Точность в деталях</span><i>✦</i><span>Бережный подход</span><i>✦</i><span>Красота в вашем ритме</span><i>✦</i><span>Время для себя</span><i>✦</i>
            <span>Точность в деталях</span><i>✦</i><span>Бережный подход</span><i>✦</i><span>Красота в вашем ритме</span><i>✦</i><span>Время для себя</span><i>✦</i>
          </div>
        </section>

        <section className="about section" id="about" aria-labelledby="about-title">
          <span className="flower flower-about" aria-hidden="true" />
          <span className="flower flower-about-two" aria-hidden="true" />
          <div className="container about-grid">
            <div className="about-visual" data-reveal="left">
              <img src="/images/lpg-max-about-equipment.webp" alt="Оборудование и кушетка в кабинете LPG MAX" loading="lazy" />
              <span className="image-note">Щухова, 19<br />кабинет 10</span>
            </div>
            <div className="about-copy" data-reveal="right">
              <p className="eyebrow eyebrow-dark">О кабинете</p>
              <h2 id="about-title">Не наугад —<br />а точно по задаче</h2>
              <p>Вы честно следите за питанием, регулярно ходите в зал, но зеркало всё ещё показывает ту самую «упрямую» складку на талии, зону галифе или внутреннюю поверхность бедра, которые не поддаются никаким усилиям?</p>
              <p>Жировые ловушки существуют: они заложены генетикой, и справиться с ними только диетами бывает непросто. Для таких задач существует умная аппаратная косметология.</p>
              <p>В кабинете Ирины программа подбирается индивидуально: методики точечно работают с проблемными зонами, помогают подтянуть кожу и подчеркнуть желаемые объёмы.</p>
              <div className="benefit-list">
                <article className="benefit">
                  <span className="benefit-icon"><Icon name="lock" size={22} /></span>
                  <div><h3>Бережный подход</h3><p>Забота о лице и теле в комфортном темпе.</p></div>
                </article>
                <article className="benefit">
                  <span className="benefit-icon"><Icon name="calendar" size={22} /></span>
                  <div><h3>Естественное омоложение</h3><p>Процедуры для свежего вида, тонуса и ухоженной кожи.</p></div>
                </article>
                <article className="benefit">
                  <span className="benefit-icon"><Icon name="metro" size={22} /></span>
                  <div><h3>Тёплая атмосфера</h3><p>Приватное пространство на Щухова, 19, кабинет 10.</p></div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="format section" id="format" aria-labelledby="format-title">
          <span className="flower flower-format" aria-hidden="true" />
          <span className="flower flower-format-two" aria-hidden="true" />
          <div className="container format-grid">
            <div className="format-statement" data-reveal="left">
              <p className="eyebrow eyebrow-dark">Аппаратная эстетика</p>
              <h2 id="format-title">Точечная работа<br />с силуэтом</h2>
              <p>Мы выстраиваем архитектуру тела с вниманием к вашим целям: без операций, изнурительных тренировок и универсальных решений.</p>
            </div>
            <div className="format-list" data-reveal="right">
              <article className="format-item"><span><Icon name="lock" size={21} /></span><div><h3>Современные аппараты</h3><p>LPG, RF-лифтинг и кавитация для комплексного ухода.</p></div></article>
              <article className="format-item"><span><Icon name="calendar" size={21} /></span><div><h3>Мягкое омоложение</h3><p>Поддержка тонуса и более свежего, ухоженного вида кожи.</p></div></article>
              <article className="format-item"><span><Icon name="metro" size={21} /></span><div><h3>Легко найти</h3><p>Москва, ул. Щухова, 19, кабинет 10.</p></div></article>
              <article className="format-item"><span><Icon name="message" size={21} /></span><div><h3>Связь с Ириной</h3><p>WhatsApp для вопросов о процедурах и организации записи.</p></div></article>
            </div>
          </div>
        </section>

        <section className="services section" id="services" aria-labelledby="services-title">
          <span className="flower flower-services" aria-hidden="true" />
          <span className="flower flower-services-two" aria-hidden="true" />
          <div className="container">
              <div className="section-heading services-heading" data-reveal="left">
                <div>
                <p className="eyebrow eyebrow-dark">Процедуры</p>
                <h2 id="services-title">Методики для тела<br />и ухода за кожей</h2>
                </div>
              <p className="section-aside">Выберите подходящую методику, а удобное время — в онлайн-записи.</p>
              </div>
            <div className="procedure-grid" aria-label="Описание процедур">
              {procedureCards.map((procedure) => (
                <article className="procedure-card" data-reveal key={procedure.name}>
                  <div className="procedure-card-top">
                    <p>{procedure.type}</p>
                    <ExternalLink href={bookingUrl} className="procedure-card-booking">Записаться</ExternalLink>
                  </div>
                  <h3>{procedure.name}</h3>
                  <span>{procedure.description}</span>
                  <button className="procedure-card-expand" type="button" aria-haspopup="dialog" onClick={() => setActiveProcedure(procedure)}>
                    Открыть описание <Icon name="arrow" size={15} />
                  </button>
                </article>
              ))}
            </div>
            <ExternalLink href={maxUrl} className="procedure-channel" data-reveal>
              <span>Канал в MAX</span>
              <strong>Подробные описания всех процедур</strong>
              <Icon name="arrow" size={18} />
            </ExternalLink>
            <div className="procedure-booking" data-reveal>
              <p>Подберём подходящую процедуру и удобное время для визита.</p>
              <ExternalLink href={bookingUrl} className="button">Онлайн-запись <Icon name="arrow" size={18} /></ExternalLink>
            </div>
          </div>
        </section>

        <section className="results section" id="results" aria-labelledby="results-title">
          <span className="flower flower-results" aria-hidden="true" />
          <span className="flower flower-results-two" aria-hidden="true" />
          <div className="container">
            <div className="section-heading results-heading" data-reveal="left">
              <div><p className="eyebrow eyebrow-dark">Результаты процедур</p><h2 id="results-title">Результат, который<br />видно в деталях</h2></div>
              <p className="section-aside">Примеры изменений кожи после ухода. Индивидуальный результат зависит от исходного состояния кожи и выбранной программы.</p>
            </div>
            <div className="results-grid">
              {resultsImages.map((image) => (
                <article className="result-card" data-reveal key={image.src}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <div className="result-caption"><span>До / после</span><h3>{image.title}</h3></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery section" id="gallery" aria-labelledby="gallery-title">
          <span className="flower flower-gallery" aria-hidden="true" />
          <span className="flower flower-gallery-two" aria-hidden="true" />
          <div className="container">
            <div className="section-heading gallery-heading" data-reveal="left">
              <div><p className="eyebrow eyebrow-dark">Галерея</p><h2 id="gallery-title">Пространство,<br />где можно быть собой</h2></div>
              <p className="section-aside">Тёплый кабинет, где можно выдохнуть и уделить время себе</p>
            </div>
            <div className="gallery-grid">
              {galleryImages.map((image, index) => (
                <button className={`gallery-card ${image.className}`} data-reveal type="button" key={image.src} onClick={() => setActiveImage(index)} aria-label={`Открыть фото: ${image.alt}`}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <span className="gallery-expand">+</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="booking-cta section" aria-labelledby="booking-title">
          <div className="container cta-card" data-reveal>
            <span className="flower flower-booking" aria-hidden="true" />
            <span className="flower flower-booking-two" aria-hidden="true" />
            <div className="cta-copy">
              <p className="eyebrow">Онлайн-запись</p>
              <h2 id="booking-title">Подарите себе<br />время для красоты</h2>
              <p>Выберите удобное время — Ирина будет ждать вас в кабинете на Щухова, 19.</p>
              <ExternalLink href={bookingUrl} className="button">Перейти к онлайн-записи <Icon name="arrow" size={18} /></ExternalLink>
            </div>
            <div className="cta-art" aria-hidden="true"><div className="cta-curve" /><span>LPG<br />MAX</span></div>
          </div>
        </section>

        <section className="contacts section" id="contacts" aria-labelledby="contacts-title">
          <span className="flower flower-contacts" aria-hidden="true" />
          <span className="flower flower-contacts-two" aria-hidden="true" />
          <div className="container contacts-grid" data-reveal>
            <div>
              <p className="eyebrow eyebrow-dark">Контакты</p>
              <h2 id="contacts-title">Напишите Ирине</h2>
              <p className="contact-location"><Icon name="pin" size={19} /> Москва · ул. Щухова, 19 · кабинет 10</p>
            </div>
            <div className="contact-action-area">
              <a className="phone-link" href="tel:+79858938585"><Icon name="phone" size={20} /> +7 985 893-85-85</a>
              <div className="contact-actions">
                <ExternalLink href={whatsappUrl} className="contact-button"><Icon name="message" size={19} /> WhatsApp <Icon name="arrow" size={16} /></ExternalLink>
                <ExternalLink href={maxUrl} className="contact-button"><span className="max-mark">MAX</span> Канал в MAX <Icon name="arrow" size={16} /></ExternalLink>
                <ExternalLink href={bookingUrl} className="contact-button contact-button-dark">Онлайн-запись <Icon name="arrow" size={16} /></ExternalLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand"><img src="/images/lpg-max-logo.webp" alt="LPG MAX" /><p>Кабинет эстетики Ирины · LPG MAX</p></div>
          <p className="footer-note">Информация на сайте носит ознакомительный характер</p>
          <div className="footer-links"><a href="tel:+79858938585">+7 985 893-85-85</a><ExternalLink href={maxUrl}>MAX</ExternalLink><ExternalLink href={bookingUrl}>DIKIDI</ExternalLink></div>
          <p className="copyright">© {new Date().getFullYear()} LPG MAX</p>
        </div>
      </footer>

      <ExternalLink href={bookingUrl} className="mobile-booking">Записаться онлайн <Icon name="arrow" size={17} /></ExternalLink>

      {activeImage !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Просмотр фотографии" onMouseDown={() => setActiveImage(null)}>
          <button className="lightbox-close" type="button" aria-label="Закрыть фото" onClick={() => setActiveImage(null)}><Icon name="close" size={24} /></button>
          <button className="lightbox-arrow lightbox-previous" type="button" aria-label="Предыдущее фото" onMouseDown={(event) => event.stopPropagation()} onClick={showPreviousImage}><Icon name="chevronLeft" size={27} /></button>
          <figure onMouseDown={(event) => event.stopPropagation()}>
            <img src={galleryImages[activeImage].src} alt={galleryImages[activeImage].alt} />
            <figcaption>{activeImage + 1} / {galleryImages.length} · {galleryImages[activeImage].alt}</figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next" type="button" aria-label="Следующее фото" onMouseDown={(event) => event.stopPropagation()} onClick={showNextImage}><Icon name="chevronRight" size={27} /></button>
        </div>
      )}

      {activeProcedure !== null && (
        <div className="procedure-modal" role="dialog" aria-modal="true" aria-labelledby="procedure-modal-title" onMouseDown={() => setActiveProcedure(null)}>
          <article className="procedure-modal-card" onMouseDown={(event) => event.stopPropagation()}>
            <button className="procedure-modal-close" type="button" aria-label="Закрыть описание процедуры" onClick={() => setActiveProcedure(null)}><Icon name="close" size={22} /></button>
            <p className="procedure-modal-type">{activeProcedure.type}</p>
            <h2 id="procedure-modal-title">{activeProcedure.name}</h2>
            <p className="procedure-modal-lead">{activeProcedure.description}</p>
            <div className="procedure-modal-details">
              {activeProcedure.details.map((detail) => <p key={detail}>{detail}</p>)}
            </div>
            <div className="procedure-modal-actions">
              <ExternalLink href={maxUrl} className="procedure-modal-channel">Полное описание в канале MAX <Icon name="arrow" size={16} /></ExternalLink>
              <ExternalLink href={bookingUrl} className="button">Записаться онлайн <Icon name="arrow" size={18} /></ExternalLink>
            </div>
          </article>
        </div>
      )}
    </>
  )
}

export default App
