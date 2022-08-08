const key = "24aca21d5d429a7501372ffe575a351d";

const select = document.querySelector(".form-select");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const tempMin = document.querySelector(".temp-min");
const tempMax = document.querySelector(".temp-max");
const icon = document.querySelector(".icon");
const weatherType = document.querySelector(".weather-type");
const time = document.querySelector(".time");
const timeZone = document.querySelector(".time-zon");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const atmp = document.querySelector(".atmp");



const kelvinToCelsius = (degrees) => {
    const celsius = degrees - 273.15;
    return celsius.toFixed(1);
};

const getCities = () => {

    fetch('cities.json', {
        method: 'GET' ,
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(city => {
            const option = document.createElement("option");
            option.value = city.id;
            option.text = city.name;
            //if it is Copenhagen
            if(city.id === 2618425){
                option.setAttribute("selected", true);
            }

            select.appendChild(option);
        });
    })
    .catch((error) => {
        console.error ('Error:', error);
    });
}

const getWeather = (cityId = 2618425) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${key}`, {
        method: 'GET' ,
    })
    .then(response => response.json())
    .then(data => {
        const date = new Date();

        city.innerText = data.name;
        temp.innerText = kelvinToCelsius(data.main.temp) + '\xB0C';
        tempMin.innerText = kelvinToCelsius(data.main.temp_min) + '\xB0C'+ " min";
        tempMax.innerText = kelvinToCelsius(data.main.temp_max) + '\xB0C'+ " max";
        icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherType.innerText = data.weather[0].description;
        time.innerText =`${date.toLocaleTimeString()}, ${date.toLocaleDateString()}`;
        timeZone.innerText = data.timezone; 
        wind.innerText =`wind ${data.wind.speed} m/s`;
        humidity.innerText = `humidity ${data.main.humidity}%`;
        atmp.innerText = `Pressure ${data.main.pressure} hPa`;
       
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error ('Error:', error);
    }); 
}
getCities();
getWeather();

/* 
const setDays = (cityId = 2618425) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?id=${cityId}&cnt=${3}&appid=${key}`,{
        method: 'GET'
    })
}
*/


select.addEventListener("change", function(e) {
    let cityId = e.target.value;
    getWeather(cityId);
});

//// de continuat. momentan putem vedea datele despre vreme de la un oras in momentul cererii  dar nu putem selecta daca vrem pe mai multe zile 