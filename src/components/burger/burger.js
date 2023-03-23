function changeBurger () {
  const burger = document.querySelector('.burger');
  if (burger) {
    const mobileMenu = document.querySelector('.header__nav-mobile');
    const overlay = document.querySelector('.header__overlay');
    const close = document.querySelector('.header__nav-close');
    burger.addEventListener('click', (e) => {

      e.preventDefault();
      mobileMenu.classList.toggle('show');
      mobileMenu.classList.toggle('hide');
      overlay.classList.toggle('header__overlay_active');

      if (mobileMenu.classList.contains('show')) {

        mobileMenu.addEventListener('click', navLinkHandler, true);

        close.addEventListener('click', () => {
          mobileMenu.classList.remove('show');
          mobileMenu.classList.add('hide');
          overlay.classList.remove('header__overlay_active');
          document.body.style.overflow = '';
          mobileMenu.removeEventListener('click', navLinkHandler, true);
        } )

        overlay.addEventListener('click', () => {
          mobileMenu.classList.remove('show');
          mobileMenu.classList.add('hide');
          overlay.classList.remove('header__overlay_active');
          document.body.style.overflow = '';
          mobileMenu.removeEventListener('click', navLinkHandler, true);
        } )

        document.body.style.overflow = 'hidden';
      }
    })
  }
}

function navLinkHandler(event) {
  if (event.target.closest('.header__nav-link')) {
    const headerNavMobile = event.target.closest('.header__nav-mobile');
    headerNavMobile.classList.remove('show');
    headerNavMobile.classList.add('hide');
    document.querySelector('.header__overlay ').classList.remove('header__overlay_active');
    document.body.style.overflow = '';
    headerNavMobile.removeEventListener('click', navLinkHandler, true);
  }
}

changeBurger();