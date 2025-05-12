const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;
const IMIE_AUTORA = "Szymon Ciechonski";
const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;


if (!OPENWEATHER_KEY) {
    console.error("Brak klucza w zmiennej OPENWEATHER_KEY!");
    process.exit(1);
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Nowy endpoint API do pobierania pogody
app.post('/api/weather', async (req, res) => {
    const { city } = req.body;
    try {
        const weatherData = await getWeatherData(city);
        if (weatherData) {
            res.json({ success: true, weather: weatherData, city: city });
        } else {
            res.json({ success: false, message: "Nie można pobrać danych pogodowych dla wybranej lokalizacji." });
        }
    } catch (error) {
        console.error("Błąd pobierania danych pogodowych:", error);
        res.status(500).json({ success: false, message: "Wystąpił błąd serwera podczas pobierania danych pogodowych." });
    }
});

async function getWeatherData(city) {
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
    const params = {
        q: city,
        appid: OPENWEATHER_KEY,
        units: "metric",
        lang: "pl"
    };
    try {
        const response = await axios.get(baseUrl, { params });
        const data = response.data;
        return {
            description: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
            temperature: data.main.temp,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            wind_speed: data.wind.speed,
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        };
    } catch (error) {
        console.error("Błąd API OpenWeatherMap:", error.response ? error.response.data : error.message);
        return null;
    }
}
app.listen(PORT, () => {
    const STARTUP_DATE = new Date().toISOString();
    console.log(`Aplikacja uruchomiona: ${STARTUP_DATE}`);
    console.log(`Autor: ${IMIE_AUTORA}`);
    console.log(`Nasłuchiwanie na porcie TCP: ${PORT}`);
    console.log(`Używany klucz API: ${OPENWEATHER_KEY}`);
});