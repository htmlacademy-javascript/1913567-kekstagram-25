const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const scaleImage = document.querySelector('.img-upload__preview');

const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
let scaleValue = 100;
scaleControl.value = `${scaleValue}%`;
scaleImage.style.transform = `scale(${scaleValue/100})`;

const onButtonScaleClick = (evt) => {
  evt.preventDefault();
  const scaleButton = evt.target;
  if (scaleButton === scaleBiggerButton && scaleValue >= MIN_SCALE && scaleValue < MAX_SCALE) {
    scaleValue += STEP_SCALE;
  }
  if (scaleButton === scaleSmallerButton && scaleValue > MIN_SCALE && scaleValue <= MAX_SCALE) {
    scaleValue -= STEP_SCALE;
  }
  scaleImage.style.transform = `scale(${scaleValue/100})`;
  scaleControl.value = `${scaleValue}%`;
}


const addOnScaleButton = () => {
  scaleBiggerButton.addEventListener('click', onButtonScaleClick);
  scaleSmallerButton.addEventListener('click', onButtonScaleClick);
}

const removeOnScaleButton = () => {
  scaleBiggerButton.removeEventListener('click', onButtonScaleClick);
  scaleSmallerButton.removeEventListener('click', onButtonScaleClick);
}

export {addOnScaleButton, removeOnScaleButton};
