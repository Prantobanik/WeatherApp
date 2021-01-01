const api = {
  key: "ad3447d40d7f0a312edcfe98a1f5b17d",
  url: "https://api.openweathermap.org/data/2.5/",
  icon: "http://openweathermap.org/img/wn/"
};

 
 
 



 
const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);
function setQuery(e) {
  if (e.keyCode === 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(e) {
  fetch(
    `${api.url}weather?q=${e}&units=imperial&appid=${api.key}`
  ).then((response) => {
    return response.json();
  }).then(displayResults);
}
 

function displayResults(response) {
  console.log(response);
  let city = document.querySelector(".location-timezone");
  city.innerText = `${response.name},${response.sys.country}`;
  let tempFahrenheit=response.main.temp
  let temperatureDegree = document.querySelector(".temperature-degree");
  temperatureDegree.innerText = tempFahrenheit;

   let temperatureDescription = document.querySelector(
     ".temperature-description"
  );
  temperatureDescription.innerText = `${response.weather[0].description}`;
  

  
  let temperatureIconSrc = document.querySelector("#tempIc");
  temperatureIconSrc.src = `${api.icon}${response.weather[0].icon}@2x.png`;
  
   let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span");
  let celsius = (tempFahrenheit - 32) * 5/9;

    temperatureSection.addEventListener("click", () => {
                  if (temperatureSpan.textContent === '°F') {
                    temperatureSpan.textContent = '°C';
                    temperatureDegree.textContent = Math.floor(celsius);
                  }
                  else {
                    temperatureSpan.textContent = "°F";
                    temperatureDegree.textContent =
                      tempFahrenheit;
                  }
                });
  

}


window.addEventListener("load", () => {
    let long;
  let lat;
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDescription = document.querySelector(".temperature-description");
 
  let temperatureIconSrc = document.querySelector("#tempIc");
  
  
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span");

  
  
  

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

         
            fetch(
              `${api.url}onecall?lat=${lat}&lon=${long}&units=imperial&appid=${api.key}`
            )
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                console.log(data);
                let temperature = data.current.temp;
                let summary = data.current.weather[0].description;
                let city = data.timezone;
                let tempIcon = data.current.weather[0].icon;
                let celsius = (temperature - 32) * 5 / 9;

                
                temperatureDegree.textContent = temperature;
                temperatureDescription.innerHTML = summary;
                locationTimezone.textContent = city;
                
                temperatureIconSrc.src =
                  `${api.icon}${tempIcon}@2x.png`;
                
                
                temperatureSection.addEventListener("click", () => {
                  if (temperatureSpan.textContent === '°F') {
                    temperatureSpan.textContent = '°C';
                    temperatureDegree.textContent = Math.floor(celsius);
                  }
                  else {
                    temperatureSpan.textContent = "°F";
                    temperatureDegree.textContent = temperature;
                  }
                });
                
              });
        });





       
    }
});