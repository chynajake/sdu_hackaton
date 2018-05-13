
// инициализируем платформу с ID и Кодом приложения
var platform = new H.service.Platform({
  app_id: 'BDe5g7mw6f6WgjZX0IhZ',
  app_code: '7_8nj2LnEkmR2JHUCRkVhw',
  useCIT: true,
  useHTTPS: true
});

// Получаем спислк картографических основ (спутник, вектор)
var defaultLayers = platform.createDefaultLayers({lg:"RUS"});

/* Инициализируем объект карты с аргументами:
		контейнер где необходимо отобразить карту,
		тип базовой карты,
		опции
*/
var map = new H.Map(document.getElementById('map'),
  defaultLayers.normal.map,{
  	center:{
  		"lat":43.24546,
  		"lng":76.90902
  	},
  	zoom:13
  });

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Создаем стаедартный пользовательский интерфейс
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Изменение размера карты в зависимости от изменения размеров окна
window.addEventListener('resize',function(){
	map.getViewPort().resize()
});


var reader = new H.data.geojson.Reader();

reader.parseData(layer);

var group = new H.map.Group(); // create a group to hold map objects
group.addObjects(reader.getParsedObjects()); // add objects to the group
map.addObject(group); // add group to the map

group.addEventListener('tap', (ev) => {alert(ev.target.getData().properties.name)});
