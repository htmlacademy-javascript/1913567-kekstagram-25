import {body} from './show-post.js';
import {isEscapeKey} from './util.js';
import {addOnScaleButton, removeOnScaleButton} from './scale-photo.js';
import {addOnChangeEffects, removeOnChangeEffects} from './effects.js';
import { sendData } from './server-data.js';

const uploadInput = document.querySelector('#upload-file');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const buttonCloseUploadModal = document.querySelector('#upload-cancel');
const textComment = document.querySelector('.text__description');
const form = document.querySelector('#upload-select-image');
const inputHashtag = form.querySelector('.text__hashtags');
const successTemplate = document.querySelector('#success').content;
const successSectionMessage = successTemplate.querySelector('.success');

const onInputFocus = () => {
  document.removeEventListener('keydown', onEscPress);
};
const onInputBlur = () => {
  document.addEventListener('keydown', onEscPress);
};

const onUploadModalclick = () => {
  body.classList.remove('modal-open');
  uploadInput.value = '';
  imageEditingForm.classList.add('hidden');
  buttonCloseUploadModal.removeEventListener('click', onUploadModalclick);
  document.removeEventListener('keydown', onEscPress);
  textComment.removeEventListener('focus', onInputFocus);
  textComment.removeEventListener('blur', onInputBlur);
  inputHashtag.removeEventListener('focus', onInputFocus);
  inputHashtag.removeEventListener('blur', onInputBlur);
  removeOnScaleButton();
  removeOnChangeEffects();
};

const succesBlockMessage = successSectionMessage.cloneNode(true);
const successButton = succesBlockMessage.querySelector('button');
succesBlockMessage.classList.add('hidden');
body.append(succesBlockMessage);

const errorTemplate = document.querySelector('#error').content;
const errorSectionMessage = errorTemplate.querySelector('.error');
const errorBlockMessage = errorSectionMessage.cloneNode(true);
const errorButton = errorBlockMessage.querySelector('button');
errorBlockMessage.classList.add('hidden');
body.append(errorBlockMessage);

const onCloseMessageClick = () =>  {
  succesBlockMessage.classList.add('hidden');
  errorBlockMessage.classList.add('hidden');
  document.removeEventListener('keyup', onEscPress);
  successButton.removeEventListener('click', onCloseMessageClick);
  errorButton.removeEventListener('click', onCloseMessageClick);
  document.removeEventListener('click', onOutsiteClick);
};

const showSuccessMessage = () =>  {
  onUploadModalclick();
  succesBlockMessage.classList.remove('hidden');
  document.addEventListener('click', onOutsiteClick);
  document.addEventListener('keyup', onEscPress);
  successButton.addEventListener('click', onCloseMessageClick);
};

const showErrorMessage = () =>  {
  onUploadModalclick();
  errorBlockMessage.classList.remove('hidden');
  succesBlockMessage.classList.add('hidden');
  errorButton.addEventListener('click', onCloseMessageClick);
  document.addEventListener('keyup', onEscPress);
  document.addEventListener('click', onOutsiteClick);
};

function onEscPress (evt) {
  if (isEscapeKey(evt) && !imageEditingForm.classList.contains('hidden')) {
    onUploadModalclick(evt);
  }
  if (isEscapeKey(evt) && !successSectionMessage.classList.contains('hidden')) {
    onCloseMessageClick();
  }
}

uploadInput.addEventListener('change', () => {
  imageEditingForm.classList.remove('hidden');
  body.classList.add('modal-open');
  addOnScaleButton();
  addOnChangeEffects();
  textComment.textContent = '';
  inputHashtag.value = '';

  const loadImage = document.querySelector('.img-upload__preview img');
  loadImage.src = URL.createObjectURL(uploadInput.files[0]);
  loadImage.onload =  () => URL.revokeObjectURL(loadImage.src);

  const imagesEffectsPreview = document.querySelectorAll('.effects__item span');
  imagesEffectsPreview.forEach((element) => {
    element.style.backgroundImage = '123';
  });

  buttonCloseUploadModal.addEventListener('click', onUploadModalclick);
  document.addEventListener('keydown', onEscPress);
  textComment.addEventListener('focus', onInputFocus);
  textComment.addEventListener('blur', onInputBlur);
  inputHashtag.addEventListener('focus', onInputFocus);
  inputHashtag.addEventListener('blur', onInputBlur);
});

const regular = /^#[A-Za-zА-Яа-яЁё0-9]{1,20}$/;


const onChangeInputHashtag = () =>  {
  const hashtagArray = inputHashtag.value.split(' ');
  let isTrue = false;
  const labelHashtag = document.querySelector('.form-group');
  labelHashtag.style.textTransform = 'none';
  const booleanArray = [];
  const repeatElements = [];

  for (let i=0; i < hashtagArray.length; i++) {
    for(let j=1+i; j < hashtagArray.length; j++) {
      if (hashtagArray[i] === hashtagArray[j]) {
        repeatElements.push(hashtagArray[i]);
      }

    }
  }

  hashtagArray.forEach((element) => {
    isTrue = regular.test(element) && hashtagArray.length <= 5 && repeatElements.length === 0 || element === '';
    booleanArray.push(isTrue);
  });
  return !booleanArray.some((element) => element === false);
};

Pristine.addValidator('my-hashtag', onChangeInputHashtag, 'Пример: #ХэШTaG123; Не больше 5 различных хештегов', 2, false);

const pristine = new Pristine(form);


const valid = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      sendData(
        () => onSuccess(),
        () => showErrorMessage(),
        new FormData(evt.target)
      );
    }

  });
};

valid(showSuccessMessage);


function onOutsiteClick (evt) {
  evt.preventDefault();
  const divSuccess = document.querySelector('.success__inner');
  const divError = document.querySelector('.error__inner');
  if (!divSuccess.contains(evt.target)) {
    onCloseMessageClick();
  }

  if (!divError.contains(evt.target)) {
    onCloseMessageClick();
  }
}
