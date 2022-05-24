if (document.querySelector('.slider__controls') && document.querySelector('.slider__list') && document.querySelector('.slider__item') && document.querySelector('.slider') && document.querySelector('.slider__slides')) {
  const slider = document.querySelector('.slider');
  const listSlider = document.querySelector('.slider__list');
  const allSlides = document.querySelectorAll('.slider__item');
  const sliderContainer = document.querySelector('.slider__slides');
  const sliderControls = document.querySelector('.slider__controls');

  listSlider.classList.remove('slider__list--no-js');
  sliderContainer.classList.remove('slider__slides--no-js');
  sliderControls.classList.remove('slider__controls--no-js');


  let touchPositionStartX = null;
  let touchPositionStartY = null;

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


    if (evt.target.matches('.slider__next') || evt.target.matches('.slider__back') || evt.touches) {
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

      if (evt.target.matches('.slider__next') || diffPositionX < 0) {
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
      if (evt.target.matches('.slider__back') || diffPositionX > 0) {
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

    touchPositionStartX = evt.touches[0].clientX;
    touchPositionStartY = evt.touches[0].clientY;
  });

  slider.addEventListener('touchend', moveSlides);
}
