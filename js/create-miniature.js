import {getData} from './server-data.js';
const template = document.querySelector('#picture').content;
const miniature = template.querySelector('.picture');
const picturesBlock = document.querySelector('.pictures');

const fragment = document.createDocumentFragment();

function getFragmentPictures (arrayObject) {
  arrayObject.forEach(({url, likes, comments}) => {
    const addMiniature = miniature.cloneNode(true);
    const photo = addMiniature.querySelector('img');
    const pictureLikes = addMiniature.querySelector('.picture__likes');
    const pictureComments = addMiniature.querySelector('.picture__comments');

    photo.src = url;
    pictureLikes.textContent = likes;
    pictureComments.textContent = comments.length;
    fragment.append(addMiniature);

  });

  return picturesBlock.append(fragment);
}



export {getFragmentPictures, picturesBlock};
