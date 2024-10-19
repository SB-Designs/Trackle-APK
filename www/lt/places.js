const sourcePlaces = [
    { name: "BECKENHAM JUNCTION", pt: [51.4114, -0.0255] },
    { name: "BECKENHAM ROAD", pt: [51.4083, -0.0304] },
    { name: "AVENUE ROAD", pt: [51.4050, -0.0342] },
    { name: "BIRKBECK", pt: [51.3989, -0.0453] },
    { name: "HARRINGTON ROAD", pt: [51.3961, -0.0521] },
    { name: "ARENA", pt: [51.3967, -0.0584] },
    { name: "WOODSIDE", pt: [51.3967, -0.0650] },
    { name: "BLACKHORSE LANE", pt: [51.3917, -0.0700] },
    { name: "ADDISCOMBE", pt: [51.3867, -0.0750] },
    { name: "SANDILANDS", pt: [51.3817, -0.0800] },
    { name: "LEBANON ROAD", pt: [51.3767, -0.0850] },
    { name: "EAST CROYDON", pt: [51.3750, -0.0920] },
    { name: "GEORGE STREET", pt: [51.3730, -0.0970] },
    { name: "CHURCH STREET", pt: [51.3720, -0.1010] },
    { name: "WANDLE PARK", pt: [51.3710, -0.1060] },
    { name: "WADDON MARSH", pt: [51.3690, -0.1120] },
    { name: "AMPERE WAY", pt: [51.3670, -0.1180] },
    { name: "THERAPIA LANE", pt: [51.3650, -0.1240] },
    { name: "BEDDINGTON LANE", pt: [51.3630, -0.1300] },
    { name: "MITCHAM JUNCTION", pt: [51.3820, -0.1590] },
    { name: "MITCHAM", pt: [51.3980, -0.1680] },
    { name: "BELGRAVE WALK", pt: [51.4030, -0.1750] },
    { name: "PHIPPS BRIDGE", pt: [51.4070, -0.1820] },
    { name: "MORDEN ROAD", pt: [51.4110, -0.1890] },
    { name: "MERTON PARK", pt: [51.4150, -0.1960] },
    { name: "DUNDONALD ROAD", pt: [51.4190, -0.2030] },
    { name: "WIMBLEDON", pt: [51.4220, -0.2060] },
    { name: "ELMERS END", pt: [51.3980, -0.0490] },
    { name: "LLOYD PARK", pt: [51.3620, -0.0790] },
    { name: "COOMBE LANE", pt: [51.3570, -0.0850] },
    { name: "GRAVEL HILL", pt: [51.3530, -0.0910] },
    { name: "ADDINGTON VILLAGE", pt: [51.3490, -0.0970] },
    { name: "FIELDWAY", pt: [51.3450, -0.1030] },
    { name: "KING HENRY’S DRIVE", pt: [51.3410, -0.1090] },
    { name: "NEW ADDINGTON", pt: [51.3360, -0.1150] },
    { name: "CENTRALE", pt: [51.3740, -0.0990] },
    { name: "WEST CROYDON", pt: [51.3780, -0.1020] },
    { name: "WELLESLEY ROAD", pt: [51.3760, -0.0950] },
    { name: "REEVES CORNER", pt: [51.3730, -0.1040] }
  ];
  
  App.prototype.initializePlaces = function () {
    console.log("initialize places");
  
    sourcePlaces.forEach((sourcePlace) => {
      var place = new Place(sourcePlace.name, sourcePlace.pt, false);
      app.placeList.push(place);
    });
  };