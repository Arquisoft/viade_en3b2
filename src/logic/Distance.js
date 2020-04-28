//in km


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

//in km
function getTotalDistance(routeElements) {
    var total = 0;

    for (let i = 1; i < routeElements.length; i++) {
        total = total + getDistanceFromLatLonInKm(routeElements[i-1].getLatitude(),routeElements[i-1].getLongitude(),
          routeElements[i].getLatitude(),routeElements[i].getLongitude());
    }

    return total;
}

//array de distancias para repensetarlas en el grafico
function getArrayDistances(routeElements) {
  let total = 0;
  let aux = [];
  aux.push(total);

  for (let i = 1; i < routeElements.length; i++) {
      total = total + getDistanceFromLatLonInKm(routeElements[i-1].getLatitude(),routeElements[i-1].getLongitude(),
        routeElements[i].getLatitude(),routeElements[i].getLongitude());
        aux.push(total);
  }

  return aux;
}

export function getChartData(routeElements) {
  let aux = getArrayDistances(routeElements);
  let data=[];
  for (let i = 0; i < routeElements.length; i++) {
      data.push({x: aux[i], y: routeElements.getElevation()});
  }

  return data;
}