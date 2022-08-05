var dataArr = [];
var allVillagerUl = document.querySelector('.all-villager-list');
var searchInput = document.querySelector('input');
var $form = document.querySelector('form');
var searchDefaultText = document.querySelector('.search-default');
var modalWindowContainer = document.querySelector('.modal-window-container');
var infoModalBackground = document.querySelector('.info-modal');
var confirmModalBackground = document.querySelector('.confirm-modal');
var viewNodeList = document.querySelectorAll('.view');
var favUl = document.querySelector('.fav-villager-list');
var favDefaultText = document.querySelector('.fav-default');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://acnhapi.com/v1/villagers/');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  for (var keys in xhr.response) {
    dataArr.push(xhr.response[keys]);
  }
  for (var i = 0; i < dataArr.length; i++) {
    allVillagerUl.appendChild(renderVillager(dataArr[i]));
  }
  viewSwap(data.dataView);
  if (data.favVillagers.length === 0) {
    favDefaultText.className = 'gorditas fav-default';
  } else {
    favDefaultText.className = 'gorditas fav-default hidden';
  }
  var heartIcon = document.querySelectorAll('.fa-heart');
  for (var k = 0; k < data.favVillagers.length; k++) {
    var number = data.favVillagers[k].id - 1;
    heartIcon[number].className = 'fa-solid fa-heart';
    var favoritedVillager = renderVillager(data.favVillagers[k]);
    favUl.prepend(favoritedVillager);
    favoritedVillager.firstChild.lastChild.className = 'fa-solid fa-heart';
  }
});
xhr.send();

function renderVillager(data) {
  var list = document.createElement('li');
  list.setAttribute('class', 'column-full column-fourth');
  list.setAttribute('data-villager', data.name['name-USen']);

  var villagerPolaroidDiv = document.createElement('div');
  villagerPolaroidDiv.setAttribute('class', 'villager-polaroid');
  list.appendChild(villagerPolaroidDiv);

  var villagerImage = document.createElement('img');
  villagerImage.setAttribute('src', data.image_uri);
  villagerImage.setAttribute('alt', data.name['name-USen']);
  villagerPolaroidDiv.appendChild(villagerImage);

  var villagerName = document.createElement('p');
  var name = document.createTextNode(data.name['name-USen']);
  villagerName.appendChild(name);
  villagerPolaroidDiv.appendChild(villagerName);

  var heartIcon = document.createElement('i');
  heartIcon.setAttribute('class', 'fa-regular fa-heart');
  villagerPolaroidDiv.appendChild(heartIcon);

  return list;
}

function handleSearchInput(event) {
  var liNodeList = document.querySelectorAll('li');
  for (var i = 0; i < liNodeList.length; i++) {
    if (searchInput.value === '') {
      liNodeList[i].className = 'column-full column-fourth';
      searchDefaultText.className = 'gorditas search-default hidden';
    }
  }
}

$form.addEventListener('input', handleSearchInput);

function handleSearchInputSubmit(event) {
  event.preventDefault();
  var liNodeList = document.querySelectorAll('li');
  searchDefaultText.className = 'gorditas search-default';
  for (var i = 0; i < liNodeList.length; i++) {
    liNodeList[i].className = 'column-full column-fourth hidden';
  }
  for (var k = 0; k < liNodeList.length; k++) {
    if (searchInput.value.toLowerCase() === liNodeList[k].getAttribute('data-villager').toLowerCase()) {
      liNodeList[k].className = 'column-full column-fourth';
      searchDefaultText.className = 'gorditas search-default hidden';
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

function heartHandleClick(event) {
  var heartIcon = document.querySelectorAll('.fa-heart');
  if (event.target.matches('.fa-regular')) {
    confirmModalBackground.className = 'confirm-modal modal-background';
    event.target.setAttribute('data-target', 'yes');
  }
  if (event.target.matches('.yes-button')) {
    confirmModalBackground.className = 'confirm-modal modal-background hidden';
    for (var i = 0; i < heartIcon.length; i++) {
      if (heartIcon[i].getAttribute('data-target')) {
        heartIcon[i].className = 'fa-solid fa-heart';
        heartIcon[i].removeAttribute('data-target');
        var favDataObj = {
          name: {
            'name-USen': dataArr[i].name['name-USen']
          },
          image_uri: dataArr[i].image_uri,
          id: dataArr[i].id
        };
        data.favVillagers.push(favDataObj);
        var favoritedVillager = renderVillager(dataArr[i]);
        favUl.prepend(favoritedVillager);
        favoritedVillager.firstChild.lastChild.className = 'fa-solid fa-heart';
        favDefaultText.className = 'gorditas fav-default hidden';
        return;
      }
    }
  }
  if (event.target.matches('.no-button')) {
    confirmModalBackground.className = 'confirm-modal modal-background hidden';
    for (var k = 0; k < heartIcon.length; k++) {
      if (heartIcon[k].getAttribute('data-target')) {
        heartIcon[k].removeAttribute('data-target');
        return;
      }
    }
  }
}

document.addEventListener('click', heartHandleClick);

function viewSwap(dataView) {
  for (var i = 0; i < viewNodeList.length; i++) {
    if (viewNodeList[i].getAttribute('data-view') === dataView) {
      viewNodeList[i].className = 'container view';
    } else {
      viewNodeList[i].className = 'container view hidden';
    }
  }
}

function viewSwapHandleClick(event) {
  if (event.target.matches('a') === false) {
    return;
  }
  viewSwap(event.target.getAttribute('data-view'));
  data.dataView = event.target.getAttribute('data-view');
}

document.addEventListener('click', viewSwapHandleClick);
