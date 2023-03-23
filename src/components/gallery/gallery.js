import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';
import 'photoswipe/style.css';

const lightbox = new PhotoSwipeLightbox({
  pswpModule: () => PhotoSwipe,
  bgOpacity: .7,
  gallery: '.gallery',
  children: '.gallery__link',
  closeTitle: 'Закрыть',
  zoomTitle: 'Увеличить',
});
lightbox.init();
