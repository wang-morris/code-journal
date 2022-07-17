
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
  data.entries.unshift(submission);
  $image.src = 'images/placeholder-image-square.jpg';
  $ul.append(renderData(submission));
  $form.reset();
}

function renderData(submission) {
/**
<li>
  <div class="row">
    <div class="column-full entries-top-row">
      <h1>Entries</h1>
      <div>
        <button type="submit">NEW</button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="column-half">
      <img class="entry-image" src="https://cdn.mos.cms.futurecdn.net/9QTpESGBXa32D29J77VR3d-970-80.jpg.webp">
    </div>
    <div class="entry-column column-half">
      <div class="form-title">
        <h3>First Example Entry</h3>
      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
        aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
    </div>
  </div>
</li>
*/
  var $list = document.createElement('li');
  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  var $column = document.createElement('div');
  $column.setAttribute('class', 'column-full entries-top-row');

  var $heading = document.createElement('h1');
  $heading.textContent = 'Entries';

  var $div = document.createElement('div');

  var $button = document.createElement('button');
  $button.setAttribute('type', 'submit');
  $button.textContent = 'NEW';

  var $image = document.createElement('img');
  $image.setAttribute('class', 'entry-image');
  $image.setAttribute('src', submission.photoURL);

  var $titleContainer = document.createElement('div');
  $titleContainer.setAttribute('class', 'form-title');

  var $entryTitle = document.createElement('h3');
  $entryTitle.textContent = submission.title;

  var $paragraph = document.createElement('p');
  $paragraph.textContent = submission.notes;

  var $otherRow = document.createElement('div');
  $otherRow.setAttribute('class', 'row');

  var $otherColumn = document.createElement('div');
  $otherColumn.setAttribute('class', 'column-half');

  var $thirdColumn = document.createElement('div');
  $thirdColumn.setAttribute('class', 'entry-column column-half');

  $list.appendChild($row);
  $row.appendChild($column);
  $column.appendChild($heading);
  $column.appendChild($div);
  $div.appendChild($button);
  $list.appendChild($otherRow);
  $otherRow.append($otherColumn, $thirdColumn);
  $otherColumn.appendChild($image);
  $thirdColumn.append($titleContainer, $paragraph);
  $titleContainer.appendChild($entryTitle);

  return $list;
}

var $ul = document.querySelector('ul');

window.addEventListener('DOMContentLoaded', e => {
  for (var i = 0; i < data.entries.length; i++) {
    var $data = renderData(data.entries[i]);
    $ul.append($data);
  }
});
