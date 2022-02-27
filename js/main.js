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
compareStringLength ('fghhfgfj', 100);


const arrayIntrger = [];
for (let i = 1; i <= 25; i++) {
  arrayIntrger.push(i);
}


const ARRAY_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const ARRAY_NAME = [
  'Вася',
  'Петя',
  'Клава',
  'Маша',
  'Всеволод',
];
function generateObject () {
  const currentInteger = arrayIntrger.splice(0,1)[0];
  return {
    id : currentInteger,
    url : `photos/${currentInteger}`,
    description : 'Это фото вам понравится больше чем предыдущее',
    likes : getRandomInt(15, 200),
    comments : {
      id : currentInteger,
      avatar: `img/avatar-${  getRandomInt(1, 6)  }.svg`,
      message: ARRAY_COMMENTS[getRandomInt(0, ARRAY_COMMENTS.length - 1)],
      name : ARRAY_NAME[getRandomInt(0, ARRAY_NAME.length - 1)],

    },
  };
}

const arrayObject = Array.from({length:arrayIntrger.length}, generateObject);

console.log(generateObject(), generateObject(), arrayObject);
