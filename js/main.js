var dataArr = [];
var $ul = document.querySelector('ul');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://acnhapi.com/v1/villagers/');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  for (var keys in xhr.response) {
    dataArr.push(xhr.response[keys]);
  }
  for (var i = 0; i < dataArr.length; i++) {
    $ul.appendChild(renderVillager(dataArr, i));
  }
});
xhr.send();

function renderVillager(data, num) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'column-full column-fourth');

  var $div = document.createElement('div');
  $div.setAttribute('class', 'villager-polaroid');
  $li.appendChild($div);

  var $img = document.createElement('img');
  $img.setAttribute('src', data[num].image_uri);
  $img.setAttribute('alt', data[num].name['name-USen']);
  $div.appendChild($img);

  var $p = document.createElement('p');
  var name = document.createTextNode(data[num].name['name-USen']);
  $p.appendChild(name);
  $div.appendChild($p);

  return $li;
}
