import { arrayObject } from './server-data.js';
import {isEscapeKey} from './util.js';


const modalPost = document.querySelector('.big-picture');
const blockCommentsCount = modalPost.querySelector('.social__comment-count');
const body = document.querySelector('body');

const pictures = document.querySelectorAll('a.picture');
const modalComments = modalPost.querySelector('.social__comments');
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


    modalComments.append(createComment(arrayObject[i]));

    if (!modalPost.classList.contains('hidden')) {
      document.addEventListener('keydown', onModalPostEscKeydown);
    }
  });

}

function onModalPostEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalPost.classList.add('hidden');
    document.removeEventListener('keydown', onModalPostEscKeydown);
    modalComments.removeChild(modalComments.lastChild);
  }
}

function createComment (object) {
  const liElement = document.createElement('li');
  liElement.classList.add('social__comment');

  const imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.src = object.comments.avatar;
  imgElement.alt = object.comments.name;
  imgElement.style.width = '35px';
  imgElement.style.height = '35px';
  liElement.append(imgElement);

  const pElement = document.createElement('p');
  pElement.classList.add('social__text');
  pElement.textContent = object.comments.message;
  liElement.append(pElement);
  return liElement;
}


