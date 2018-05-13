/**
 * Created by chynajake on 5/13/18.
 */
class Tour {
  constructor(map, platform, params){
    this.router = platform.getRoutingService();
    this.params = params;
    this.map = map;
  }
  makeTour(){
      var url = '';
      var base_url = 'https://wse.cit.api.here.com/2/findsequence.json';
      url += base_url + '?start=' + this.params['start'];

      var i;
      // несчитая старта и финиша
      for (i = 1; i < this.params['place_num'] - 1; i++) {
          url+= '&destination' + i + '=' + this.params['destination'+i];
      }

      url += '&end=' + this.params['end'];

      url += '&mode=' + this.params['mode'];
      url += '&app_id=' + this.router['a']['b']['app_id'];
      url += '&app_code=' + this.router['a']['b']['app_code'];
      console.log(url);
      axios.get(url).then(function (response) {
          var result = response.data;

          var waypoints = result['results'][0]['waypoints'];
          console.log(waypoints);
          console.log(waypoints.length);
          var j;
          for (j = 0; j < waypoints.length-1; j++) {
              var pars = {
                  mode: 'fastest;car',
                  waypoint0: waypoints[j]['lat'] + "," + waypoints[j]['lng'],
                  waypoint1: waypoints[j+1]['lat'] + "," + waypoints[j+1]['lng'],
                  representation: 'display'
              };
              console.log(j);
              console.log(pars);

              new Routing(map, platform, pars).drawRoute();
          }
      }).catch(function (error) {
          console.log("fuck");
          console.log(error);
      })

      // axios.get('https://wse.cit.api.here.com/2/findsequence.json' +
      // '?start=Berlin-Main-Station;52.52282,13.37011' +
      // '&destination1=East-Side-Gallery;52.50341,13.44429' +
      // '&destination2=Olympiastadion;52.51293,13.24021' +
      // '&end=HERE-Berlin-Campus;52.53066,13.38511' +
      // '&mode=fastest;car' +
      // '&app_id={YOUR_APP_ID}' +
      //     '&app_code={YOUR_APP_CODE}'
      // )
  }
};

var my_params = {
    start: 'Start;' + 43.233419 + "," + 76.956563,
    destination1: 'Fantasy World;' + 43.239955 + "," + 76.916694,
    destination2: 'Muha;' + 43.240768 + "," + 76.917136,
    end: 'End;' + 43.202686 + "," + 76.891833,
    place_num: 4,
    mode: 'fastest;car'
};

console.log(my_params);

new Tour(map, platform, my_params).makeTour();