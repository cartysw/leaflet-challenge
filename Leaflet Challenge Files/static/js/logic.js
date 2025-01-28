// Create the first tile layer that will be the background of our map.
var smoothTopo = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map. Also, add an additional base map
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let colorTopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create the baseMaps object then add the 'basemap' tile layer to the map.
let baseMaps = {
  'Smooth Topographic Map': smoothTopo,
  'Topographic Map (Color)': colorTopo,
  'Streetmap View': streetmap
};

// Create the map object with center and zoom options.
let myMap = L.map("map", {
  center: [37.7749, -122.4194],
  zoom: 5,
  layers: [streetmap, colorTopo, smoothTopo]
});


// OPTIONAL: Step 2
// Create the layer groups, and overlays for our two sets of data, earthquakes and tectonic_plates.
// Add a control to the map that will allow the user to change which layers are visible.
let earthquakes = new L.layerGroup();
let tectonicPlates = new L.layerGroup();
let overlayMaps = {
  'Earthquakes': earthquakes,
  'Tectonic Plates': tectonicPlates
};

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      color: getColor(feature.geometry.coordinates[2]),
      fillColor: getColor(feature.geometry.coordinates[2]),
      radius: getRadius(feature.properties.mag),
      fillOpacity: 0.8
    };
  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {
    if (depth > 90) {
      return('#ff0000');
    }
    else if (depth > 70) {
      return('#fa6b53');
    }
    else if (depth > 50) {
      return('#ffa500');
    }
    else if (depth > 30) {
      return('#ffff00');
    }
    else if (depth >= 10) {
      return('#c2ed19');
    }
    else {
      return('#008000');
    }
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    return(magnitude * 5);
  }

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}, Depth: ${feature.geometry.coordinates[2]}`);
    }
  // OPTIONAL: Step 2
  // Add the data to the earthquake layer instead of directly to the map.
  }).addTo(earthquakes);
  earthquakes.addTo(myMap);

  // Create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    // Initialize depth intervals and colors for the legend
    let depthIntervals = [-10, 10, 30, 50, 70, 90];
    let legendColors = ['#008000', '#c2ed19', '#ffff00', '#ffa500', '#fa6b53', '#ff0000'];

    // Loop through our depth intervals to generate a label with a colored square for each interval.
    for (let i = 0; i < depthIntervals.length; i++) {
      div.innerHTML += "<i style='background: " + legendColors[i] + " '></i>" + depthIntervals[i] + 
        (depthIntervals[i + 1] ? "&ndash;" + depthIntervals[i + 1] + "<br>" : "+");
    }

    return div;
  };

  // Finally, add the legend to the map.
  legend.addTo(myMap);

  // OPTIONAL: Step 2
  // Make a request to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
    // Save the geoJSON data, along with style information, to the tectonic_plates layer. Then, add the tectonic_plates layer to the map.
    L.geoJson(plate_data, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`<h3>Plate Name: ${feature.properties.Name}</h3>`)
      }
    }).addTo(tectonicPlates);
    tectonicPlates.addTo(myMap);

  });
});