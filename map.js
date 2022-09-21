mapboxgl.accessToken =
  "pk.eyJ1Ijoia25veG5ld3MiLCJhIjoiY2w4M2MzNnQxMDAxNDNucjE3bmRobnFhMiJ9.f5ad4uYpb3F_enhYYwCecg";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/knoxnews/cl8aliia5002214p0p1as3kpj",
  zoom: 3.7,
  maxZoom: 10,
  minZoom: 3.5,
  center: [-98, 40],
});

map.on("load", function () {
  map.addLayer({
    id: "top10-hosts",
    type: "circle",
    source: {
      type: "geojson",
      data: "data/df.geojson",
    },
    paint: {
      "circle-color": "#50C878",
      "circle-stroke-color": "#ffffff",
      "circle-stroke-width": 2,
      "circle-opacity": 0.5,
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "Times"],
        2,
        4,
        6,
        8,
        10,
        12,
      ],
    },
  });
});

// Create the popup

map.on("click", "top10-hosts", function (e) {
  var uniName = e.features[0].properties["University"];
  var latestGameday = e.features[0].properties["Most recent gameday"];
  var imagePath;
  if (uniName === "Ohio State University") {
    imagePath = "./Ohio.jpeg";
  } 
  else if (uniName === "University of Alabama") {
    imagePath = "./Alabama.jpeg";
  } 
  else if (uniName === "University of Michigan") {
    imagePath = "./Michigan.jpeg";
  } 
  else if (uniName === "Louisiana State University") {
    imagePath = "./Louisiana.jpeg";
  } 
  else if (uniName === "University of Florida") {
    imagePath = "./Gainesville.jpeg";
  } 
  else if (uniName === "Florida State University") {
    imagePath = "./Tallahassee.jpeg";
  } 
  else if (uniName === "University of Oregon") {
    imagePath = "./Eugene.jpeg";
  } 
  else if (uniName === "University of Southern California") {
    imagePath = "./test.jpeg";
  } 
  else if (uniName === "University of Notre Dame") {
    imagePath = "./Notre-Dame.jpeg";
  } 
  else if (uniName === "University of Tennessee") {
    imagePath = "Knoxville.jpeg";
  } 
  else {
    imagePath = "Knoxville.jpeg"
}
  uniName = uniName.toUpperCase();
  // latestGameday = latestGameday.toUpperCase();
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<b>" + uniName + "<br>" + "</b>" + "Last Gameday was on " + latestGameday +
      "<img src=\'" + imagePath + "\" />"
    .addTo(map);
});

// Change the cursor to a pointer when the mouse hovers over a pop-up location
map.on("mouseenter", "top10-hosts", function () {
  map.getCanvas().style.cursor = "pointer";
});

// Change the cursor back to a pointer when it leaves pop-up
map.on("mouseleave", "top10-hosts", function () {
  map.getCanvas().style.cursor = "";
});
