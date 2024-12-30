import { nextTick } from 'vue'

document.addEventListener('DOMContentLoaded', () => {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)

  window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  })

  const header = document.querySelector('.header')
  const aside = document.querySelector('.subs')
  const scrollToTop = document.createElement('div')
  scrollToTop.classList.add('scroll-to-top')

  window.addEventListener('scroll', () => {
    let currentScrollTop = window.scrollY

    currentScrollTop > 50
      ? scrollToTop.classList.add('is-active')
      : scrollToTop.classList.remove('is-active')
  })

  scrollToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  // Hamburg Menu
  const hamburg = document.querySelector('.hamburg-menu')
  hamburg &&
    hamburg.addEventListener('click', (event) => {
      const handler = aside.querySelector('.close')
      aside.classList.add('is-active')
      const backdrop = document.createElement("div")
      backdrop.classList.add("backdrop")
      header.appendChild(backdrop)
      handler.addEventListener('click', () => {
        aside.classList.remove('is-active')
        backdrop.remove()
      })
    })

  // menus
  const navigation = document.querySelector('.links nav')
  const subs = document.querySelector('.subs')

  navigation &&
    navigation.addEventListener('mouseover', () => {
      subs.classList.add('is-active')
    })

  subs &&
    subs.addEventListener('mouseleave', () => {
      subs.classList.remove('is-active')
    })


  if (matchMedia("screen and (max-width: 960px)").matches) {
    const menus = document.querySelectorAll("header .subs menu")
    menus.forEach(menu => {
      menu.addEventListener("click", (event) => {
        event.target.closest("li").classList.toggle("is-active")
      })
    })
  }


  // Dropdown
  const dropdown = document.querySelector(".dropdown button");
  dropdown &&
    dropdown.addEventListener("click", (event) => {
      event.target.nextElementSibling.classList.toggle("is-active");
    });

  /* =====================================================
     Toggle
===================================================== */
  const toggles = document.querySelectorAll('[data-toggle]')
  const showToggleContent = (event) => {
    event.stopPropagation()
    const toggleName =
      event.target.dataset.toggle || event.target.closest('[data-toggle]').dataset.toggle
    const toggles = document.querySelectorAll(`[data-toggle='${toggleName}']`)

    toggles.forEach((toggle) => {
      toggle.classList.contains('is-active')
        ? toggle.classList.remove('is-active')
        : toggle.classList.add('is-active')
    })
  }

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', showToggleContent)
  })

  /* =====================================================
   Checkbox: Check All
===================================================== */
  const checkAll = document.querySelectorAll('.check-all')
  if (checkAll) {
    checkAll.forEach((all) => {
      const handleCheckAll = (event) => {
        const inputName = event.target.getAttribute('name')
        const checkboxes = document.getElementsByName(inputName)
        checkboxes.forEach((checkbox) => {
          checkbox.checked = all.checked

          const controller = checkbox.classList.contains('check-all')
          if (!controller.checked) {
            controller.checked = all.checked
          }
        })
      }
      all.addEventListener('click', handleCheckAll)
    })
  }

  const button = document.querySelector('.section-sticky-button button')
  button &&
    container.addEventListener('scroll', () => {
      if (container.scrollTop > 50) {
        button.classList.add('is-active')
      } else {
        button.classList.remove('is-active')
      }
    })

  // Captcha
  const captchaOptions = document.querySelector('.LBD_CaptchaIconsDiv')
  captchaOptions && captchaOptions.removeAttribute('style')
})

const mutationObserver = new MutationObserver((mutations) => {
  // interactive
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.intersectionRatio > 0
        ? entry.target.classList.add('is-active')
        : entry.target.classList.remove('is-active')
    })
  })

  const sections = document.querySelectorAll('main.interactive section')
  sections.forEach((section) => {
    io.observe(section)
  })

  mutations.forEach((mutation) => {
    if (mutation.target.classList.contains('categories')) {
      const categories = document.querySelectorAll(".categories input[type='checkbox']")
      const handleCheckCategory = (event) => {
        const button = event.target.closest('section').querySelector('.btn-next')
        if (event.target.checked) {
          event.target.closest('div').classList.add('is-active')
          button && (button.disabled = false)
        } else {
          event.target.closest('div').classList.remove('is-active')
          button && (button.disabled = true)
        }
      }
      categories.forEach((category) => {
        category.addEventListener('change', handleCheckCategory)
      })
    }

    /* =====================================================
   Tab Menu
===================================================== */
    const tabs = document.querySelectorAll('.tabs [data-tab]')
    const tabContents = document.querySelectorAll('.tab-content')

    const showTabContent = (event) => {
      event.stopPropagation()
      const tabName = event.target.dataset.tab
      const tabs = document.querySelectorAll(`[data-tab='${tabName}']`)
      const tabContents = document.querySelectorAll(`.tab-content[data-tab='${tabName}']`)
      let menuIndex = [...tabs].indexOf(event.target)

      tabs.forEach((tab) => {
        ;[...tabs].indexOf(tab) === menuIndex
          ? tab.classList.add('is-active')
          : tab.classList.remove('is-active')
      })

      tabContents.forEach((content) => {
        ;[...tabContents].indexOf(content) === 0 && content.classList.add('is-active')
          ;[...tabContents].indexOf(content) === menuIndex
            ? content.classList.add('is-active')
            : content.classList.remove('is-active')
      })
    }

    tabs.forEach((tab) => {
      ;[...tabs][0].classList.add('is-active')
        ;[...tabContents][0] && [...tabContents][0].classList.add('is-active')
      tab.addEventListener('click', showTabContent)
    })
  })
})

mutationObserver.observe(document.children[0], {
  childList: true,
  subtree: true
})

const profileObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.log(mutation.target)
  })
})

const expertInformation = document.querySelectorAll('.content-expert.profile .information article')

expertInformation.forEach((information) => {
  profileObserver.observe(information, {
    childList: true,
    subtree: true
  })
})
