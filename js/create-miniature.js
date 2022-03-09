import { arrayObject } from './server-data.js';
import { getRandomInt } from './util.js';
const template = document.querySelector('#picture').content;
const miniature = template.querySelector('.picture');
const picturesBlock = document.querySelector('.pictures');

const fragment = document.createDocumentFragment();


// for (let i = 0; i < arrayObject.length; i++) {
//   const addMiniature = miniature.cloneNode(true);
//   const photo = addMiniature.querySelector('img');
//   const pictureLikes = addMiniature.querySelector('.picture__likes');
//   const pictureComments = addMiniature.querySelector('.picture__comments');

//   photo.src = arrayObject[i].url;
//   pictureLikes.textContent = String(arrayObject[i].likes);
//   pictureComments.textContent = String(getRandomInt(0, 100));
//   fragment.append(addMiniature);

// }

arrayObject.forEach(({url, likes}) => {
  const addMiniature = miniature.cloneNode(true);
  const photo = addMiniature.querySelector('img');
  const pictureLikes = addMiniature.querySelector('.picture__likes');
  const pictureComments = addMiniature.querySelector('.picture__comments');

  photo.src = url;
  pictureLikes.textContent = String(likes);
  pictureComments.textContent = String(getRandomInt(0, 100));
  fragment.append(addMiniature);

});

picturesBlock.append(fragment);

// arrayObject.forEach(({url, likes}) => {
//   const addMiniature = miniature.cloneNode(true);
//   const photo = addMiniature.querySelector('img');
//   const pictureLikes = addMiniature.querySelector('.picture__likes');
//   const pictureComments = addMiniature.querySelector('.picture__comments');

//   photo.src = url;
//   pictureLikes.textContent = String(likes);
//   pictureComments.textContent = String(getRandomInt(0, 100));
//   picturesBlock.append(addMiniature);

// });
