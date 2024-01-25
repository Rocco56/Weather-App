/*
Edge Case: couldnt find good Smoke art for the img
so it is defaulted to clouds 
*/

const textContainer = document.querySelector("#city");
const searchBtn = document.querySelector(".search-button");
const appContainer = document.querySelector(".app-container");
const tempInfoContainer = document.querySelector(".temp-info");
textContainer.value = "";

async function time(city) {
  let response = await fetch(
    `https://api.api-ninjas.com/v1/worldtime?city=${city}&X-Api-Key=VrMS28M5jqmtdGU5IHnJOQ==mhSCwB8uCZhVRr8S`
  );

  let timeData = await response.json();

  return timeData;
}

async function getTempBySearch(cityName) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a8436798e01d4de27415b7db39bbbbae&units=metric`
  );

  let cityData = await response.json();

  return cityData;
}

searchBtn.addEventListener("click", async () => {
  let city = textContainer.value;
  if (!textContainer.value) {
    alert("enter valid value");
  }
  tempInfoContainer.innerHTML = "";
  updateWeather(city);
  textContainer.value = "";
});

function weatherImg(cityInfo) {
  let imgLoc;
  switch (cityInfo) {
    case "Clear":
      imgLoc = "./images/clear.png";
      break;
    case "Clouds":
      imgLoc = "./images/clouds.png";
      break;
    case "Rain":
      imgLoc = "./images/rain.png";
      break;
    case "Drizzle":
      imgLoc = "./images/drizzle.png";
      break;
    case "Snow":
      imgLoc = "./images/snow.png";
      break;
    case "Mist":
      imgLoc = "./images/mist.png";
      break;

    default:
      imgLoc = "./images/clouds.png";
  }
  return imgLoc;
}

async function updateWeather(city) {
  const cityInfo = await getTempBySearch(city);
  console.log(cityInfo);
  const timeInfo = await time(city);
  console.log(timeInfo);
  let amOrPm;
  if (timeInfo.hour > 12) {
    amOrPm = "PM";
  } else {
    amOrPm = "AM";
  }
  const tempStatContainer = document.createElement("div");
  tempStatContainer.innerHTML = `
  <div class="city-time">
    <p class="time-text">${
      timeInfo.hour > 12 ? Math.abs(timeInfo.hour - 12) : timeInfo.hour
    }:${timeInfo.minute}:${timeInfo.second} ${amOrPm} , ${
    timeInfo.day_of_week
  } , ${timeInfo.date}</p>
  </div>
  <div class="temp-fig">
  <img class="fig" src=${weatherImg(cityInfo.weather[0].main)} alt="" />
  <h1 class="temp">
    <span class="temp-text">${cityInfo.main.temp}</span
    ><span class="deg"><i class="fa-regular fa-circle"></i></span
    ><span class="faren">C</span>
  </h1>
</div>
<div class="mini-desc">
  <h2>${(cityInfo.weather[0].main = "Smoke"
    ? "Clouds"
    : cityInfo.weather[0].main)}</h2>
</div>
<div class="stats">
  <div class="humidity-container">
    <h3>Humidity</h3>
    <div class="hum-fig">
      <img src="./images/humidity.png" alt="" />
      <p class="humidity">${cityInfo.main.humidity}%</p>
    </div>
  </div>
  <div class="wind-container">
    <h3>Wind Speed</h3>
    <div class="wind-fig">
      <img src="./images/wind.png" alt="" />
      <p class="wind">${cityInfo.main.temp}km/j</p>
    </div>
  </div>
</div>
  
  `;
  tempInfoContainer.appendChild(tempStatContainer);
}
