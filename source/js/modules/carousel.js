if (document.querySelector('.accordion') && document.querySelector('.accordion__list') && document.querySelector('.accordion__item') && document.querySelector('.accordion__next') && document.querySelector('.accordion__back') && document.querySelector('.accordion__wrapper') && document.querySelector('.accordion__controls ')) {
  const carousel = document.querySelector('.accordion');
  const items = document.querySelector('.accordion__list');
  const item = document.querySelector('.accordion__item');
  const nextButton = document.querySelector('.accordion__next');
  const prevButton = document.querySelector('.accordion__back');
  const accordionWrapper = document.querySelector('.accordion__wrapper');
  const accordionControls = document.querySelector('.accordion__controls ');

  const allSlidesCount = document.querySelectorAll('.accordion__item').length;
  const visibleSlides = 1;

  accordionWrapper.classList.remove('accordion__wrapper--no-js');
  items.classList.remove('accordion__list--no-js');
  accordionControls.classList.remove('accordion__controls--no-js');

  let offsetSlide = parseInt(window.getComputedStyle(items, null).getPropertyValue('left'), 10);
  if (offsetSlide <= 0) {
    prevButton.setAttribute('disabled', 'disabled');
  }

  let touchPositionStart = null;

  const moveItems = (evt) => {
    const stepOffset = parseInt(item.offsetWidth, 10) + parseInt(window.getComputedStyle(item).getPropertyValue('margin-right'), 10);
    const maxOffset = ((stepOffset * allSlidesCount) - (stepOffset * visibleSlides)) * -1;


    if (evt.target.matches('.accordion__next') || evt.target.matches('.accordion__back') || evt.touches) {
      let touchPositionEnd = null;
      let diffPosition = null;

      if (evt.touches) {
        touchPositionEnd = evt.changedTouches[0].clientX;
        diffPosition = touchPositionEnd - touchPositionStart;
      }
      if (offsetSlide > maxOffset) {
        if (evt.target.matches('.accordion__next') || diffPosition < 0) {
          offsetSlide = offsetSlide - stepOffset;
          items.style.left = `${offsetSlide}px`;
        }
      }

      if (offsetSlide <= stepOffset * -1) {
        if (evt.target.matches('.accordion__back') || diffPosition > 0) {
          offsetSlide = offsetSlide + stepOffset;
          items.style.left = `${offsetSlide}px`;
        }
      }

      if (offsetSlide < 0) {
        prevButton.removeAttribute('disabled');
      } else if (offsetSlide <= 0) {
        prevButton.setAttribute('disabled', 'disabled');
      }

      if (offsetSlide === maxOffset) {
        nextButton.setAttribute('disabled', 'disabled');
      } else {
        nextButton.removeAttribute('disabled');
      }

    }

  };

  carousel.addEventListener('click', moveItems);

  carousel.addEventListener('touchstart', (evt) => {
    touchPositionStart = evt.touches[0].clientX;
  });

  carousel.addEventListener('touchend', moveItems);
}
