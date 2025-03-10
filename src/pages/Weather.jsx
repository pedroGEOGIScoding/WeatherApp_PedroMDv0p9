import { useState, useEffect } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";

const containerStyle = {
  width: "100%",
  margin: "50px auto", // Adds 50px margin to the top and centers horizontally
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#f9f9f9",
};

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mapKey, setMapKey] = useState(0);

  const fetchWeatherData = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(currentWeatherResponse.data);
      console.log(currentWeatherResponse);

      setMapKey(mapKey + 1);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      setForecast(
        forecastResponse.data.list.filter((_, index) => index % 8 === 0)
      );
      console.log(forecastResponse);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []); // Update when city changes

  return (
    <div>
      <h1>The Weather Tracker Company</h1>
      <div>
        <input
          type="text"
          placeholder="Enter name of the city"
          value={city}
          onChange={(e) => setCity(e.target.value)}

        />{" "}
        <button onClick={fetchWeatherData}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div style={containerStyle}>
          <h2>Current Weather in {weather.name}</h2>
          <h4>Coordinates: {weather.coord.lat}, {weather.coord.lon}</h4>          
                <h2>Map</h2>
                <MapContainer key={mapKey} center={[weather.coord.lat, weather.coord.lon]} zoom={12} scrollWheelZoom={true} style={{ height: "500px", width: "100%" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[weather.coord.lat, weather.coord.lon]}>
                    <Tooltip>{city}</Tooltip>
                  </Marker>
                </MapContainer>
          
          <p>
            Current Temperature:{" "}
            <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
              {" "}
              {weather.main.temp},
            </span>
            °C 
          </p>
          <p>
            Feels Like:{" "}
            <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
              {" "}
              {weather.main.feels_like},
            </span>
            °C 
          </p>
          <p>
            Humidity:{" "}
            <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
              {" "}
              {weather.main.humidity},
            </span>
            % 
          </p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
      {forecast.length > 0 && (
        <div style={containerStyle}>
          <h2>5-Day Forecast</h2>
          {forecast.map((day, index) => (
            <div key={index}>
              <p>Date: {new Date(day.dt_txt).toLocaleDateString()}</p>
              <p>
                Temp:<b>{day.main.temp}</b> °C
              </p>
              <p>Condition: {day.weather[0].description}</p>
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
