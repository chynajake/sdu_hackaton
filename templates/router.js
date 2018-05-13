class Routing {
  constructor(map, platform, params){
    this.router = platform.getRoutingService();
    this.params = params;
    this.map = map;
  }
  drawRoute () {
    this.router.calculateRoute(
      this.params,
      this.onSuccess,
      this.onError
    );
  }
  onSuccess (result) {

    let lineString = new H.geo.LineString(),
        way = result.response.route[0].shape;

    way.forEach((point) => {
      let parts = point.split(",")
      lineString.pushLatLngAlt(parts[0], parts[1])
    });

    map.addObject(new H.map.Polyline(lineString, {
      style: { lineWidth: 10 },
      arrows: { fillColor: 'white', frequency: 2, width: 0.8, length: 0.7 }
    }));
  }
  onError (error) {
    console.log(error)
  }
};

// Пример работы составления маршрута
var params = {
    mode: 'fastest;pedestrian',
    waypoint0: 43.25057933422427 + "," + 76.9398307800293,
    waypoint1: 43.24382723338111 + "," + 76.89949035644531,
    representation: 'display'
};

console.log(params);

new Routing(map, platform, params).drawRoute();