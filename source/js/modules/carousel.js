if (document.querySelector('.accordion') && document.querySelector('.accordion__list') && document.querySelector('.accordion__item') && document.querySelector('.accordion__next') && document.querySelector('.accordion__back') && document.querySelector('.accordion__wrapper') && document.querySelector('.accordion__controls ')) {
  const carousel = document.querySelector('.accordion');
  const items = document.querySelector('.accordion__list');
  const nextButton = document.querySelector('.accordion__next');
  const prevButton = document.querySelector('.accordion__back');
  const accordionWrapper = document.querySelector('.accordion__wrapper');
  const accordionControls = document.querySelector('.accordion__controls ');
  const allSlides = document.querySelectorAll('.accordion__item');

  const maxSlides = allSlides.length;
  let visibleSlidesCount = 0;
  let renderSlides = [];

  prevButton.setAttribute('disabled', 'disabled');

  allSlides.forEach((slide) => {
    renderSlides.push(slide);
  });

  allSlides.forEach((slide) => {
    slide.remove();
  });

  renderSlides.map((slide) => {
    items.appendChild(slide);
  });


  accordionWrapper.classList.remove('accordion__wrapper--no-js');
  items.classList.remove('accordion__list--no-js');
  accordionControls.classList.remove('accordion__controls--no-js');


  let touchPositionStartX = null;
  let touchPositionStartY = null;

  const moveItems = (evt) => {


    if (evt.target.matches('.accordion__next') || evt.target.matches('.accordion__back') || evt.touches) {
      let touchPositionEndX = null;
      let touchPositionEndY = null;
      let diffPositionX = null;

      if (evt.touches) {
        touchPositionEndX = evt.changedTouches[0].clientX;
        touchPositionEndY = evt.changedTouches[0].clientY;
        if (Math.abs(touchPositionEndY - touchPositionStartY) < Math.abs(touchPositionEndX - touchPositionStartX)) {
          diffPositionX = touchPositionEndX - touchPositionStartX;
        }
      }

      if (evt.target.matches('.accordion__next') || diffPositionX < 0) {
        if (visibleSlidesCount < maxSlides - 1) {
          visibleSlidesCount = visibleSlidesCount + 1;
        }

        if (visibleSlidesCount === maxSlides - 1) {
          nextButton.setAttribute('disabled', 'disabled');

        }

        if (visibleSlidesCount > 0) {
          prevButton.removeAttribute('disabled');
        }


        for (let index = 0; index < renderSlides.length; index++) {
          const element = renderSlides[index];
          if (renderSlides.indexOf(element) === visibleSlidesCount) {
            renderSlides.map((slide)=> {
              slide.classList.add('accordion__item--display-none');
              element.classList.remove('accordion__item--display-none');
            });
          }
        }
      }

      if (evt.target.matches('.accordion__back') || diffPositionX > 0) {
        if (visibleSlidesCount >= 0) {
          visibleSlidesCount = visibleSlidesCount - 1;
        }

        if (visibleSlidesCount === 0) {
          prevButton.setAttribute('disabled', 'disabled');
        }

        if (visibleSlidesCount !== maxSlides - 1) {
          nextButton.removeAttribute('disabled');
        }

        for (let index = 0; index < renderSlides.length; index++) {
          const element = renderSlides[index];
          if (renderSlides.indexOf(element) === visibleSlidesCount) {
            renderSlides.map((slide)=> {
              slide.classList.add('accordion__item--display-none');
              element.classList.remove('accordion__item--display-none');
            });
          }
        }
      }
    }

  };

  carousel.addEventListener('click', moveItems);

  carousel.addEventListener('touchstart', (evt) => {
    touchPositionStartX = evt.touches[0].clientX;
    touchPositionStartY = evt.touches[0].clientY;
  });

  carousel.addEventListener('touchend', moveItems);
}
