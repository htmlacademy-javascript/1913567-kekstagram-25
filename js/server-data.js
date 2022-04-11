import {showAlert} from './util.js';
function getData (onSuccess) {
  return fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((posts) => {
      onSuccess(posts);
      return posts;
    })
    .catch(() => {
      showAlert('Ошибка загрузки данных');
    });
}

function sendData (onSuccess, onFail, body) {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}

export {getData, sendData};
