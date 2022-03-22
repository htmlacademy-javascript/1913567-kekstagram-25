
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

export {getRandomInt, compareStringLength, isEnterKey, isEscapeKey};
