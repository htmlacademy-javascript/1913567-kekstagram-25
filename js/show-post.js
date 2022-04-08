import {isEscapeKey} from './util.js';

const modalPost = document.querySelector('.big-picture');
const modalComments = modalPost.querySelector('.social__comments');
const closeModalButton = modalPost.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const blockCommentsCount = modalPost.querySelector('.social__comment-count');
const modalTotalCommentsCount = modalPost.querySelector('.comments-count');

function openModal (arrayObject) {
  const pictures = document.querySelectorAll('a.picture');

  for (let i = 0; i < pictures.length; i++) {
    const picture = pictures[i];

    picture.addEventListener('click',  (evt) => {
      evt.preventDefault();
      modalPost.classList.remove('hidden');
      body.classList.add('modal-open');
      modalComments.innerHTML = '';

      const modalImage = modalPost.querySelector('.big-picture__img img');
      modalImage.src= arrayObject[i].url;

      const modalLikes = modalPost.querySelector('.likes-count');
      modalLikes.textContent = arrayObject[i].likes;

      const descriptionPhoto = modalPost.querySelector('.social__caption');
      descriptionPhoto.textContent = arrayObject[i].description;

      document.addEventListener('keydown', pressEsc);
      closeModalButton.addEventListener('click', removeHandler);


      createComment(arrayObject[i]);

    });

  }
}

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
  const arrayComments = [];

  object.comments.forEach((element) => {
    const addComment = `
      <li class="social__comment">
      <img class="social__picture" src=${element.avatar} alt=${element.name} width="35" height="35">
      <p class="social__text">${element.message}</p>
      </li>`;
    arrayComments.push(addComment);

  });

  const totalComments = object.comments.length;
  let countShowComents = 5;
  arrayComments.slice(0, countShowComents).forEach((element) => {
    modalComments.insertAdjacentHTML('beforeend', element);
  });

  const loadMoreButton = modalPost.querySelector('.comments-loader');
  loadMoreButton.classList.remove('hidden');

  modalTotalCommentsCount.textContent = totalComments;

  blockCommentsCount.textContent = `${countShowComents} из ${modalTotalCommentsCount.innerHTML} комментариев`;

  loadMoreButton.addEventListener('click', () => {
    modalComments.innerHTML = '';
    countShowComents += 5;
    arrayComments.slice(0, countShowComents).forEach((element) => {
      modalComments.insertAdjacentHTML('beforeend', element);
    });

    blockCommentsCount.textContent = `${countShowComents} из ${modalTotalCommentsCount.innerHTML} комментариев`;
    if (countShowComents > totalComments) {
      countShowComents = 5;
      loadMoreButton.classList.add('hidden');
      blockCommentsCount.textContent = `${totalComments} из ${modalTotalCommentsCount.innerHTML} комментариев`;
    }

  });

}


export {body, openModal};
