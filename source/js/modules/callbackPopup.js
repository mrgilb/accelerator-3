import {isEscapeKey} from '../utils/isEscape.js';
import {isTab} from '../utils/isTab.js';
import {addFirstSymbols, validationTel} from './validationTel.js';

if (document.querySelector('.contacts__callback')) {
  const buttonCallback = document.querySelector('.contacts__callback');

  if (document.querySelector('#callback')) {
    const callbackFormTemlate = document.querySelector('#callback').cloneNode(true).content;
    const callbackForm = callbackFormTemlate.cloneNode(true);
    const callbackFormContainer = callbackForm.querySelector('.callback-form');
    const callbackInputPhobe = callbackForm.querySelector('#callback-phone');

    if (callbackFormContainer.querySelector('.callback__submit')) {
      const submitButton = callbackFormContainer.querySelector('.callback__submit');

      callbackInputPhobe.addEventListener('click', (event) => {
        addFirstSymbols(event);
        submitButton.setAttribute('disabled', 'disabled');
      });
      callbackInputPhobe.addEventListener('focus', (event) => {
        addFirstSymbols(event);
        submitButton.setAttribute('disabled', 'disabled');
      });
      callbackInputPhobe.addEventListener('input', (event) => {
        validationTel(event, submitButton);
      });
    }

    if (document.querySelector('.body-page')) {
      const body = document.querySelector('.body-page');

      if (body.querySelector('.shading')) {
        const shading = body.querySelector('.shading');

        const onClickCallbackButton = (evt) => {
          evt.preventDefault();

          body.appendChild(callbackFormContainer);
          if (callbackFormContainer.querySelector('#firstname-callback')) {
            const nameField = callbackFormContainer.querySelector('#firstname-callback');
            nameField.focus();

            const scrolledPopup = (event) => {
              if (event.deltaY > 0) {
                callbackFormContainer.style.top = `${parseInt(callbackFormContainer.style.top, 10) - 40}px`;
              } else {
                callbackFormContainer.style.top = `${parseInt(callbackFormContainer.style.top, 10) + 40}px`;
              }
            };

            window.addEventListener('wheel', scrolledPopup);

            if (window.innerHeight === parseInt(window.getComputedStyle(callbackFormContainer, null).height, 10) || window.innerHeight > parseInt(window.getComputedStyle(callbackFormContainer, null).height, 10)) {
              window.removeEventListener('wheel', scrolledPopup);
              callbackFormContainer.style.top = '0';
              callbackFormContainer.style.marginTop = '146px';
            }

            window.addEventListener('resize', () => {
              if (window.innerHeight === parseInt(window.getComputedStyle(callbackFormContainer, null).height, 10)) {
                callbackFormContainer.style.top = '0';
                callbackFormContainer.style.marginTop = '0';
                window.removeEventListener('wheel', scrolledPopup);
              }
              if (window.innerHeight < parseInt(window.getComputedStyle(callbackFormContainer, null).height, 10)) {
                window.addEventListener('wheel', scrolledPopup);
              }
              if (window.innerHeight > parseInt(window.getComputedStyle(callbackFormContainer, null).height, 10)) {
                window.removeEventListener('wheel', scrolledPopup);
                callbackFormContainer.style.top = '0';
                if (window.innerHeight - parseInt(window.getComputedStyle(callbackFormContainer, null).height, 10) < 146) {
                  callbackFormContainer.style.marginTop = `${window.innerHeight - parseInt(window.getComputedStyle(callbackFormContainer, null).height, 10)}px`;
                }
              }
            });

            document.addEventListener('keydown', (event) => {
              if (isTab(event)) {
                if (event.shiftKey) {
                  if (event.target === nameField) {

                    if (callbackFormContainer.querySelector('.callback-form__close')) {
                      const closeButton = callbackFormContainer.querySelector('.callback-form__close');

                      closeButton.focus();
                    }
                  }
                }
              }
            });
          }

          setTimeout(() => {
            callbackFormContainer.style.top = '0';
          }, 300);
          shading.classList.add('shading--active');
          body.style.position = 'fixed';

          document.addEventListener('click', (event) => {
            if (event.target.matches('.shading')) {
              callbackFormContainer.remove();
              callbackFormContainer.style.top = '-1000px';
              shading.classList.remove('shading--active');
              body.style.position = 'static';
            }
          });
        };

        const onClickKeyDown = (evt) => {
          if (isEscapeKey(evt)) {
            callbackFormContainer.remove();
            callbackFormContainer.style.top = '-1000px';
            shading.classList.remove('shading--active');
            body.style.position = 'static';
          }
        };
        if (callbackForm.querySelector('.callback-form__close')) {
          const closeButton = callbackForm.querySelector('.callback-form__close');

          const onClickCloseButton = (evt) => {
            evt.preventDefault();
            callbackFormContainer.remove();
            callbackFormContainer.style.top = '-1000px';
            shading.classList.remove('shading--active');
            body.style.position = 'static';
          };

          closeButton.addEventListener('click', onClickCloseButton);
        }
        buttonCallback.addEventListener('click', onClickCallbackButton);
        document.addEventListener('keydown', onClickKeyDown);
      }
    }
  }
}
