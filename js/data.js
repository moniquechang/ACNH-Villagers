/* exported data */
var data = {
  favVillagers: []
};

function handleBeforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('acnh-villager-local-storage', dataJSON);
}

window.addEventListener('beforeunload', handleBeforeUnload);

var previousData = localStorage.getItem('acnh-villager-local-storage');
if (previousData !== null) {
  data = JSON.parse(previousData);
}
