if (document.querySelector('.page-footer')) {
  const footer = document.querySelector('.page-footer');

  if (footer.querySelector('.main-nav__list')) {
    const mainNavList = footer.querySelector('.main-nav__list');

    mainNavList.classList.remove('main-nav__list--nojs');

    if (footer.querySelector('.address__list')) {
      const addressList = footer.querySelector('.address__list');

      addressList.classList.remove('address__list--nojs');

      if (footer.querySelector('.plus-button')) {
        const buttons = footer.querySelectorAll('.plus-button');

        buttons.forEach((item)=> {
          item.classList.remove('plus-button--nojs');
        });

        if (footer.querySelector('.main-nav')) {
          const mainNav = footer.querySelector('.main-nav');

          if (footer.querySelector('.address')) {
            const address = footer.querySelector('.address');

            const onClickButtonToggle = (evt) => {
              if (evt.target.matches('.plus-button')) {
                if (evt.target.parentNode === mainNav) {
                  buttons.forEach((item) => {
                    if (item !== evt.target) {
                      if (item.classList.contains('plus-button--inactive')) {
                        item.classList.remove('plus-button--inactive');
                      }
                    }
                  });
                  evt.target.classList.toggle('plus-button--inactive');
                  mainNavList.style.display = 'block';
                  setTimeout(()=> {
                    mainNavList.classList.toggle('main-nav__list--visible');
                  }, 100);
                  if (addressList.classList.contains('address__list--visible')) {
                    addressList.classList.remove('address__list--visible');
                  }
                }
                if (evt.target.parentNode === address) {
                  buttons.forEach((item) => {
                    if (item !== evt.target) {
                      if (item.classList.contains('plus-button--inactive')) {
                        item.classList.remove('plus-button--inactive');
                      }
                    }
                  });
                  evt.target.classList.toggle('plus-button--inactive');
                  addressList.style.display = 'grid';
                  setTimeout(()=> {
                    addressList.classList.toggle('address__list--visible');
                  }, 100);
                  if (mainNavList.classList.contains('main-nav__list--visible')) {
                    mainNavList.classList.remove('main-nav__list--visible');
                  }
                }
              }
            };

            footer.addEventListener('click', onClickButtonToggle);
          }
        }
      }

    }
  }
}
