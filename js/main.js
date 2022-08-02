var dataArr = [];

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
});
xhr.send();
