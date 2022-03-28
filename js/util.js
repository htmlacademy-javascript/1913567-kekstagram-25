
function getRandomInt (from, to) {
  from = Math.ceil(from);
  to = Math.floor(to);
  if (from <0 || to <0) {
    return 0;
  }
  if (from > to) {
    const memory = from;
    from = to;
    to = memory;
  }
  return Math.floor(Math.random() * (to - from + 1) + from);
}

getRandomInt();

function compareStringLength (string, length) {
  return string.length <= length;
}

function isEscapeKey (evt) {
  return evt.key === 'Escape';
}

function isEnterKey (evt) {
  return evt.key === 'Enter';
}

const ALERT_SHOW_TIME = 5000;

function showAlert (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {getRandomInt, compareStringLength, isEnterKey, isEscapeKey, showAlert};
