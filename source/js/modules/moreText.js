if (document.querySelector('.about')) {
  const aboutSection = document.querySelector('.about');
  aboutSection.classList.remove('about--nojs');

  if (aboutSection.querySelector('#more-text')) {
    const button = aboutSection.querySelector('#more-text');

    if (aboutSection.querySelector('.about__text-additional-mobile')) {
      const textForMobile = aboutSection.querySelector('.about__text-additional-mobile');

      if (aboutSection.querySelector('.about__text-additional-tablet')) {
        const textForTablet = aboutSection.querySelector('.about__text-additional-tablet');

        const onClickButtonClose = (evt) => {
          const mobileWidth = 768;
          evt.target.textContent = 'Подробнее';
          textForTablet.style.maxHeight = '0';
          textForTablet.style.overflow = 'hidden';
          if (window.innerWidth < mobileWidth) {
            textForMobile.style.maxHeight = '0';
            textForMobile.style.marginBottom = '0';
            textForMobile.style.overflow = 'hidden';
          }
          evt.target.addEventListener('click', onClickButtonOpen);
        };

        const onClickButtonOpen = (evt) => {
          const mobileWidth = 768;
          evt.target.textContent = 'Свернуть';
          textForTablet.style.display = 'block';
          textForTablet.style.maxHeight = '800px';
          textForTablet.style.overflow = 'auto';
          if (window.innerWidth < mobileWidth) {
            textForMobile.style.maxHeight = '800px';
            textForMobile.style.marginBottom = '20px';
            textForMobile.style.overflow = 'auto';
          }
          evt.target.removeEventListener('click', onClickButtonOpen);
          evt.target.addEventListener('click', onClickButtonClose);
        };

        button.addEventListener('click', onClickButtonOpen);
      }
    }
  }
}
