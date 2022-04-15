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
  filter: (value) => {
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
  filter: (value) => `grayscale(${value})`,
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
  filter: (value) => `sepia(${value})`,
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
  filter:  (value) => `invert(${value}%)`,
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
  filter:  (value) => `blur(${value}px)`,
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
  filter:  (value) => `brightness(${value})`,
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
const effectInput = document.querySelector('.img-upload__effect-level');
effectInput.classList.add('hidden');

const onChangeEffect = (evt) => {
  evt.preventDefault();
  if (evt.target.checked) {
    if (evt.target.value === 'none') {
      effectInput.classList.add('hidden');
      sliderElement.classList.add('hidden');
      effectImage.style.filter =  effects[evt.target.value].filter(sliderInput.value);
      return;
    }
    effectInput.classList.remove('hidden');
    sliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions(effects[evt.target.value].optionSlider);
    sliderElement.noUiSlider.on('update', () => {
      sliderInput.value = sliderElement.noUiSlider.get();
      effectImage.className = (effects[evt.target.value].class);
      effectImage.style.filter =  effects[evt.target.value].filter(sliderInput.value);
    });

  }
}


const addOnChangeEffects = () => {
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
