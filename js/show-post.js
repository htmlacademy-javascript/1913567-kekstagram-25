import { arrayObject } from './server-data.js';
import {isEscapeKey} from './util.js';

const modalPost = document.querySelector('.big-picture');

const modalComments = modalPost.querySelector('.social__comments');
const closeModalButton = modalPost.querySelector('.big-picture__cancel');

function openModal () {
  const blockCommentsCount = modalPost.querySelector('.social__comment-count');
  const pictures = document.querySelectorAll('a.picture');
  const body = document.querySelector('body');
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

      if (!modalPost.classList.contains('hidden')) {
        document.addEventListener('keydown', closeModal);
        closeModalButton.addEventListener('click', closeModal);
      }
      modalComments.insertAdjacentHTML('beforeend', createComment(arrayObject[i]));

    });

  }
}

openModal();

function removeHandler (evt) {
  evt.preventDefault();
  modalPost.classList.add('hidden');
  modalComments.removeChild(modalComments.lastChild);
  //modalComments.innerHTML = '';
  document.removeEventListener('keydown', closeModal);
  closeModalButton.removeEventListener('click', closeModal);
}

function closeModal(evt) {
  if (isEscapeKey(evt)) {
    removeHandler(evt);
    return;
  }
  evt.preventDefault();
  removeHandler(evt);

}

function createComment (object) {
  const addComment = `
  <li class="social__comment">
    <img class="social__picture" src=${object.comments.avatar} alt=${object.comments.name} width="35" height="35">
    <p class="social__text">${object.comments.message}</p>
  </li>`;

  return addComment;
}

