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

function compareStringLength (string, maxLingth) {
  if (string.length > maxLingth) {
    return false;
  }

  return true;
}
compareStringLength ();
