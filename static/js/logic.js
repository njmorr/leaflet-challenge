console.log("logic.js is loaded!");

// Creating map object
var myMap = L.map("mapid", {
    center: [34.0522, -118.2437],
    zoom: 8
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

d3.json(geoData).then(function(data) {

  L.geoJson(data)
    console.log(data.features[1]);
    console.log(data.features[1].geometry.coordinates[0]);

});


// var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "dark-v10",
//   accessToken: API_KEY
// });


// // Create a baseMaps object to contain the streetmap and darkmap
// var baseMaps = {
//     "Street Map": streetmap,
//     "Dark Map": darkmap
//   };

// // Modify the map so that it will have the streetmap, states, and cities layers
// var myMap = L.map("mapid", {
//     center: [37.09, -95.71],
//     zoom: 5,
//     layers: [streetmap] //, states, cities]
//   });myMap

//   // Create a layer control, containing our baseMaps and overlayMaps, and add them to the map
// L.control.layers(baseMaps, {  //, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);