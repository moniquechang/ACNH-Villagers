var dataArr = [];
var $ul = document.querySelector('ul');
var searchInput = document.querySelector('input');
var $form = document.querySelector('form');
var searchDefaultText = document.querySelector('h2');
var modalWindowContainer = document.querySelector('.modal-window-container');
var infoModalBackground = document.querySelector('.info-modal');

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

function renderVillagerInfo(data) {
  var modalWindowPaperDiv = document.createElement('div');
  modalWindowPaperDiv.setAttribute('class', 'modal-window-paper');

  var xmarkIcon = document.createElement('i');
  xmarkIcon.setAttribute('class', 'fa-solid fa-rectangle-xmark');
  modalWindowPaperDiv.appendChild(xmarkIcon);

  var villagerIcon = document.createElement('img');
  villagerIcon.setAttribute('src', data.icon_uri);
  villagerIcon.setAttribute('alt', data.name['name-USen'] + ' icon');
  villagerIcon.setAttribute('class', 'icon');
  modalWindowPaperDiv.appendChild(villagerIcon);

  var nameP = document.createElement('p');
  var nameText = document.createTextNode('Name: ' + data.name['name-USen']);
  nameP.appendChild(nameText);
  modalWindowPaperDiv.appendChild(nameP);

  var speciesP = document.createElement('p');
  var speciesText = document.createTextNode('Species: ' + data.species);
  speciesP.appendChild(speciesText);
  modalWindowPaperDiv.appendChild(speciesP);

  var personalityP = document.createElement('p');
  var personalityText = document.createTextNode('Personality: ' + data.personality);
  personalityP.appendChild(personalityText);
  modalWindowPaperDiv.appendChild(personalityP);

  var bdayP = document.createElement('p');
  var bdayText = document.createTextNode('Birthday: ' + data['birthday-string']);
  bdayP.appendChild(bdayText);
  modalWindowPaperDiv.appendChild(bdayP);

  var catchphraseP = document.createElement('p');
  var catchphraseText = document.createTextNode('Catch Phrase: ' + data['catch-phrase']);
  catchphraseP.appendChild(catchphraseText);
  modalWindowPaperDiv.appendChild(catchphraseP);

  var modalLeafImage = document.createElement('img');
  modalLeafImage.setAttribute('src', 'images/modal-window-leaf.png');
  modalLeafImage.setAttribute('class', 'modal-leaf');
  modalWindowPaperDiv.appendChild(modalLeafImage);

  return modalWindowPaperDiv;
}

function nameHandleClick(event) {
  if (event.target.matches('.villager-polaroid > p')) {
    infoModalBackground.className = 'info-modal modal-background';
    for (var i = 0; i < dataArr.length; i++) {
      if (event.target.textContent === dataArr[i].name['name-USen']) {
        modalWindowContainer.appendChild(renderVillagerInfo(dataArr[i]));
        break;
      }
    }
  }
  var modalWindowPaperDiv = document.querySelector('.modal-window-paper');
  if (event.target.matches('.fa-rectangle-xmark')) {
    infoModalBackground.className = 'info-modal modal-background hidden';
    modalWindowContainer.removeChild(modalWindowPaperDiv);
  }
}

document.addEventListener('click', nameHandleClick);
