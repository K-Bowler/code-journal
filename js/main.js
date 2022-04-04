/* global data */
/* exported data */

var $imgInput = document.querySelector('#input-img');
var $img = document.querySelector('.entry-img');
var $saveBtn = document.querySelector('.save-btn');

function photoUrlInput(event) {
  var $imgUrl = document.querySelector('#input-img').value;
  $img.setAttribute('src', $imgUrl);
}
$imgInput.addEventListener('input', photoUrlInput);

function saveContent() {

}
$saveBtn.addEventListener('click', saveContent);
