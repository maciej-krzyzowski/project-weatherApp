const input = document.querySelector('.top__input');
const btn = document.querySelector('.top__btn');
const warning = document.querySelector('.top__warning');
const cityName = document.querySelector('.header__city');
const img = document.querySelector('.header__img');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.header__temp');
const tempMinMax = document.querySelector('.temp');
const pressure = document.querySelector('.pressure');

const getWeather = () => {
    const city = !input.value ? "Warszawa" : input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4534780d285e26ed2cc9bf00f9e718ad&units=metric`;

    warning.textContent = '';
    input.value = '';
    input.focus();

    axios.get(url)
        .then(res => {
            const temp = res.data.main.temp;
            const press = res.data.main.pressure;
            const tempMin = res.data.main.temp_min;
            const tempMax = res.data.main.temp_max;
            const status = { ...res.data.weather[0] };

            cityName.textContent = city;
            temperature.textContent = Math.floor(temp) + '°C';
            weather.textContent = status.main;
            tempMinMax.textContent = Math.floor(tempMin) + '°C / ' + Math.floor(tempMax) + '°C';
            pressure.textContent = press + 'hPa';

            if (status.id >= 200 && status.id < 300) {
                img.src = 'img/thunderstorm.png';
            } else if (status.id >= 300 && status.id < 400) {
                img.src = 'img/drizzle.png';
            } else if (status.id >= 500 && status.id < 600) {
                img.src = 'img/rain.png';
            } else if (status.id >= 600 && status.id < 700) {
                img.src = 'img/snow.png';
            } else if (status.id >= 700 && status.id < 800) {
                img.src = 'img/fog.png';
            } else if (status.id == 800) {
                img.src = 'img/sun.png';
            } else if (status.id >= 800 && status.id < 900) {
                img.src = 'img/cloud.png';
            } else {
                img.src = 'img/unknown.png';
            }
        })
        .catch(() => {
            warning.textContent = 'Enter the city name correctly.';
            cityName.textContent = '-';
            weather.textContent = '-';
            temperature.textContent = '-';
            pressure.textContent = '-';
            img.src = 'img/unknown.png';
        })
}

getWeather();
btn.addEventListener('click', getWeather);
window.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        getWeather();
    }
});