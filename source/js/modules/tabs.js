if (document.querySelector('.tabs__button ') && document.querySelector('.tabs__list') && document.querySelector('.tabs__controls')) {
  const tabsButtonsContainer = document.querySelector('.tabs__controls');
  const tabsButtons = document.querySelectorAll('.tabs__button');
  const tabsContents = document.querySelectorAll('.tabs__list');

  tabsContents.forEach((item) => {
    item.classList.remove('tabs__list--no-js');
  });

  tabsButtonsContainer.classList.remove('tabs__controls--no-js');

  tabsButtonsContainer.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target.matches('.tabs__button')) {
      tabsButtons.forEach((button) => {
        button.classList.remove('tabs__button--active');
      });

      evt.target.classList.add('tabs__button--active');

      tabsContents.forEach((item) => {
        item.classList.add('tabs__list--display-none');
        item.style = 'opacity: 0';
        if (evt.target.classList.contains(item.id)) {
          item.classList.remove('tabs__list--display-none');
          item.style = 'opacity: 1';
        }
      });
    }
  });
}
