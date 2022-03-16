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

const regular = /^#[A-Za-zА-Яа-яЁё0-9]{2,20}$/;
const form = document.querySelector('#upload-select-image');
const inputHashtag = form.querySelector('.text__hashtags');


const pristine = new Pristine(form);

function onChangeInputHashtag () {
  inputHashtag.addEventListener('change', () => {
    const hashtagArray = inputHashtag.value.split(' ');
    hashtagArray.forEach((element) => {
      console.log(hashtagArray);
      let isTrue;
      console.log('ne validno');
      isTrue = false;
      if (regular.test(element)) {
        console.log('validno');
        isTrue = true;
      }
      return isTrue;
    });
  });
}

// function validateHashtag (){

// }
pristine.addValidator(inputHashtag, onChangeInputHashtag, 'Что-то не так', 2, false);
form.addEventListener('submit', valid);

function valid (evt) {
  evt.preventDefault();
  pristine.validate();
  console.log(pristine.validate());
}

// classTo: 'form__item', // Элемент, на который будут добавляться классы
//   errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
//   successClass: 'form__item--valid', // Класс, обозначающий валидное поле
//   errorTextParent: 'form__item', // Элемент, куда будет выводиться текст с ошибкой
//   errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
//   errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
// const hashtagConfig = {
//   classTo: 'text__description',
//   errorClass: 'form__item--invalid',
//   successClass: 'form__item--valid',
//   errorTextParent: 'form__item', // Элемент, куда будет выводиться текст с ошибкой
//   errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
//   errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
// };


