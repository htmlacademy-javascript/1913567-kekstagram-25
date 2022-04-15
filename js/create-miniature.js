import {openModal} from './show-post.js';
const template = document.querySelector('#picture').content;
const miniature = template.querySelector('.picture');
const picturesBlock = document.querySelector('.pictures');

const fragment = document.createDocumentFragment();

const getFragmentPictures = (arrayObject) => {
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
  picturesBlock.append(fragment);
  openModal(arrayObject);
};


export {getFragmentPictures, picturesBlock};
