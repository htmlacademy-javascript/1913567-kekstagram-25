const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const scaleImage = document.querySelector('.img-upload__preview');

let scaleValue = 100;
scaleControl.value = `${scaleValue}%`;
scaleImage.style.transform = `scale(${scaleValue/100})`;

function changeScale (evt) {
  evt.preventDefault();
  if (evt.target === scaleBiggerButton && scaleValue >= 25 && scaleValue < 100) {
    scaleValue += 25;
  }
  if (evt.target === scaleSmallerButton && scaleValue > 25 && scaleValue <= 100) {
    scaleValue -= 25;
  }
  scaleImage.style.transform = `scale(${scaleValue/100})`;
  scaleControl.value = `${scaleValue}%`;
}


function addOnScaleButton () {
  scaleBiggerButton.addEventListener('click', changeScale);
  scaleSmallerButton.addEventListener('click', changeScale);
}

function removeOnScaleButton() {
  scaleBiggerButton.removeEventListener('click', changeScale);
  scaleSmallerButton.removeEventListener('click', changeScale);
}

export {addOnScaleButton, removeOnScaleButton};
