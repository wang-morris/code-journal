var inputs = document.querySelector('#photoURL');
var $image = document.querySelector('img');
inputs.addEventListener('input', updatePhoto);

function updatePhoto(e) {
  $image.src = inputs.value;
}
