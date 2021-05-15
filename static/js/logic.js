console.log("logic.js is loaded!");

// Creating map object
var myMap = L.map("mapid", {
    // center: [0, 166],
    center: [0,-0],
    zoom: 2
  });

// Streetmap Layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data
var geoData = "static/data/earthquakes.geojson";

var geojson;

// create a function for the marker color based on depth of earthquake
function depthColor (depth) {
  switch (depth) {
    case depth > 75:
      return "#ee4e4e";
    case depth > 50:
      return "#ee9b4e";
    case depth > 25:
      return "#eede4e";
    default:
      return "#73ee4e";
  }
}

// maybe use L.circleMarker(data){blah blah blah}

var markerOptions = {
  radius: 8,
  fillColor: "lightgreen",
  color: "black",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
}

d3.json(geoData).then(function(data) {

  L.geoJson(data, {
  
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, markerOptions);
    }

  }).addTo(myMap);

});


  






