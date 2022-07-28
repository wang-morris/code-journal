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
  data.view = 'entries';
  defaultView.className = 'hidden-part';
  entryView.className = 'view';
  var submission = {
    title: $title.value,
    photoURL: inputs.value,
    notes: $notes.value,
    nextEntryId: data.nextEntryId++
  };

  if (!data.editing) {
    data.entries.unshift(submission);
    $image.src = 'images/placeholder-image-square.jpg';
    $ul.prepend(renderData(submission));
  } else {
    data.editing.title = submission.title;
    data.editing.photoURL = submission.photoURL;
    data.editing.notes = submission.notes;
    var $nodeList = document.querySelectorAll('li');
    data.nextEntryId = $nodeList.length + 1;
    var currentId = data.editing.nextEntryId;
    for (var i = 0; i < $nodeList.length; i++) {
      var currentNode = $nodeList[i];
      var idNumber = currentNode.getAttribute('data-entry-id');
      if (parseInt(idNumber) === currentId) {
        var $old = currentNode;
        var $new = renderData(data.editing);
        $old.replaceWith($new);
        break;
      }
    }
    data.editing = null;
  }

  var $noEntries = document.querySelector('.no-entries-sentence');
  if (data.entries.length) {
    $noEntries.style.display = 'none';
  }
  $form.reset();
  $notes.textContent = '';
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

  var $editBody = document.createElement('button');
  $editBody.setAttribute('class', 'edit-body');

  var $editContainer = document.createElement('div');
  $editContainer.setAttribute('class', 'edit-container');

  var $editTip = document.createElement('div');
  $editTip.setAttribute('class', 'edit-tip');

  var $editStrip = document.createElement('div');
  $editStrip.setAttribute('class', 'edit-strip');

  var $paragraph = document.createElement('p');
  $paragraph.textContent = submission.notes;

  $list.appendChild($row);
  $row.append($column, $otherColumn);
  $column.appendChild($newImage);
  $otherColumn.append($titleContainer, $paragraph);
  $titleContainer.append($entryTitle, $editContainer);
  $editContainer.append($editBody, $editTip, $editStrip);

  $list.setAttribute('data-entry-id', submission.nextEntryId);

  return $list;
}

var $ul = document.querySelector('ul');
var defaultView = document.querySelector('.default');
var entryView = document.querySelector('.entries');

window.addEventListener('DOMContentLoaded', e => {
  for (var i = 0; i < data.entries.length; i++) {
    var $data = renderData(data.entries[i]);
    $ul.append($data);
  }

  if (data.view === 'entry-form') {
    defaultView.className = 'view';
    entryView.className = 'hidden-part';
  } else if (data.view === 'entries') {
    defaultView.className = 'hidden-part';
    entryView.className = 'view';
  }
  var $noEntries = document.querySelector('.no-entries-sentence');
  if (data.entries.length) {
    $noEntries.style.display = 'none';
  }
});

// switches different data views

var anchor = document.querySelector('a');
anchor.addEventListener('click', anchorClick);

function anchorClick(e) {
  e.preventDefault();
  entryView.className = 'view';
  defaultView.className = 'hidden-part';
  data.view = 'entries';
}

var newButton = document.querySelector('.new-button');
newButton.addEventListener('click', newButtonClick);

function newButtonClick(e) {
  if (e.target === newButton) {
    entryView.className = 'hidden-part';
    defaultView.className = 'view';
    data.view = 'entry-form';
  }
  var $headingTitle = document.querySelector('h1');
  $headingTitle.textContent = 'New Entry';
  $form.reset();
  $notes.textContent = '';
  $image.src = 'images/placeholder-image-square.jpg';

  var $deleteButton = document.querySelector('.delete');
  $deleteButton.className = 'delete hidden-part';
}

// edit entries
$ul.addEventListener('click', editClick);

function editClick(e) {
  // if (e.target.tagName === 'BUTTON')
  if (e.target.className === 'edit-body') {
    entryView.className = 'hidden-part';
    defaultView.className = 'view';
    data.view = 'entry-form';
    var $headingTitle = document.querySelector('h1');
    $headingTitle.textContent = 'Edit Entry';
  }

  var $closestButton = e.target;
  var currentElement = $closestButton.closest('li');
  var currentId = currentElement.getAttribute('data-entry-id');
  var currentIdNumber = parseInt(currentId);

  for (var i = 0; i < data.entries.length; i++) {
    var entry = data.entries[i];
    if (entry.nextEntryId === currentIdNumber) {
      data.editing = entry;
      break;
    }
  }

  var $titleBox = document.querySelector('#title');
  $titleBox.value = data.editing.title;

  var $urlBox = document.querySelector('#photoURL');
  $urlBox.value = data.editing.photoURL;
  $image.src = data.editing.photoURL;

  var $notesBox = document.querySelector('#notes');
  $notesBox.textContent = data.editing.notes;

  var $deleteButton = document.querySelector('.delete');
  $deleteButton.className = 'delete view';
}

// delete entries
var $modal = document.querySelector('.modal-container');
var $deleteButton = document.querySelector('.delete');
$deleteButton.addEventListener('click', openModal);

function openModal(e) {
  e.preventDefault();
  entryView.className = 'hidden-part';
  defaultView.className = 'view';
  data.view = 'entry-form';
  $modal.className = 'modal-container display-container';

}
