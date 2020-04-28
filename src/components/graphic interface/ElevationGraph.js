import React, { Component } from 'react';
import { render } from "react-dom";
import { VictoryScatter, VictoryPortal, VictoryArea, VictoryStack, VictoryGroup, VictoryChart} from "victory";

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

function getChartData(routeElements){
    let aux = getArrayDistances(routeElements);
    let data=[];
    for (let i = 0; i < routeElements.length; i++) {
        if(routeElements[i].getElevation()==null){
            data.push({x: aux[i], y: 0});
        }
        else{
            data.push({x: aux[i], y: routeElements[i].getElevation()});
        }
    }
  
    return data;
  }

export default class ElevationGraph extends Component {
    data = getChartData(this.props.data);
    

    render(){
        console.log(this.data);
        return (
          <VictoryChart height={"200"}>
          <VictoryStack animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                    }} 
                    colorScale={["1FB494"]}>
            <VictoryGroup
              data = {this.data}
            >
              <VictoryArea/>
              <VictoryPortal>
                <VictoryScatter
                  style={{ data: { fill: "black" } }}
                />
              </VictoryPortal>
            </VictoryGroup>
          </VictoryStack>
        </VictoryChart>
        );
    }
}