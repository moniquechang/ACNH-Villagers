/* exported data */
var data = {
  dataView: 'all-villagers',
  favVillagers: []
};

function handleBeforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('acnh-villager-local-storage', dataJSON);
}

window.addEventListener('beforeunload', handleBeforeUnload);
window.addEventListener('pagehide', handleBeforeUnload);

var previousData = localStorage.getItem('acnh-villager-local-storage');
if (previousData !== null) {
  data = JSON.parse(previousData);
}
