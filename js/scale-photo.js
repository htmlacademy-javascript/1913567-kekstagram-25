const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const  scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const scaleImage = document.querySelector('.img-upload__preview');

let scaleValue = 100;
scaleControl.value = `${scaleValue}%`;
scaleImage.style.transform = `scale(${scaleValue/100})`;
function plusScale (evt) {
  evt.preventDefault();
  if (scaleValue >= 25 && scaleValue < 100) {
    scaleValue += 25;
  }
  scaleControl.value = `${scaleValue}%`;
  scaleImage.style.transform = `scale(${scaleValue/100})`;
}
scaleBiggerButton.addEventListener('click', plusScale);

function minusScale (evt) {
  evt.preventDefault();
  if (scaleValue > 25 && scaleValue <= 100) {
    scaleValue -= 25;
  }
  scaleImage.style.transform = `scale(${scaleValue/100})`;
  scaleControl.value = `${scaleValue}%`;
}

scaleSmallerButton.addEventListener('click', minusScale);
