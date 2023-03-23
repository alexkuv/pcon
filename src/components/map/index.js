import loader_js from "../loader/index.js";

loader_js('https://api-maps.yandex.ru/2.1/?apikey=5925c527-36e3-4ef4-9069-12c80ae834f7&lang=ru_RU', init, errorMap);

function init() {
  const mapContainer = document.querySelector('#map');
  if (mapContainer) {
    const mapCoordinates = document.querySelectorAll('[data-mapresidence');
    let MAP;
    let coordinatesAll = [];
    let coordinates;

    for (let coordinatesAllElement of mapCoordinates) {
      coordinatesAll.push(coordinatesAllElement.dataset.mapresidence.split(','));
    }

    const coordinatesOne = mapCoordinates[0].dataset.mapresidence;

    initMap();

    for (let mapCoordinatesElement of mapCoordinates) {
      mapCoordinatesElement.addEventListener('click', function() {
        for (let mapCoordinate of mapCoordinates) {
          mapCoordinate.classList.remove('active');
        }
        this.classList.add('active');
        coordinates = this.dataset.mapresidence;
        MAP.setCenter(coordinates.split(','), 17);
      })
    }

    function initMap() {
      // Дождёмся загрузки API и готовности DOM.
      ymaps.ready(function () {
        // Создание экземпляра карты и его привязка к контейнеру с
        // заданным id ("map").
        MAP = new ymaps.Map('map', {
          // При инициализации карты обязательно нужно указать
          // её центр и коэффициент масштабирования.
          center: coordinatesOne.split(','),
          zoom: 17,
          controls: ['fullscreenControl']
        }, {
            suppressObsoleteBrowserNotifier: true,
            yandexMapDisablePoiInteractivity: true,
            suppressMapOpenBlock: true
        });

        // добавление zoomControl с правой стороны карты
        MAP.controls.add('zoomControl', {position: {right: '10px', top: '60px'}});

        // создание группы
        var myGeoObjects = new ymaps.GeoObjectCollection({}, {
          preset: 'islands#blueFactoryIcon',
          iconColor: 'red'
        });

        for (let coordinatesAllElement of coordinatesAll) {
          myGeoObjects.add(new ymaps.Placemark(coordinatesAllElement));
        }

        MAP.geoObjects.add(myGeoObjects);

        // отключаем zoom колесом мыши
        MAP.behaviors.disable('scrollZoom');

      });
    }

  }
}

function errorMap() {
  console.log("%cYandex api не загружен","font-size: 10pt; color:#ff0058;")
}
