const sliderElement = document.querySelector('.effect-level__slider');
let sliderValue = document.querySelector('.effect-level__value').value;
const effectImage = document.querySelector('.img-upload__preview img');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

const defaultSlider = {
  optinoSlider: {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower',
  },
  class: ' ',
  filter:  function (value) {
    value = 'none';
    return `${value}`;
  },
};

const grayscaleSlider = {
  optionSlider : {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  class: 'effects__preview--chrome',
  filter: function (value) {
    return `grayscale(${value})`;
  },
};

const sepiaSlider = {
  optinoSlider: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  class: 'effects__preview--sepia',
  filter: function (value) {
    return `sepia(${value})`;
  },
};

const invertSlider = {
  optionSlider : {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  },
  class: 'effects__preview--marvin',
  filter:  function (value) {
    return `invert(${value}%)`;
  },
};

const blurSlider = {
  optionSlider : {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
  class: 'effects__preview--phobos',
  filter:  function (value) {
    return `blur(${value}px)`;
  },
};

const brightnessSlider = {
  optionSlider : {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
  class: 'effects__preview--heat',
  filter:  function (value) {
    return `brightness(${value})`;
  },
};
const effectsArray = [defaultSlider, grayscaleSlider, sepiaSlider, invertSlider, blurSlider, brightnessSlider];

const effectsRadio = document.querySelectorAll('.effects__radio');

effectsRadio.forEach((element, index) => {
  element.addEventListener('change', () => {
    if (element.checked) {
      sliderElement.noUiSlider.updateOptions(effectsArray[index].optionSlider);
      sliderElement.noUiSlider.on('update', () => {
        sliderValue = sliderElement.noUiSlider.get();
        effectImage.className = (effectsArray[index].class);
        effectImage.style.filter =  effectsArray[index].filter(sliderValue);
      });
    }
  });
});

// Убрать обработчики при закрытии окна.
