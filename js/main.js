var dataArr = [];
var $ul = document.querySelector('ul');
var searchInput = document.querySelector('input');
var $form = document.querySelector('form');
var searchDefaultText = document.querySelector('h2');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://acnhapi.com/v1/villagers/');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  for (var keys in xhr.response) {
    dataArr.push(xhr.response[keys]);
  }
  for (var i = 0; i < dataArr.length; i++) {
    $ul.appendChild(renderVillager(dataArr[i]));
  }
});
xhr.send();

function renderVillager(data) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'column-full column-fourth');
  $li.setAttribute('data-villager', data.name['name-USen']);

  var $div = document.createElement('div');
  $div.setAttribute('class', 'villager-polaroid');
  $li.appendChild($div);

  var $img = document.createElement('img');
  $img.setAttribute('src', data.image_uri);
  $img.setAttribute('alt', data.name['name-USen']);
  $div.appendChild($img);

  var $p = document.createElement('p');
  var name = document.createTextNode(data.name['name-USen']);
  $p.appendChild(name);
  $div.appendChild($p);

  return $li;
}

function handleSearchInput(event) {
  var liNodeList = document.querySelectorAll('li');
  for (var i = 0; i < liNodeList.length; i++) {
    if (searchInput.value === '') {
      liNodeList[i].className = 'column-full column-fourth';
      searchDefaultText.className = 'gorditas hidden';
    }
  }
}

$form.addEventListener('input', handleSearchInput);

function handleSearchInputSubmit(event) {
  event.preventDefault();
  var liNodeList = document.querySelectorAll('li');
  searchDefaultText.className = 'gorditas';
  for (var i = 0; i < liNodeList.length; i++) {
    liNodeList[i].className = 'column-full column-fourth hidden';
  }
  for (var k = 0; k < liNodeList.length; k++) {
    if (searchInput.value.toLowerCase() === liNodeList[k].getAttribute('data-villager').toLowerCase()) {
      liNodeList[k].className = 'column-full column-fourth';
      searchDefaultText.className = 'gorditas hidden';
      break;
    }
  }
}

$form.addEventListener('submit', handleSearchInputSubmit);
