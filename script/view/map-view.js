export default class MapView {
  constructor(model) {
    this.model = model;
    this.data = this.model.getData();
    this.markers = [];
  }
  // инициализация карты
  init() {
    this.map = L.map('map').setView([55.755, 37.633], 14);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoidHN1YmFzYW5veXVtZSIsImEiOiJjamE1cXZ0cXZhbGxiMnFxdDJsbnU2MGVjIn0.xtBzSWo5rZAQ5uWgF5VCqQ'
    }).addTo(this.map);

    this.setMarkers(this.data);
  }

  highLightMarker(data) {
    this.markers.forEach((item) => {
      const markerLatLng = item.getLatLng();
      if (markerLatLng[0] === +data.lat && markerLatLng[1] === +data.lng) {
        item.setStyle({
          color: 'red'
        })
      } else {
        item.setStyle({
          color: 'rgb(0, 102, 255)'
        })
      }
    })
  }

  setMarkers(data) {
    this.markers.forEach((item) => {
      this.map.removeLayer(item);
    });

    //установка маркеров на карте в соответствии с данными
    for (let item of data) {
      // const marker = L.marker([item[`lat`], item[`lng`]]).addTo(this.map);
      const marker = new L.Marker.SVGMarker([item[`lat`], item[`lng`]]);
      marker.addTo(this.map);

      this.markers.push(marker);
    }
  }

}