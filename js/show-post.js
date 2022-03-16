import { arrayObject } from './server-data.js';
import {isEscapeKey} from './util.js';

const modalPost = document.querySelector('.big-picture');

const modalComments = modalPost.querySelector('.social__comments');
const closeModalButton = modalPost.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

function openModal () {
  const blockCommentsCount = modalPost.querySelector('.social__comment-count');
  const pictures = document.querySelectorAll('a.picture');
  modalComments.innerHTML = '';

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

      document.addEventListener('keydown', pressEsc);
      closeModalButton.addEventListener('click', removeHandler);

      modalComments.insertAdjacentHTML('beforeend', createComment(arrayObject[i]));

    });

  }
}

openModal();

function removeHandler (evt) {
  evt.preventDefault();
  modalPost.classList.add('hidden');
  body.classList.remove('modal-open');
  modalComments.removeChild(modalComments.lastChild);
  document.removeEventListener('keydown', pressEsc);
  closeModalButton.removeEventListener('click', removeHandler);
}

function pressEsc(evt) {
  if (isEscapeKey(evt)) {
    removeHandler(evt);
  }
}

function createComment (object) {
  const addComment = `
  <li class="social__comment">
    <img class="social__picture" src=${object.comments.avatar} alt=${object.comments.name} width="35" height="35">
    <p class="social__text">${object.comments.message}</p>
  </li>`;

  return addComment;
}

export {body};
