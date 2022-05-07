if (document.querySelector('.background-header')) {
  const background = document.querySelector('.background-header');

  if (document.querySelector('.page-header')) {
    const header = document.querySelector('.page-header');
    const headerHeight = header.clientHeight;

    const onScrollBody = ()=> {
      const scroll = window.scrollY;
      const desktopWidth = 1024;

      window.addEventListener('resize', ()=> {
        if (window.innerWidth < desktopWidth) {
          background.style.paddingTop = 0;
        }
      });

      if (window.innerWidth >= desktopWidth) {
        if (scroll > headerHeight) {
          header.classList.add('page-header--fixed');
          background.style.paddingTop = headerHeight + 'px';
        } else {
          header.classList.remove('page-header--fixed');
          background.style.paddingTop = 0;
        }
      }
    };

    window.addEventListener('scroll', onScrollBody);
  }
}
