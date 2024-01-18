/** @format */

document.addEventListener("DOMContentLoaded", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  if (matchMedia("screen and (max-width: 1280px)").matches) {
    window.addEventListener("resize", () => {
      location.reload();
    });
  }

  const container = document.querySelector(".container");
  const main = document.querySelector("main");
  const header = document.querySelector(".header");
  const aside = document.querySelector(".subs");
  const scrollToTop = document.createElement("div");
  scrollToTop.classList.add("scroll-to-top");
  container && container.appendChild(scrollToTop);

  let lastScrollTop = 0;

  container &&
    container.addEventListener("scroll", () => {
      let currentScrollTop = container.scrollTop;

      if (currentScrollTop > 50) {
        if (currentScrollTop > lastScrollTop) {
          scrollToTop.classList.remove("is-active");
        } else {
          scrollToTop.classList.add("is-active");
        }
        lastScrollTop = currentScrollTop;
      } else {
        scrollToTop.classList.remove("is-active");
      }
    });

  if (matchMedia("screen and (max-width: 640px)").matches) {
    container.addEventListener("scroll", () => {
      let currentScrollTop = container.scrollTop;

      if (currentScrollTop > 50) {
        currentScrollTop > lastScrollTop
          ? scrollToTop.classList.remove("is-active")
          : scrollToTop.classList.add("is-active");
        lastScrollTop = currentScrollTop;
      } else {
        scrollToTop.classList.remove("is-active");
      }
    });
  }

  scrollToTop.addEventListener("click", () => {
    container.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Hamburg Menu
  header.querySelector(".hamburg-menu").addEventListener("click", (event) => {
    const handler = aside.querySelector(".aside-handler");
    aside.classList.add("is-active");
    handler.addEventListener("click", () => {
      aside.classList.remove("is-active");
    });
  });

  // menus
  const navigation = header.querySelector("nav");
  const subs = header.querySelector(".subs");

  navigation.addEventListener("mouseover", () => {
    subs.classList.add("is-active");
  });

  subs.addEventListener("mouseleave", () => {
    subs.classList.remove("is-active");
  });

  /* =====================================================
   Tab Menu
===================================================== */
  const tabs = document.querySelectorAll(".tabs [data-tab]");
  const tabContents = document.querySelectorAll(".tab-content");

  const categories = document.querySelectorAll(
    ".content-government-benefits section"
  );
  categories.forEach((category) => {
    category.classList.add("is-active");
  });

  const showTabContent = (event) => {
    event.stopPropagation();
    const tabName = event.target.dataset.tab;
    const tabs = document.querySelectorAll(`[data-tab='${tabName}']`);
    const tabContents = document.querySelectorAll(
      `.tab-content[data-tab='${tabName}']`
    );
    let menuIndex = [...tabs].indexOf(event.target);

    tabs.forEach((tab) => {
      [...tabs].indexOf(tab) === menuIndex
        ? tab.classList.add("is-active")
        : tab.classList.remove("is-active");
    });

    tabContents.forEach((content) => {
      [...tabContents].indexOf(content) === 0 &&
        content.classList.add("is-active");
      [...tabContents].indexOf(content) === menuIndex
        ? content.classList.add("is-active")
        : content.classList.remove("is-active");
    });

    const categoryData = event.target.dataset.category;
    categories[0] &&
      categories.forEach((category) => {
        category.classList.remove("is-active");
        if (category.classList.contains(`${categoryData}`)) {
          category.classList.add("is-active");
        } else if (categoryData === "all") {
          category.classList.add("is-active");
        }
      });
  };

  tabs.forEach((tab) => {
    [...tabs][0].classList.add("is-active");
    [...tabContents][0] && [...tabContents][0].classList.add("is-active");
    tab.addEventListener("click", showTabContent);
  });

  if (main.classList.contains("content-ads")) {
    const tabs = document.querySelectorAll(
      ".section-diad .swiper-pagination li"
    );

    if (tabs[0]) {
      tabs[0].textContent = "다이애드 PRO";
      tabs[1].textContent = "다이애드 WAVE";
      tabs[2].textContent = "다이애드 TREND";
      const background = document.querySelector(".section-diad .background");
      const slides = document.querySelectorAll(".section-diad  .swiper-slide");
      const sliderObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.target.classList.contains("pro") &&
            mutation.target.classList.contains("swiper-slide-active")
          ) {
            background.classList.remove("wave", "trend");
            background.classList.add("pro");
          }
          if (
            mutation.target.classList.contains("wave") &&
            mutation.target.classList.contains("swiper-slide-active")
          ) {
            background.classList.remove("pro", "trend");
            background.classList.add("wave");
          }
          if (
            mutation.target.classList.contains("trend") &&
            mutation.target.classList.contains("swiper-slide-active")
          ) {
            background.classList.remove("wave", "pro");
            background.classList.add("trend");
          }
        });
      });

      slides.forEach((slide) => {
        sliderObserver.observe(slide, { attributes: true });
      });
    }
  }

  if (main.classList.contains("content-global")) {
    const section = document.querySelector(".section-vertical-slider.main");

    if (section) {
      const tabs = section.querySelectorAll(".menu li");
      tabs[0].textContent = "매출 증대 및 판로 개척";
      tabs[1].textContent = "해외 전용 브랜드 런칭";
      tabs[2].textContent = "Hit K-product 발굴";
      tabs[3].textContent = "동남아 마켓 진출";
      tabs[4].textContent = "핵심 키워드 마케팅";
      tabs[5].textContent = "B2C → B2B 전환";
      const slides = section.querySelectorAll(".swiper-slide");
      const sliderObserver = new MutationObserver((mutations) => {
        tabs.forEach((tab) => {
          tab.style.color = "white";
        });
        const bullet = section.querySelector(
          ".swiper-pagination-bullet-active"
        );
        mutations.forEach((mutation) => {
          if (
            mutation.target.classList.contains("first") &&
            mutation.target.classList.contains("swiper-slide-active")
          ) {
            section.style.background = "#3399FF";
            bullet.style.color = "#3399FF";
          }
          if (
            mutation.target.classList.contains("second") &&
            mutation.target.classList.contains("swiper-slide-active")
          ) {
            section.style.background = "#FF9C27";
            bullet.style.color = "#FF9C27";
          }
          if (
            mutation.target.classList.contains("third") &&
            mutation.target.classList.contains("swiper-slide-active")
          ) {
            section.style.background = "#005BB9";
            bullet.style.color = "#005BB9";
          }
          if (
            mutation.target.classList.contains("fourth") &&
            mutation.target.classList.contains("swiper-slide-active")
          ) {
            section.style.background = "#EE4D2D";
            bullet.style.color = "#EE4D2D";
          }
          if (
            mutation.target.classList.contains("fifth") &&
            mutation.target.classList.contains("swiper-slide-active")
          ) {
            section.style.background = "#617DFF";
            bullet.style.color = "#617DFF";
          }
          if (
            mutation.target.classList.contains("sixth") &&
            mutation.target.classList.contains("swiper-slide-active")
          ) {
            section.style.background = "#06BEF8";
            bullet.style.color = "#06BEF8";
          }
        });
      });

      slides.forEach((slide) => {
        sliderObserver.observe(slide, { attributes: true });
      });
    }
  }

  /* =====================================================
     Toggle
===================================================== */
  const toggles = document.querySelectorAll("[data-toggle]");
  const showToggleContent = (event) => {
    event.stopPropagation();
    const toggleName =
      event.target.dataset.toggle ||
      event.target.closest("[data-toggle]").dataset.toggle;
    const toggles = document.querySelectorAll(`[data-toggle='${toggleName}']`);

    toggles.forEach((toggle) => {
      toggle.classList.contains("is-active")
        ? toggle.classList.remove("is-active")
        : toggle.classList.add("is-active");
    });
  };

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", showToggleContent);
  });

  /* =====================================================
   Checkbox: Check All
===================================================== */

  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.innerHTML += `
  <svg width="15px" height="10px">
    <polyline points="1,5 6,9 14,1"></polyline>
  </svg>
  `;
  });
  const checkAll = document.querySelectorAll(".check-all");
  if (checkAll) {
    checkAll.forEach((all) => {
      const handleCheckAll = (event) => {
        const inputName = event.target.getAttribute("name");
        const checkboxes = document.getElementsByName(inputName);
        checkboxes.forEach((checkbox) => {
          checkbox.checked = all.checked;

          const controller = checkbox.classList.contains("check-all");
          if (!controller.checked) {
            controller.checked = all.checked;
          }
        });
      };
      all.addEventListener("click", handleCheckAll);
    });
  }

  /* =====================================================
Accordion
===================================================== */
  const questions = document.querySelector(".accordion");
  if (questions) {
    const questions = document.querySelectorAll(".question");
    const showLists = (event) => {
      let questionIndex = [...questions].indexOf(event.target);
      questions.forEach((question) => {
        const list = question.closest("li");
        [...questions].indexOf(question) === questionIndex
          ? list.classList.toggle("is-active")
          : list.classList.remove("is-active");
      });
    };
    questions.forEach((question) => {
      question.addEventListener("click", showLists);
    });
  }

  // interactive
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add("is-active");

        //scroll text translateX
        if (matchMedia("screen and (min-width: 1281px)").matches) {
          if (entry.target.classList.contains("horizontal-scroll-effect")) {
            const handleHorizontalScrolling = () => {
              const horizontalLists = entry.target.querySelectorAll("li");
              const ypos = container.scrollTop - entry.target.offsetTop;

              horizontalLists.forEach((list) => {
                list.style.transform = `translateX(${ypos * -0.75}px)`;
              });

              if (entry.target.classList.contains("section-intro")) {
                const ypos = container.scrollTop;

                horizontalLists.forEach((list) => {
                  list.style.transform = `translateX(${ypos * -0.75}px)`;
                });
              }
            };
            container.addEventListener("scroll", handleHorizontalScrolling);
          }
        }
        const video = entry.target.querySelector("video");
        if (video) {
          setTimeout(() => {
            video.play();
          }, 500);
        }
      } else {
        entry.target.classList.remove("is-active");
      }
    });
  });

  const sections = document.querySelectorAll("main.interactive section");
  sections.forEach((section) => {
    io.observe(section);
  });

  const button = document.querySelector(".section-sticky-button button");
  button &&
    container.addEventListener("scroll", () => {
      if (container.scrollTop > 50) {
        button.classList.add("is-active");
      } else {
        button.classList.remove("is-active");
      }
    });

  /* =====================================================
Swiper Sliders
===================================================== */
  let swiper = new Swiper("header .swiper", {
    speed: 1500,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },
    loop: true,
    pagination: {
      el: "header .swiper-pagination",
      type: "fraction",
      clickable: true,
    },
    navigation: {
      nextEl: "header .swiper-button-next",
      prevEl: "header .swiper-button-prev",
    },
  });
  if (main.classList.contains("after")) {
    // 슬라이더 배경색이 밝을 경우, 네비게이션 색상을 어둡게 변경
    const swiperPagination = document.querySelector(".swiper-pagination");
    const swiperNav = document.querySelector(".swiper-navigation");

    if (swiper.realIndex === 0) {
      swiperPagination.classList.add("light-ver");
      swiperNav.classList.add("light-ver");
    } else {
      swiperPagination.classList.remove("light-ver");
      swiperNav.classList.remove("light-ver");
    }

    swiper.on("slideChange", () => {
      if (swiper.realIndex === 0) {
        swiperPagination.classList.add("light-ver");
        swiperNav.classList.add("light-ver");
      } else {
        swiperPagination.classList.remove("light-ver");
        swiperNav.classList.remove("light-ver");
      }
    });
  }

  const slides = document.querySelectorAll(".content-header .swiper-slide");
  if (slides && slides.length < 2) {
    const swiperNavigation = document.querySelector(
      ".content-header .swiper-navigation"
    );
    swiperNavigation && (swiperNavigation.style.display = "none");
  }

  // 작은 화면에서 서브 페이지 슬라이더 활성화
  const breakpoint = window.matchMedia("(max-width: 640px)");
  let smallSwiper;

  const breakpointChecker = () => {
    if (breakpoint.matches === true) {
      return enableSwiper();
    } else if (breakpoint.matches === false) {
      smallSwiper !== undefined && smallSwiper.destroy(true, true);
      return;
    }
  };

  const enableSwiper = () => {
    smallSwiper = new Swiper(".swiper.small", {
      slidesPerView: "auto",
      spaceBetween: 15,
      centeredSlides: true,
      grabCursor: true,
      pagination: {
        el: ".swiper.small .swiper-pagination",
        clickable: true,
      },
    });
  };

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();

  // Captcha
  const captchaOptions = document.querySelector(".LBD_CaptchaIconsDiv");
  captchaOptions && captchaOptions.removeAttribute("style");

  // Main Content Scroll Down
  const arrow = document.querySelector(".content-main .section-intro i");

  arrow &&
    arrow.addEventListener("click", () => {
      const nextSection = document.querySelector(".section-digital");
      nextSection.classList.add("is-active");
      container.scrollTo({
        top: nextSection.offsetTop,
        behavior: "smooth",
      });
    });

  // Dropdown
  const dropdown = document.querySelector(".dropdown button");
  dropdown &&
    dropdown.addEventListener("click", (event) => {
      event.target.nextElementSibling.classList.toggle("is-active");
    });

  /* =====================================================
        Modal
      ===================================================== */
  const openModal = (event) => {
    event.preventDefault();
    const modalData = event.target.dataset.modal;
    const targetModal = document.getElementById(modalData);
    if (targetModal) {
      targetModal.classList.add("is-active");
      const modalButton = targetModal.querySelector("[data-modal]");
      modalButton &&
        modalButton.addEventListener("click", () => {
          setTimeout(() => {
            targetModal.querySelector("input").value = "";
          }, 500);
        });
    }
  };

  const closeModal = (event) => {
    const modal = event.target.closest(".modal");
    modal.classList.remove("is-active");
  };

  const closeButtons = document.querySelectorAll(".modal .close");
  closeButtons[0] &&
    closeButtons.forEach((close) => {
      close.addEventListener("click", closeModal);
    });

  const modalButtons = document.querySelectorAll("[data-modal]");
  modalButtons[0] &&
    modalButtons.forEach((button) => {
      button.addEventListener("click", openModal);
    });

  /* =====================================================
        Main Modal
      ===================================================== */
  const mainModal = document.querySelector(".modal.main");
  if(mainModal) {  
  
    const closeMainModal = () => {
      const checkbox = document.getElementById("hideModalToday");
      checkbox.checked == true && setCookie("hideModal", "true", 1);
      mainModal.classList.remove("is-active");
    };
    const closeButton = mainModal.querySelector("footer .close");
    closeButton.addEventListener("click", closeMainModal);
  
    const setCookie = (name, value, expired) => {
      const today = new Date();
      today.setDate(today.getDate() + expired);
      document.cookie = `${name}=${value}; path=/; expires=${today}.toGMTString();`;
    }

    const getCookie = (name) => {
      const nameOfCookie = `${name}=`;
      const x = 0;
      while (x <= document.cookie.length) {
        const y = x + nameOfCookie.length;
        if (document.cookie.substring(x, y) == nameOfCookie) {
          if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
            endOfCookie = document.cookie.length;
          return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf(" ", x) + 1;
        if (x == 0) break;
      }
      return "";
    };

    const showMainModal = () => {
        document.cookie.indexOf("hideModal=true") < 0
        ? mainModal.classList.add("is-active")
        : mainModal.classList.remove("is-active")
    }

    if(window.location.pathname === "/") {
      showMainModal()
    } 
    
    if(window.location.pathname === "/amazon") {
      showMainModal()
    }
  }

  // 라이브러리 태그 색상 구분
  const tags = document.querySelectorAll("li .head_fix span, article .head_fix span");
  tags.forEach(tag => {
      if(tag.textContent === "해외진출" || tag.textContent === "해외 진출") {
          tag.style.color = "#FF810D";
          tag.style.backgroundColor = "#FFEFE0";
          tag.style.border = 0
      } else if (tag.textContent === "쇼핑몰 창업") {
          tag.style.color = "#3399FF";
          tag.style.backgroundColor = "#ECF5FF";
          tag.style.border = 0
      } else if (tag.textContent === "광고 마케팅" || tag.textContent === "광고·마케팅") {
        tag.style.color = "#29CE8A";
        tag.style.backgroundColor = "#E9FFF6";
        tag.style.border = 0
      } else if (tag.textContent === "제작운영 의뢰" || tag.textContent === "홈페이지 제작") {
          tag.style.color = "rgb(0, 99, 254)";
          tag.style.backgroundColor = "#DFEBFF";
          tag.style.border = 0
      } else if (tag.textContent === "오픈마켓 판매") {
          tag.style.color = "#7774FF";
          tag.style.backgroundColor = "#EEEEFF";
          tag.style.border = 0
      } else {
          tag.removeAttribute("style")
      }
  })
});
