import {body} from './show-post.js';
import {isEscapeKey} from './util.js';

const uploadInput = document.querySelector('#upload-file');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const buttonCloseUploadModal = document.querySelector('.img-upload__cancel');

uploadInput.addEventListener('change', () => {
  imageEditingForm.classList.remove('hidden');
  body.classList.add('modal-open');

  const loadImage = document.querySelector('.img-upload__preview img');
  loadImage.src = URL.createObjectURL(uploadInput.files[0]);
  loadImage.onload = function () {
    URL.revokeObjectURL(loadImage.src);
  };

  const imagesEffectsPreview = document.querySelectorAll('.effects__item span');
  imagesEffectsPreview.forEach((element) => {
    element.style.backgroundImage = '123';
  });

  buttonCloseUploadModal.addEventListener('click', closeUploadModal);
  document.addEventListener('keydown', pressEsc);
});


function closeUploadModal (evt) {
  evt.preventDefault();
  body.classList.remove('modal-open');
  uploadInput.value = '';
  imageEditingForm.classList.add('hidden');
  buttonCloseUploadModal.removeEventListener('click', closeUploadModal);
  document.removeEventListener('keydown', pressEsc);
}

function pressEsc(evt) {
  if (isEscapeKey(evt)) {
    closeUploadModal(evt);
  }
}
