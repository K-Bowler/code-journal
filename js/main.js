/* global data */
/* exported data */

var $form = document.querySelector('form');
var $imgInput = document.querySelector('#input-img');
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
}

$form.addEventListener('submit', saveContent);

function displayEntries(entries) {
  var $li = document.createElement('li');
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
  var $entryH2 = document.createElement('h2');
  $entryH2.textContent = entries.title;
  var $entryP = document.createElement('p');
  $entryP.setAttribute('class', 'open-font');
  $entryP.textContent = entries.notes;

  $li.appendChild($row);
  $row.appendChild($columns);
  $columns.appendChild($imgContainer);
  $imgContainer.appendChild($entriesImgs);
  $row.appendChild($columns2);
  $columns2.appendChild($entryH2);
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
}

document.addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    var viewName = event.target.getAttribute('data-view');
    showView(viewName);
  }
});
