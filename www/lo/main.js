var app;
var map;

class App {
  constructor() {
    this.placeList = [];
  }

  initialize() {

    this.initializePlaces();

    console.log("create the map");

    map = L.map("map", { zoomControl: false }).setView(
      [51.508328, -0.124819],
      13
    );

    const tiles = L.tileLayer(
      "https://api.mapbox.com/styles/v1/kailan/clnmjy811006901qpergtfrho/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2FpbGFuIiwiYSI6ImNreHh6MjNtNzJhd3oyb21wYjRkY2U0aGsifQ.tZzQ-GAom5_D8SLwrqmy-Q",
      {
        minZoom: 10,
        maxZoom: 16,
        attribution:
          '&copy; SB Designs',
      }
    ).addTo(map);

    let foundPlaces = JSON.parse(window.localStorage.getItem("places_lo") || "{}");
    this.placeList.forEach((place) => {
      if (foundPlaces[place.name]) {
        place.showOverlay();
      }
    });

    document.getElementById("guess").addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        app.enterGuess();
      }
    });

    this.displayScore();
  }
}

const roundelIcon = L.icon({
  iconUrl:
    "/assets/roundel-overground.png",
  iconSize: [32, 32],
});

class Place {
  constructor(name, pt) {
    this.name = name;
    this.pt = pt;

    this.overlay = null;
  }

  showOverlay() {
    L.marker(this.pt, {
      icon: roundelIcon,
    })
      .bindTooltip(this.name, {
        direction: "right",
        className: "place-tooltip",
      })
      .addTo(map);
  }
  pan() {
    map.panTo(this.pt, {
      animate: true,
    });
  }
}

function loadPage() {
  console.log("load page");

  app = new App();
  app.initialize();
  var london = L.polygon([[51.78347654668593,-0.633547777426019],[51.15318960097732,-0.6262096314495935,],[51.15117220714314,0.4452995803654325],[51.79071440048644,0.447383684146665]]);
  map.setMaxBounds(london.getBounds());
  document.getElementById("guess").focus();
}
