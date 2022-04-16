/* global data */
/* exported data */

var $form = document.querySelector('form');
var $titleInput = document.querySelector('#input-title');
var $imgInput = document.querySelector('#input-img');
var $notesInput = document.querySelector('#input-notes');
var $img = document.querySelector('.entry-img');
var $ul = document.querySelector('ul');
var $noEntries = document.querySelector('#no-entries');

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
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
    var tree = displayEntries(valuesObject);
    $ul.prepend(tree);
    showView('entries');
  } else {
    var editValuesObject = {
      title: $form.elements.title.value,
      url: $form.elements.url.value,
      notes: $form.elements.notes.value,
      entryId: data.editing.entryId
    };
    var $domLi = document.querySelectorAll('li');
    for (var i = 0; i < $domLi.length; i++) {
      var liId = parseInt($domLi[i].getAttribute('data-li-id'));
      if (liId === editValuesObject.entryId) {
        var updateTree = displayEntries(editValuesObject);
        $domLi[i].replaceWith(updateTree);
        if (editValuesObject === data.entries) {
          data.entries.splice(editValuesObject);
        }
        showView('entries');
      }
    }
  }
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
  for (var i = 0; i < data.entries.length; i++) {
    if (data.nextEntryId === 1) {
      $noEntries.classList.remove('hidden');
    } else {
      $noEntries.classList.add('hidden');
    }
    var buildEntries = displayEntries(data.entries[i]);
    $ul.appendChild(buildEntries);
  }
  showView(data.view);
});

var $views = document.querySelectorAll('div[data-view]');
function showView(viewName) {
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
  if (event.target.tagName === 'I') {
    showView('entry-form');
  }
  var entryId = parseInt(event.target.getAttribute('data-entry-id'));
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === entryId) {
      data.editing = data.entries[i];
      $titleInput.setAttribute('value', data.editing.title);
      $imgInput.setAttribute('value', data.editing.url);
      $img.setAttribute('src', data.editing.url);
      $notesInput.textContent = data.editing.notes;
    }
  }
  return data.editing;
});
