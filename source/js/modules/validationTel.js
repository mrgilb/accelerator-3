import {isBackspace} from '../utils/isBackspace.js';

const regexp = /\+7\(\d{3}\)\d{3}\d{2}\d{2}/;
const regexpNumbers = /^\d/;
const fisrtSymbolPhone = '+7';
const fisrtSymbolsPhone = '+7(';
const reverseBracket = ')';
const bracket = '(';

export const getOnlyNumbers = (event) => {
  if (event.target.matches('.tel')) {
    if (event.key) {
      const symbol = event.key.toString();

      if (event.key === 'Tab') {
        return;
      }
      if (!regexpNumbers.test(symbol)) {
        event.preventDefault();
      }
    }
  }
};

document.addEventListener('keydown', getOnlyNumbers);

const deleteLastSymbol = (evt) => {
  if (document.querySelectorAll('.submit')) {
    const buttons = document.querySelectorAll('.submit');
    if (isBackspace(evt)) {
      evt.preventDefault();
      evt.target.value = evt.target.value.slice(0, -1);

      if (!regexp.test(evt.target.value)) {
        evt.target.setCustomValidity('Номер телефона должен быть введен в формате +7(999)9999999');
        buttons.forEach((button) => {
          button.setAttribute('disabled', 'disabled');
        });
      }
    }
  }
};

export const validationTel = (evt, disabledButton) => {
  if (!evt.target.value.startsWith(fisrtSymbolPhone)) {
    evt.target.setCustomValidity(`Номер телефона должен начинаться с ${fisrtSymbolPhone}`);
  }
  if (evt.target.value.length < 2) {
    evt.target.value = fisrtSymbolsPhone.concat(evt.target.value);
  }

  if (evt.target.value.startsWith(fisrtSymbolPhone)) {
    evt.target.setCustomValidity('');
  }

  if (evt.target.value.length === 2) {
    evt.target.value = evt.target.value.concat(bracket);
    document.addEventListener('keydown', deleteLastSymbol);
  }

  if (evt.target.value.length === 6) {
    evt.target.value = evt.target.value.concat(reverseBracket);
    document.addEventListener('keydown', deleteLastSymbol);
  }

  if (!regexp.test(evt.target.value)) {
    evt.target.setCustomValidity('Номер телефона должен быть введен в формате +7(999)9999999');
    disabledButton.setAttribute('disabled', 'disabled');
  } else {
    evt.target.setCustomValidity('');
    disabledButton.removeAttribute('disabled');
  }
  evt.target.reportValidity();
};

export const addFirstSymbols = (evt) => {
  evt.target.value = '+7(';
};

if (document.querySelector('#phone')) {
  const phoneInput = document.querySelector('#phone');
  if (document.querySelector('.feedback__button')) {
    const submitFrom = document.querySelector('.feedback__button');
    phoneInput.addEventListener('input', (event) => {
      validationTel(event, submitFrom);
    });

    phoneInput.addEventListener('click', (event) => {
      addFirstSymbols(event);
      submitFrom.setAttribute('disabled', 'disabled');
    });

    phoneInput.addEventListener('focus', (event) => {
      addFirstSymbols(event);
      submitFrom.setAttribute('disabled', 'disabled');
    });
  }
}
