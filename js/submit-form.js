import {body} from './show-post.js';
import {isEscapeKey} from './util.js';

const uploadInput = document.querySelector('#upload-file');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const buttonCloseUploadModal = document.querySelector('.img-upload__cancel');
const textComment = document.querySelector('.text__description');

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
  textComment.addEventListener('focus', onFocus);
  textComment.addEventListener('blur', onBlur);
});

function closeUploadModal (evt) {
  evt.preventDefault();
  body.classList.remove('modal-open');
  uploadInput.value = '';
  imageEditingForm.classList.add('hidden');
  buttonCloseUploadModal.removeEventListener('click', closeUploadModal);
  document.removeEventListener('keydown', pressEsc);
  textComment.removeEventListener('focus', onFocus);
  textComment.removeEventListener('blur', onBlur);

}

function pressEsc(evt) {
  if (isEscapeKey(evt)) {
    closeUploadModal(evt);
  }
}
function onFocus () {
  document.removeEventListener('keydown', pressEsc);
}
function onBlur() {
  document.addEventListener('keydown', pressEsc);
}

const regular = /^#[A-Za-zА-Яа-яЁё0-9]{1,20}$/;
const form = document.querySelector('#upload-select-image');
const inputHashtag = form.querySelector('.text__hashtags');


function onChangeInputHashtag () {
  const hashtagArray = inputHashtag.value.split(' ');
  let isTrue = false;
  const labelHashtag = document.querySelector('.form-group');
  labelHashtag.style.textTransform = 'none';
  const booleanArray = [];
  hashtagArray.forEach((element) => {
    if (regular.test(element) || element === '' && hashtagArray.length <= 5) {
      isTrue = true;
    } else {
      isTrue = false;
    }
    booleanArray.push(isTrue);
  });
  const checkFalse = booleanArray.some((element) => element === false);
  if (checkFalse) {
    return false;
  }

  return true;
}

Pristine.addValidator('my-hashtag', onChangeInputHashtag, 'Пример: #ХэШTaG123', 2, false);
//inputHashtag.addEventListener('input', onChangeInputHashtag);

const pristine = new Pristine(form);

form.addEventListener('submit', valid);

function valid (evt) {
  evt.preventDefault();
  pristine.validate();
  console.log(pristine.validate());
}
