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

// var geojson;

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
};

function radiusSize (mag) {
  switch (mag) {
    case mag > 6.5:
      return 17;
    case mag > 6:
      return 14;
    case mag > 5.5:
      return 11;
    case mag > 5.0:
      return 8;
    default:
      return 5;
  }
};

d3.json(geoData).then(function(data) {
  
  
  console.log(data)

  for (var i = 0; i < data.features.length; i++) {
    var depthValue = data.features[i].geometry.coordinates[2];
    var magnitude = data.features[i].properties.mag; 
    
    // console.log(`depth: ${depthValue}`);
    // console.log(`mag: ${magnitude}`);
  
     L.geoJson(data, {
    
      style: function(feature) {
        return{
          // fillColor: depthColor(feature.geometry.coordinates[2])  // should be a function
          fillColor: depthColor(depthValue)  // should be a function
        };
      },

      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: radiusSize(feature.properties.mag), // should be a function
          radius: radiusSize(magnitude), // should be a function
          color: "black",
          weight: 0.5,
          opacity: 1,
          fillOpacity: 0.5
        });

      },

      onEachFeature: function (feature, layer) {
        layer.bindPopup(`Magnitude: ${feature.properties.mag} and Depth is ${feature.geometry.coordinates[2]}`);
      }

    }).addTo(myMap);
  };
});


  






