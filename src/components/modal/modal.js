export function showNotify(title = '', message = '') {
  let modal = document.querySelector('.modal[data-modal="notify"]');
  let modalTitle = modal.querySelector('.modal__title');
  let modalDesc = modal.querySelector('.modal__desc');
  modal.classList.add('modal_active');
  document.body.style.overflow = 'hidden';

  modalTitle.textContent = title;
  modalDesc.textContent = message;

  modal.addEventListener('click', hideModal, true);
}

function showModal() {
  const modalButtons = document.querySelectorAll('.button_modal');
  if (modalButtons) {
    modalButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const buttonData = button.getAttribute('data-modal');
        let modal = document.querySelector(`.modal[data-modal=${buttonData}]`);
        if (modal) {
          modal.classList.add('modal_active');
          document.body.style.overflow = 'hidden';
          modal.addEventListener('click', hideModal, true);
        }
      })
    })
    
  }
}

export function hideModal(event = null, modal = null) {
  if (event !== null) {
    if (
      event.target.classList.contains('modal__overlay') ||
      event.target.classList.contains('modal__close')
    ) {
      const modal = event.target.closest('.modal');
      modal.classList.remove('modal_active');
      modal.classList.add('modal_hide');
      document.body.style.overflow = '';
      modal.removeEventListener('click', hideModal, true);
    }
  } else if(modal !== null) {
      modal.classList.remove('modal_active');
      modal.classList.add('modal_hide');
      document.body.style.overflow = '';
      modal.removeEventListener('click', hideModal, true);
  }
}

showModal();