const sliderElement = document.querySelector('.effect-level__slider');
const sliderInput = document.querySelector('.effect-level__value');
const effectImage = document.querySelector('.img-upload__preview img');

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
  optionSlider: {
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
const effects = {
  none : defaultSlider,
  chrome : grayscaleSlider,
  sepia : sepiaSlider,
  marvin : invertSlider,
  phobos: blurSlider,
  heat : brightnessSlider,
};

const effectsRadio = document.querySelectorAll('.effects__radio');


function onChangeEffect (evt) {
  evt.preventDefault();
  if (evt.target.checked) {
    if (evt.target.value === 'none') {
      sliderElement.classList.add('hidden');
      effectImage.style.filter =  effects[evt.target.value].filter(sliderInput.value);
      return;
    }
    sliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions(effects[evt.target.value].optionSlider);
    sliderElement.noUiSlider.on('update', () => {
      sliderInput.value = sliderElement.noUiSlider.get();
      effectImage.className = (effects[evt.target.value].class);
      effectImage.style.filter =  effects[evt.target.value].filter(sliderInput.value);
    });

  }
}


function addOnChangeEffects () {
  effectsRadio.forEach((element) => {
    element.addEventListener('change', onChangeEffect);
  });
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower',
  });
  sliderElement.classList.add('hidden');
}

function removeOnChangeEffects () {
  effectsRadio.forEach((element) => {
    element.removeEventListener('change', onChangeEffect);
  });
  effectsRadio[0].checked = true;
  effectImage.style.filter = 'none';
  sliderElement.noUiSlider.destroy();
}

export {addOnChangeEffects, removeOnChangeEffects};
