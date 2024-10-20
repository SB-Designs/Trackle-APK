function goHome() {
  if (localStorage.getItem("newDesign") === "true") {
    window.location.href = "/newhome.html";
  } else {
    window.location.href = "/home.html";
  }
}
function enterGuess() {
    app.enterGuess();
  }
  
  function normalizeName(name) {
    return name
      .toUpperCase()
      .replace(/\&/g, "AND")
      .replace(/STREET/g, "ST")
      .replace(/\W/g, "");
  }
  
  function getStore() {
    return JSON.parse(window.localStorage.getItem("places_tube") || "{}");
  }
  
  function setStore(places) {
    window.localStorage.setItem("places_tube", JSON.stringify(places));
  }
  
  function addToStore(place) {
    let found = getStore();
    found[place] = true;
    setStore(found);
  }
  
  function hasFoundPlace(place) {
    let found = getStore();
    return found[place];
  }
  
  App.prototype.enterGuess = function () {
    var inputField = document.getElementById("guess");
    var inputName = normalizeName(inputField.value);
  
    var placeMatch = null;
    var placeMatchDistance = null;
    this.placeList.forEach((place) => {
      const cleanName = normalizeName(place.name);
  
      const distance =
        cleanName == inputName ? -1 : dziemba_levenshtein(cleanName, inputName);
  
      if (placeMatchDistance && distance < placeMatchDistance) return;
  
      var threshold = place.name.length < 5 ? 0 : place.name.length > 12 ? 2 : 1;
  
      if (cleanName.startsWith("HEATHROW")) {
        threshold = 0;
      }
  
      if (distance <= threshold) {
        placeMatch = place;
        placeMatchDistance = distance;
      }
    });
  
    const alreadyFound = placeMatch && hasFoundPlace(placeMatch.name);
  
    if (placeMatch && !alreadyFound) {
      addToStore(placeMatch.name);
      placeMatch.showOverlay();
      placeMatch.pan();
  
      document
        .getElementById("score")
        .animate([{ color: "#000" }, { color: "#fff" }, { color: "#000" }], {
          duration: 1000,
          iterations: 1,
        });
  
      setTimeout(() => {
        this.displayScore();
      }, 500);
  
      inputField.value = "";
    } else {
      if (placeMatch) placeMatch.pan();
      inputField.animate(
        [
          { transform: "translateX(-3px)" },
          { transform: "translateX(3px)" },
          { transform: "translateX(-3px)" },
          { transform: "translateX(3px)" },
          { transform: "translateX(-3px)" },
          { transform: "translateX(3px)" },
        ],
        {
          duration: 800,
          iterations: 1,
        }
      );
      inputField.select();
    }
  };
  
  App.prototype.displayScore = function () {
    var score = Object.keys(
      JSON.parse(window.localStorage.getItem("places_tube") || "{}")
    ).length;
    document.getElementById("score").innerHTML = score;
    document.getElementById("total").innerHTML = this.placeList.length;
  
    const shareText = `I just played Trackle™ and named ${score} London Underground stations! You can play Trackle™ too:`;
    const shareData = {
      title: "Trackle™ - The Tube Guessing Game",
      text: shareText,
      url: window.location.href,
    };
  
    if (score == this.placeList.length) {
      setTimeout("app.winMessage()", 100);
    }
  };
  
  App.prototype.winMessage = function () {
    alert("Well done! You found all " + this.placeList.length + " Underground stations.");
  };
  
  function dziemba_levenshtein(a, b) {
    var tmp;
    if (a.length === 0) {
      return b.length;
    }
    if (b.length === 0) {
      return a.length;
    }
    if (a.length > b.length) {
      tmp = a;
      a = b;
      b = tmp;
    }
  
    var i,
      j,
      res,
      alen = a.length,
      blen = b.length,
      row = Array(alen);
    for (i = 0; i <= alen; i++) {
      row[i] = i;
    }
  
    for (i = 1; i <= blen; i++) {
      res = i;
      for (j = 1; j <= alen; j++) {
        tmp = row[j - 1];
        row[j - 1] = res;
        res = Math.min(tmp + (b[i - 1] !== a[j - 1]), res + 1, row[j] + 1);
      }
      row[j - 1] = res;
    }
    return res;
  }
  App.prototype.resetGame = function () {
    // Clear local storage
    window.localStorage.removeItem("places_tube");
  
    // Reset the score display
    document.getElementById("score").innerHTML = 0;
    document.getElementById("total").innerHTML = this.placeList.length;
    location.reload();
  
    // Clear the map overlays
    this.placeList.forEach((place) => {
      if (place.overlay) {
        map.removeLayer(place.overlay);
        place.overlay = null;
      }
    });
  
    // Refocus on the input field
    document.getElementById("guess").focus();
  };
  