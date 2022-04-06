/* global data */
/* exported data */

var $form = document.querySelector('form');
var $imgInput = document.querySelector('#input-img');
var $img = document.querySelector('.entry-img');

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
  data.unshift(valuesObject);
  $form.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
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
  var $entriesImgs = document.createElement('div');
  $entriesImgs.setAttribute('class', 'entries-imgs');
  $entriesImgs.setAttribute('src', entries.url);
  var $columns2 = document.createElement('div');
  $columns2.setAttribute('class', 'col-full col-half');
  var $entryH2 = document.createElement('h2');
  $entryH2.textContent(entries.title);
  var $entryP = document.createElement('p');
  $entryP.textContent(entries.notes);

  $li.appendChild($row);
  $row.appendChild($columns);
  $columns.appendChild($imgContainer);
  $imgContainer.appendChild($entriesImgs);
  $row.appendChild($columns2);
  $columns2.appendChild($entryH2);
  $columns2.appendChild($entryP);
}

var $ul = document.querySelector('ul');
for (var i = 0; i < data.entries.length; i++) {
  var buildEntries = displayEntries(data.entries[i]);
  $ul.appendChild(buildEntries);
}
