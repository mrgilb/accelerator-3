if (document.querySelector('.slider__controls') && document.querySelector('.slider__list') && document.querySelector('.slider__item') && document.querySelector('.slider')) {
  const slider = document.querySelector('.slider');
  const listSlider = document.querySelector('.slider__list');
  const allSlides = document.querySelectorAll('.slider__item');


  let touchPositionStart = null;

  let renderSlides = [];

  allSlides.forEach((item) => {
    renderSlides.push(item);
  });

  allSlides.forEach((item) => {
    item.remove();
  });

  renderSlides.map((slide) => {
    listSlider.appendChild(slide);
  });


  const moveSlides = (evt) => {
    evt.preventDefault();

    if (evt.target.matches('.slider__next') || evt.target.matches('.slider__back') || evt.touches) {
      let touchPositionEnd = null;
      let diffPosition = null;

      if (evt.touches) {
        touchPositionEnd = evt.changedTouches[0].clientX;
        diffPosition = touchPositionEnd - touchPositionStart;
      }

      if (evt.target.matches('.slider__next') || diffPosition < 0) {
        for (let index = 0; index < renderSlides.length; index++) {
          if (index === 0) {
            listSlider.style = 'opacity: 0';
            setTimeout(() => {
              const item = renderSlides.splice(renderSlides, 1)[0];
              renderSlides.splice(renderSlides.length, 1, item);
              renderSlides.map((slide) => {
                listSlider.appendChild(slide);
              });
            }, 400);
            setTimeout(() =>{
              listSlider.style = 'opacity: 1';
            }, 500);
            break;
          }
        }
      }
      if (evt.target.matches('.slider__back') || diffPosition > 0) {
        for (let index = 0; index < renderSlides.length; index++) {
          if (index === renderSlides.length - 1) {
            listSlider.style = 'opacity: 0';
            setTimeout(()=>{
              const item = renderSlides.splice(renderSlides.length - 1, 1)[0];
              renderSlides.splice(0, 0, item);
              renderSlides.map((slide) => {
                listSlider.appendChild(slide);
              });
            }, 400);
            setTimeout(() =>{
              listSlider.style = 'opacity: 1';
            }, 500);
            break;
          }
        }
      }
    }

  };

  slider.addEventListener('click', moveSlides);
  slider.addEventListener('touchstart', (evt) => {
    touchPositionStart = evt.touches[0].clientX;
  });

  slider.addEventListener('touchend', moveSlides);
}
