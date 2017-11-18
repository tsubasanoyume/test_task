export default class MapView {
  constructor(model) {
    this.model = model;
    this.data = this.model.getData();
  }
  // инициализация карты
  init() {
    const mymap = L.map('map').setView([55.755, 37.633], 14);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoidHN1YmFzYW5veXVtZSIsImEiOiJjamE1cXZ0cXZhbGxiMnFxdDJsbnU2MGVjIn0.xtBzSWo5rZAQ5uWgF5VCqQ'
    }).addTo(mymap);
    //установка маркеров на карте в соответствии с данными
    for (let item of this.data) {
      const marker = L.marker([item[`lat`], item[`lng`]]).addTo(mymap);
    }
  }

}