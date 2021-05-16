console.log("logic.js is loaded!");

// Creating map object
var myMap = L.map("mapid", {
  // center: [0, 166],
  center: [0, -0],
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

d3.json(geoData).then(function (data) {

  console.log(data)

  L.geoJson(data, {
    style: function (feature) {
      return {
        fillColor: depthColor(feature.geometry.coordinates[2])  // should be a function
      };
    },

    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: radiusSize(feature.properties.mag), // should be a function
        color: "white",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.75
      });
      // https://leafletjs.com/examples/geojson/
      // Accessedd 16 May 2021

    },

    onEachFeature: function (feature, layer) {
      layer.bindPopup(`Earthquake occured near ${feature.properties.place} with a magnitude of ${feature.properties.mag} and depth of ${feature.geometry.coordinates[2]}km.`);
    }

  }).addTo(myMap);

  var legend = L.control({ position: 'bottomright' });
  
  legend.onAdd = function (blah) {
    var div = L.DomUtil.create('div', 'info legend'),
      earthquakeDepth = [0, 25, 50, 75],
      labels = colors;

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < earthquakeDepth.length; i++) {
      div.innerHTML +=
        '<i style="background:' + getColor(earthquakeDepth[i] + 1) + '"></i> ' 
        + `${earthquakeDepth[i]}km` + (earthquakeDepth[i + 1] ? '&ndash;' + `${earthquakeDepth[i + 1]}km` + '<br>' : '+');
    }

    return div;
  };

  legend.addTo(myMap);


});


function depthColor(depth) {
  if (depth > 75) {
    return "#ee4e4e";
  } else if (depth > 50) {
    return "#ee9b4e";
  } else if (depth > 25) {
    return "#eede4e";
  } else {
    return "#73ee4e";
  }
};


function radiusSize(mag) {
  if (mag > 6.5) {
    return 17;
  } else if (mag > 6) {
    return 14;
  } else if (mag > 5.5) {
    return 11;
  } else if (mag > 5.0) {
    return 8;
  } else {
    return 5;
  }

};

var colors = ["#ee4e4e", "#ee9b4e", "#eede4e", "#73ee4e"]

function getColor(d) {
  // console.log(`getColor: ${d}`);
  return d > 75 ? colors[0] :
    d > 50 ? colors[1] :
      d > 25 ? colors[2] :
        colors[3]
}






