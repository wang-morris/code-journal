var inputs = document.querySelector('#photoURL');
var $image = document.querySelector('img');
inputs.addEventListener('input', updatePhoto);

// Updates photo when entry is submitted

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

// pushes submission values into data model and appends DOM tree to page upon submission

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
  hiddenEntries.className = 'view';
  changeToHidden.className = 'hidden-entries';
  $form.reset();

}

function renderData(submission) {
  /**
  <li>
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
  $column.setAttribute('class', 'column-half');

  var $otherColumn = document.createElement('div');
  $otherColumn.setAttribute('class', 'entry-column column-half');

  var $newImage = document.createElement('img');
  $newImage.setAttribute('class', 'entry-image');
  $newImage.setAttribute('src', submission.photoURL);

  var $titleContainer = document.createElement('div');
  $titleContainer.setAttribute('class', 'form-title');

  var $entryTitle = document.createElement('h3');
  $entryTitle.textContent = submission.title;

  var $paragraph = document.createElement('p');
  $paragraph.textContent = submission.notes;

  $list.appendChild($row);
  $row.append($column, $otherColumn);
  $column.appendChild($newImage);
  $otherColumn.append($titleContainer, $paragraph);
  $titleContainer.appendChild($entryTitle);
  return $list;
}

var $ul = document.querySelector('ul');

// switches different data views

var anchor = document.querySelector('a');
anchor.addEventListener('click', anchorClick);

var hiddenEntries = document.querySelector('.hidden-entries');
var changeToHidden = document.querySelector('.view');

function anchorClick(e) {
  e.preventDefault();
  hiddenEntries.className = 'view';
  changeToHidden.className = 'hidden-entries';
}

var newButton = document.querySelector('.new-button');
newButton.addEventListener('click', newButtonClick);

function newButtonClick(e) {
  if (e.target === newButton) {
    hiddenEntries.className = 'hidden-entries';
    changeToHidden.className = 'view';
  }
}

for (var i = 0; i < data.entries.length; i++) {
  var $data = renderData(data.entries[i]);
  $ul.append($data);
}
