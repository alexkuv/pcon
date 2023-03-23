/**
 * @param {HTMLElement} selector 
 */
function accordionInit (selector) {
  if (selector.classList.contains('open')) {
    openAccordion(selector);
  }
  selector.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.accordion__trigger')) {
      selector.classList.contains('open') ?
      closeAccordion(selector) :
      openAccordion(selector);
    }
  })
}

/**
 * @param {HTMLElement} acc
 */
function openAccordion(acc) {
  closeAllAccordions();
  const accBody = acc.querySelector('.accordion__body');
  acc.classList.add('open');
  accBody.style.height = `${accBody.scrollHeight}px`;
}

/**
 * @param {HTMLElement} acc
 */
 function closeAccordion(acc) {
  const accBody = acc.querySelector('.accordion__body');
  acc.classList.remove('open');
  accBody.style.height = ``;
}

/**
 * finds all elements with the accordion class and removes the open class
 */
function closeAllAccordions() {
  const accordions = document.querySelectorAll('.accordion');
  if (accordions) {
    accordions.forEach(item => {
      const accBody = item.querySelector('.accordion__body');
      item.classList.remove('open');
      accBody.style.height = ``;
    });
  }
}

const _accordions = document.querySelectorAll('.accordion');
if (_accordions) {
  _accordions.forEach(item => accordionInit(item));
}

