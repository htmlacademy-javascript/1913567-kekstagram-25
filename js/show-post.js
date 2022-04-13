import {isEscapeKey} from './util.js';

const modalPost = document.querySelector('.big-picture');
const modalComments = modalPost.querySelector('.social__comments');
const closeModalButton = modalPost.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const blockCommentsCount = modalPost.querySelector('.social__comment-count');
const modalTotalCommentsCount = modalPost.querySelector('.comments-count');
const loadMoreButton = modalPost.querySelector('.comments-loader');

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

      document.addEventListener('keydown', onDocumentEscKeydown);
      closeModalButton.addEventListener('click', removeHandler);


      createComment(arrayObject[i]);

    });

  }
}
let startSlice = 0;
let commentElement = 5;

function removeHandler (evt) {
  evt.preventDefault();
  modalPost.classList.add('hidden');
  body.classList.remove('modal-open');
  modalComments.removeChild(modalComments.lastChild);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  closeModalButton.removeEventListener('click', removeHandler);
  loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
  startSlice = 0;
  commentElement = 5;
}

function onDocumentEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    removeHandler(evt);
  }
}

function getFirstComments (offers) {
  offers.forEach((element) => {
    const templateComment = `
    <li class="social__comment">
    <img class="social__picture" src=${element.avatar} alt=${element.name} width="35" height="35">
    <p class="social__text">${element.message}</p>
    </li>`;
    modalComments.insertAdjacentHTML('beforeend', templateComment);
  });
}

function hideLoadMoreButton (isButton) {
  if (isButton) {
    loadMoreButton.classList.remove('hidden');
  } else {
    loadMoreButton.classList.add('hidden');
  }

}

function showCountComments (firstCount, secondCount) {
  modalTotalCommentsCount.textContent = secondCount;
  blockCommentsCount.textContent = `${firstCount} из ${modalTotalCommentsCount.innerHTML} комментариев`;
}

let offer = null;
let totalComments;

function createComment (object) {
  offer = object;
  totalComments = object.comments.length;
  if (totalComments <= 5) {
    getFirstComments(object.comments);
    showCountComments(totalComments, totalComments);
    hideLoadMoreButton(false);
  } else {
    hideLoadMoreButton(true);
    const comments = object.comments.slice(startSlice, commentElement);
    getFirstComments(comments);
    startSlice += 5;
    commentElement += 5;
    showCountComments(startSlice, totalComments);

    loadMoreButton.addEventListener('click', onLoadMoreButtonClick);

  }

}

function onLoadMoreButtonClick () {
// на предыдущем шаге startSlice = 10 commentElement = 15
  const comments = offer.comments.slice(startSlice, commentElement);
  getFirstComments(comments);
  if (totalComments - startSlice <= 5) {
    commentElement = totalComments;
    startSlice = totalComments;
    hideLoadMoreButton(false);
  } else {
    startSlice += 5;
    commentElement += 5;
  }

  showCountComments(startSlice, totalComments);

}


export {body, openModal};
