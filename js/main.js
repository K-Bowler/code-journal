/* global data */
/* exported data */

var $form = document.querySelector('#entry-form');
var $imgInput = document.querySelector('#input-img');
var $img = document.querySelector('.entry-img');
var $ul = document.querySelector('ul');
var $noEntries = document.querySelector('#no-entries');
var $formHeader = document.querySelector('#new-entry');

function photoUrlInput(event) {
  var $imgUrl = document.querySelector('#input-img').value;
  $img.setAttribute('src', $imgUrl);
}
$imgInput.addEventListener('input', photoUrlInput);

function saveContent(event) {
  event.preventDefault();
  if (data.editing === null) {
    var valuesObject = {
      title: $form.elements.title.value,
      url: $form.elements.url.value,
      notes: $form.elements.notes.value,
      entryId: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(valuesObject);
    $form.reset();
    var tree = displayEntries(valuesObject);
    $ul.prepend(tree);
    $noEntries.classList.add('hidden');
  } else {
    var editValuesObject = {
      title: $form.elements.title.value,
      url: $form.elements.url.value,
      notes: $form.elements.notes.value,
      entryId: data.editing.entryId
    };
    data.editing = null;
    clearElement($ul);
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === editValuesObject.entryId) {
        data.entries[i] = editValuesObject;
      }
      var $entry = displayEntries(data.entries[i]);
      $ul.appendChild($entry);
    }
  }
  $form.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  showView('entries');
}

$form.addEventListener('submit', saveContent);

function displayEntries(entries) {
  var $li = document.createElement('li');
  $li.setAttribute('data-li-id', entries.entryId);
  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  var $columns = document.createElement('div');
  $columns.setAttribute('class', 'col-full col-half');
  var $imgContainer = document.createElement('div');
  $imgContainer.setAttribute('class', 'img-container');
  var $entriesImgs = document.createElement('img');
  $entriesImgs.setAttribute('class', 'entries-imgs');
  $entriesImgs.setAttribute('src', entries.url);
  var $columns2 = document.createElement('div');
  $columns2.setAttribute('class', 'col-full col-half');
  var $entryHeader = document.createElement('div');
  $entryHeader.setAttribute('class', 'heading-display');
  var $entryH2 = document.createElement('h2');
  $entryH2.textContent = entries.title;
  var $icon = document.createElement('i');
  $icon.setAttribute('class', 'fas fa-pen');
  $icon.setAttribute('data-entry-id', entries.entryId);
  var $entryP = document.createElement('p');
  $entryP.setAttribute('class', 'open-font');
  $entryP.textContent = entries.notes;

  $li.appendChild($row);
  $row.appendChild($columns);
  $columns.appendChild($imgContainer);
  $imgContainer.appendChild($entriesImgs);
  $row.appendChild($columns2);
  $columns2.appendChild($entryHeader);
  $entryHeader.appendChild($entryH2);
  $entryHeader.appendChild($icon);
  $columns2.appendChild($entryP);
  return $li;
}

document.addEventListener('DOMContentLoaded', function (event) {
  if (data.entries.length) {
    $noEntries.classList.add('hidden');
  }
  for (var i = 0; i < data.entries.length; i++) {
    var buildEntries = displayEntries(data.entries[i]);
    $ul.appendChild(buildEntries);
  }
  showView(data.view);
});

var $views = document.querySelectorAll('div[data-view]');
function showView(viewName) {
  if (viewName === 'entry-form') {
    if (data.editing === null) {
      $formHeader.textContent = 'New Entry';
    } else {
      $formHeader.textContent = 'Edit Entry';
    }
  } else if (viewName === 'entries') {
    data.editing = null;
    $form.reset();
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === viewName) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
  }
  data.view = viewName;
}

document.addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    var viewName = event.target.getAttribute('data-view');
    showView(viewName);
  }
});

$ul.addEventListener('click', function (event) {
  if (event.target.tagName !== 'I') return;
  var entryId = parseInt(event.target.getAttribute('data-entry-id'));
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === entryId) {
      data.editing = data.entries[i];
      $form['input-title'].value = data.editing.title;
      $form['input-img'].value = data.editing.url;
      $img.setAttribute('src', data.editing.url);
      $form['input-notes'].value = data.editing.notes;
      break;
    }
  }
  showView('entry-form');
  return data.editing;
});

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
