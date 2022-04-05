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
