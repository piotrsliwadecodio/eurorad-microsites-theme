(function (root, $, undefined) {
  'use strict';

  $(function () {
    // DOM ready, take it away

    // Section slider
    let sliderSections = $('.er-slider');
    if (sliderSections.length) {
      sliderSections.each(function () {
        $(this).attr('class', 'er-slider swiper');
        $(this).children().attr('class', 'swiper-wrapper');
        $(this).append('<div class="swiper-pagination"></div>');
        $(this).children().children().attr('class', 'swiper-slide');

        const pagination = $(this).find('.swiper-pagination');

        const swiper = new Swiper(this, {
          loop: true,
          speed: 500,
          pagination: {
            el: pagination[0],
            clickable: true,
          },
        });
      });
    }

    // Hero Slider
    let sliderHeroSections = $('.er-slider-hero');
    if (sliderHeroSections.length) {
      sliderHeroSections.each(function () {
        $(this).attr('class', 'er-slider-hero swiper');
        $(this).children().attr('class', 'swiper-wrapper');
        $(this).append('<div class="swiper-pagination"></div>');
        $(this).children().children().attr('class', 'swiper-slide');
        const pagination = $(this).find('.swiper-pagination');

        const swiper = new Swiper(this, {
          loop: true,
          speed: 500,
          autoplay: {
            delay: 5000,
          },
          pagination: {
            el: pagination[0],
            clickable: true,
          },
        });

        console.log(swiper);
      });
    }

    // Section slider logos
    let sliderLogosSections = $('.et-slider-logos .elementor-image-gallery');
    if (sliderLogosSections.length) {
      sliderLogosSections.each(function () {
        $(this).attr('class', 'er-slider swiper');
        $(this).children().attr('class', 'swiper-wrapper');
        $(this).children().children().attr('class', 'swiper-slide');

        const swiper = new Swiper(this, {
          spaceBetween: 0,
          centeredSlides: true,
          speed: 6000,
          autoplay: {
            delay: 1,
          },
          loop: true,
          slidesPerView: 5,
          allowTouchMove: false,
          disableOnInteraction: true,
          breakpoints: {
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 5,
              spaceBetween: 0,
            },
          },
        });
      });
    }

    const navButtons = document.querySelectorAll('.er-accordion-nav button');
    const accordionItems = document.querySelectorAll(
      '.er-accordion .e-n-accordion-item'
    );

    if (navButtons.length === 0 || accordionItems.length === 0) {
      return;
    }

    navButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        navButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        accordionItems[index].querySelector('.e-n-accordion-item-title').click();

        // Optional: Scroll to accordion
        setTimeout(() => {
          $('html, body').animate({
            scrollTop: $(accordionItems[index]).offset().top - 100,
          }, 500);
        }, 500);
      });
    });

    accordionItems.forEach((item, index) => {
      const title = item.querySelector('.e-n-accordion-item-title');
      title.addEventListener('click', () => {
        // Remove active class from all buttons
        navButtons.forEach((b) => b.classList.remove('active'));
        navButtons[index].classList.add('active');
      });
		});
		
		const hash = window.location.hash;

    navButtons.forEach((btn) => {
      if (btn.dataset.target === hash) {
        if(btn.classList.contains('active')) return;
        btn.click();
      }
    });


    var leasingCalculator;

    if ($("#lur_main_layout").length > 0) {
      if ($("#calculator-container").length > 0)
        $("#calculator-container").append($("#lur_main_layout"));
      leasingCalculator = new LeasingCalculator($("#lur_main_layout"));
    }

    $(".expand-btn").on("click", function (e) {
      e.preventDefault();
      $($(this).data("show")).toggleClass("active");
      $($(this).data("hide")).removeClass("active");
      if ($($(this).data("show")).hasClass("active"))
        $(this).text($(this).data("text-active"));
      else $(this).text($(this).data("text"));
      return false;
    });

  });
})(this, jQuery);
