import Swiper, { Navigation, FreeMode, Autoplay } from 'swiper';
import 'swiper/css';
document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.carousel', {
    modules: [Navigation, FreeMode, Autoplay],
    spaceBetween: 10,
    slidesPerView: 1.5,
    freeMode: true,
    rewind: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    breakpoints: {
      1279: {
        freeMode: false,
        slidesPerView: 3,
        spaceBetween: 35,
        navigation: {
          nextEl: ".carousel__next",
          prevEl: ".carousel__prev"
        },
      },
      767: {
        spaceBetween: 25,
        slidesPerView: 2.5,
      }
    },
  })
})
