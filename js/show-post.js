import { arrayObject } from './server-data.js';
import {isEscapeKey} from './util.js';

// function showModalPost() {
//   const modalPost = document.querySelector('.big-picture');
//   modalPost.classList.remove('hidden');

//   const modalImage = modalPost.querySelector('.big-picture__img img');
//   modalImage.src= arrayObject[0].url;

//   const modalLikes = modalPost.querySelector('.likes-count');
//   modalLikes.textContent = arrayObject[0].likes;

//   const modalCommentsCount = modalPost.querySelector('.comments-count');
//   const commentsCount = modalPost.querySelectorAll('.social__comments li');
//   modalCommentsCount.textContent = commentsCount.length;

//   const descriptionPhoto = modalPost.querySelector('.social__caption');
//   descriptionPhoto.textContent = arrayObject[0].description;
// }


function createComment () {
  const liElement = document.createElement('li');
  liElement.classList.add('social__comment');

  const imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.src = arrayObject[0].comments.avatar;
  imgElement.alt = arrayObject[0].comments.name;
  imgElement.style.width = '35px';
  imgElement.style.height = '35px';
  liElement.append(imgElement);

  const pElement = document.createElement('p');
  pElement.classList.add('social__text');
  pElement.textContent = arrayObject[0].comments.message;
  liElement.append(pElement);
}
createComment();


const pictures = document.querySelectorAll('a.picture');
const modalPost = document.querySelector('.big-picture');
const blockCommentsCount = modalPost.querySelector('.social__comment-count');
const body = document.querySelector('body');

for (let i = 0; i < pictures.length; i++) {
  const picture = pictures[i];

  picture.addEventListener('click',  (evt) => {
    evt.preventDefault();
    modalPost.classList.remove('hidden');
    blockCommentsCount.classList.add('hidden');
    body.classList.add('modal-open');

    const modalImage = modalPost.querySelector('.big-picture__img img');
    modalImage.src= arrayObject[i].url;

    const modalLikes = modalPost.querySelector('.likes-count');
    modalLikes.textContent = arrayObject[i].likes;

    const modalCommentsCount = modalPost.querySelector('.comments-count');
    const commentsCount = modalPost.querySelectorAll('.social__comments li');
    modalCommentsCount.textContent = commentsCount.length;

    const descriptionPhoto = modalPost.querySelector('.social__caption');
    descriptionPhoto.textContent = arrayObject[i].description;
    if (!modalPost.classList.contains('hidden')) {
      document.addEventListener('keydown', onModalPostEscKeydown);
    }
  });

}
function onModalPostEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    console.log(modalPost);
    modalPost.classList.add('hidden');
    document.removeEventListener('keydown', onModalPostEscKeydown);
  }
}


