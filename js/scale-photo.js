const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const  scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const scaleImage = document.querySelector('.img-upload__preview');

let scaleValue = 100;
scaleControl.value = `${scaleValue}%`;
scaleImage.style.transform = `scale(${scaleValue/100})`;
function plusScale (evt) {
  evt.preventDefault();
  scaleBiggerButton.removeEventListener('click', plusScale);
  if (scaleValue > 25 && scaleValue < 100) {
    scaleValue += 25;
    scaleSmallerButton.addEventListener('click', minusScale);
    scaleBiggerButton.addEventListener('click', plusScale);
  } else if (scaleValue === 25) {
    scaleValue += 25;
    scaleSmallerButton.removeEventListener('click', minusScale);
    scaleBiggerButton.addEventListener('click', plusScale);
  } else if (scaleValue === 100) {
    scaleSmallerButton.addEventListener('click', minusScale);
    scaleBiggerButton.removeEventListener('click', plusScale);
  }
  scaleControl.value = `${scaleValue}%`;
  scaleImage.style.transform = `scale(${scaleValue/100})`;
}
scaleBiggerButton.addEventListener('click', plusScale);

function minusScale (evt) {
  evt.preventDefault();
  scaleValue -= 25;
  scaleSmallerButton.removeEventListener('click', minusScale);
  if (scaleValue > 25 && scaleValue < 100) {
    scaleBiggerButton.addEventListener('click', plusScale);
    scaleSmallerButton.addEventListener('click', minusScale);
  } else if (scaleValue === 25) {
    scaleSmallerButton.removeEventListener('click', minusScale);
    scaleBiggerButton.addEventListener('click', plusScale);
  } else if (scaleValue === 100) {
    scaleSmallerButton.addEventListener('click', minusScale);
    scaleBiggerButton.removeEventListener('click', plusScale);
  }
  scaleImage.style.transform = `scale(${scaleValue/100})`;
  scaleControl.value = `${scaleValue}%`;
}

scaleSmallerButton.addEventListener('click', minusScale);


