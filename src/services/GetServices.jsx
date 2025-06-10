// src/services/GetServices.jsx

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchWeatherData = async (location) => {
  try {
    const response = await fetch(`${API_BASE_URL}?key=${API_KEY}&q=${location}&aqi=no`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export default fetchWeatherData;
