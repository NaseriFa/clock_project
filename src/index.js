// Store the current timezone (default: user's local timezone)
let currentCity = moment.tz.guess();

// Display time and date for the selected city
function renderCurrentCity() {
  if (!currentCity) return; // stop if no city is set

  let cityTimezone = moment.tz(currentCity);
  let cityName = currentCity.replace("_", " ").split("/")[1] || currentCity;

  // Update all time and date elements
  document.querySelector("#hour").innerHTML = `${cityTimezone.format("hh:")}`;
  document.querySelector("#minutes").innerHTML = `${cityTimezone.format("mm")}`;
  document.querySelector("#symbol").innerHTML = `${cityTimezone.format("A")}`;
  document.querySelector("#seconds").innerHTML = `${cityTimezone.format("ss")}`;
  document.querySelector(".date").innerHTML = `${cityTimezone.format("MMM, dddd DD YYYY")}`;
  document.querySelector("#city-name").innerHTML = `${cityName}`;
}

// Handle city selection change
function updateTime(event) {
  let city = event.target.value;

  if (city === "") return; // do nothing if no city is selected

  if (city === "current") {
    currentCity = moment.tz.guess(); // use user's local timezone
  } else {
    currentCity = city; // use selected timezone
  }

  renderCurrentCity(); // update display immediately
}

// Initialize
const citySelectElement = document.querySelector("#city");
citySelectElement.addEventListener("change", updateTime);

// Show current time when the page loads
renderCurrentCity();

// Update clock every second
setInterval(renderCurrentCity, 1000);
