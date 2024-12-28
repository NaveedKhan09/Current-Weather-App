
let searchCity = document.querySelector("#search");
let temprature = document.querySelector("#temprature");
let feelsLike = document.querySelector("#feels");
let place = document.querySelector("#place");
let pressure = document.querySelector(".pressure");
let Humidity = document.querySelector('.Humidity');
let Clouds = document.querySelector(".Clouds")
let Wind = document.querySelector('.wind')
let Sunrise = document.querySelector('.Sunrise')
let Sunset = document.querySelector('.Sunset')
let sky = document.querySelector('.sky');
let currentDate = document.querySelector('#present')

searchCity.onclick = () =>{
    let cityName = document.querySelector(".City").value


axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0f5a40e8107c6d5d216092b2dc37ca61&units=metric`)
.then(function (response) {
  // handle success
  console.log(response)

  let today = new Date()
  let arr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let day = today.getDay();
  let d_m_y = today.toISOString().split('T');
  let str = d_m_y[0].split('-');
  
  currentDate.innerText = `${arr[day]} ${str[2]}-${str[1]}-${str[0]}`
   
  
  
  
  temprature.innerText = `${response.data.main.temp}°C`;
  feelsLike.innerText = `Feels like ${response.data.main.feels_like}°C`;
  place.innerText =`${cityName}`;
  sky.innerText =`${response.data.weather[0].description}`
  sky.style.color = 'white'


  pressure.innerText = `${response.data.main.pressure} hPa`
  Humidity.innerText = `${response.data.main.humidity} %`
  Clouds.innerText = `${response.data.clouds.all} %`
  Wind.innerText = `${response.data.wind.speed} m/s`

  let SR = response.data.sys.sunrise;
  let Timezone = response.data.timezone
  let sunriseTime = SR + Timezone;
  let localSunriseTime = new Date(sunriseTime *1000);
  let SRhours = localSunriseTime.getUTCHours();
  let minutes = localSunriseTime.getUTCMinutes();
  Sunrise.innerText = `${SRhours}:${minutes.toString().padStart(2,'0')} AM`

  let SS = response.data.sys.sunset;
  let sunsetTime = SS + Timezone;
  let localSunsetTime = new Date(sunsetTime * 1000);
  let ssHours = localSunsetTime.getUTCHours();
  let ssHours12 = ssHours % 12;
  let ssMinutes = localSunsetTime.getMinutes();
  Sunset.innerText = `${ssHours12}:${ssMinutes.toString().padStart(2,'0')} PM`;

  document.querySelector('input').value = ''

})
.catch(function (error) {
  // handle error
  console.log(error);
  console.log(error.response.data)
  sky.innerText =`${error.response.data.message}`
  sky.style.color = 'red'
  sky.style.textTransform = 'Capitalize'

  temprature.innerText = 'T°C'
  feelsLike.innerText = 'Feels Like T°C'
  pressure.innerText = "";
  Humidity.innerText = "";
  Clouds.innerText = "";
  Wind.innerText = "";
  Sunrise.innerText = "";
  Sunset.innerText = "";


})

}