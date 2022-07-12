
var inputs = document.querySelector('#photoURL');
var $image = document.querySelector('img');
inputs.addEventListener('input', updatePhoto);

function updatePhoto(e) {
  $image.src = inputs.value;
  if (inputs.value === '') {
    $image.src = 'images/placeholder-image-square.jpg';
  }
}

var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $form = document.querySelector('form');
$form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
  var submission = {
    title: $title.value,
    photoURL: inputs.value,
    notes: $notes.value,
    nextEntryId: data.nextEntryId++
  };
  data.entries.push(submission);
  $image.src = 'images/placeholder-image-square.jpg';
  $form.reset();
}
