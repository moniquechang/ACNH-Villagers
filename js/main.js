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
    data.name.push(dataArr[i].name['name-USen']);
    data.image.push(dataArr[i].image_uri);
    data.id.push(dataArr[i].id);
    data.birthday.push(dataArr[i]['birthday-string']);
    data.species.push(dataArr[i].species);
    data.personality.push(dataArr[i].personality);
    data.catchphrase.push(dataArr[i]['catch-phrase']);
    data.icon.push(dataArr[i].icon_uri);
  }
  for (var k = 0; k < data.name.length; k++) {
    $ul.appendChild(renderVillager(data, k));
  }
});
xhr.send();

function renderVillager(villager, num) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'column-full column-fourth');

  var $div = document.createElement('div');
  $div.setAttribute('class', 'villager-polaroid');
  $li.appendChild($div);

  var $img = document.createElement('img');
  $img.setAttribute('src', villager.image[num]);
  $img.setAttribute('alt', villager.name[num]);
  $div.appendChild($img);

  var $p = document.createElement('p');
  var name = document.createTextNode(villager.name[num]);
  $p.appendChild(name);
  $div.appendChild($p);

  return $li;
}
