document.addEventListener("DOMContentLoaded", function() {
    const searchBar = document.getElementById("searchBar");
    const weatherContainer = document.getElementById("weatherContainer");

    // Centrar la barra de búsqueda en la mitad de la pantalla
    searchBar.style.top = "40%";
    searchBar.style.transform = "translateY(-50%)";
    searchBar.style.left = "50%";
    searchBar.style.transform += "translateX(-50%)";

    // Ocultar el contenedor de clima
    weatherContainer.style.display = "none";
});

function buscarClima() {
    const ciudad = document.getElementById('cityInput').value;
    if (ciudad) {
        const apiKey = '96cf0172202e4b5f875154310242104'; // Coloca tu API key de WeatherAPI.com
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciudad}&days=3`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const currentWeather = data.current;
                const forecast = data.forecast.forecastday.slice(0, 3); // Obtener pronóstico de los últimos 3 días

                // Mostrar el clima actual
                const weatherResult = document.getElementById('weatherResult');
                weatherResult.innerHTML = `
                    <h2>Clima en ${ciudad}</h2>
                    <p>Temperatura actual: ${currentWeather.temp_c}°C</p>
                    <p>Condiciones actuales: ${currentWeather.condition.text}</p>
                `;

                // Mostrar el pronóstico para los próximos 3 días
                weatherResult.innerHTML += '<h3>Pronóstico para los próximos 3 días:</h3>';
                forecast.forEach(day => {
                    weatherResult.innerHTML += `
                        <table class="forecast-table">
                            <tr>
                                <th>Fecha</th>
                                <th>Máxima</th>
                                <th>Mínima</th>
                                <th>Condiciones</th>
                            </tr>
                            <tr>
                                <td>${day.date}</td>
                                <td>${day.day.maxtemp_c}°C</td>
                                <td>${day.day.mintemp_c}°C</td>
                                <td>${day.day.condition.text}</td>
                            </tr>
                        </table>
                    `;
                });

                // Mostrar el contenedor de clima y mantener la barra de búsqueda en la parte superior
                const searchBar = document.getElementById("searchBar");
                const weatherContainer = document.getElementById("weatherContainer");
                searchBar.style.top = "20px"; // Posicionar la barra de búsqueda a 20px del borde superior
                searchBar.style.transform = "translateY(0)";
                searchBar.style.left = "50%";
                searchBar.style.transform += "translateX(-50%)";
                weatherContainer.style.display = "flex";
            })
            .catch(error => {
                console.error('Error al obtener el clima:', error);
                const weatherResult = document.getElementById('weatherResult');
                weatherResult.innerHTML = '<p>Ocurrió un error al obtener el clima. Por favor, intenta nuevamente.</p>';
            });
    } else {
        alert('Por favor, introduce una ciudad.');
    }
}



function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Mostrar u ocultar el overlay oscuro dependiendo del modo
    const darkModeOverlay = document.getElementById('darkModeOverlay');
    darkModeOverlay.style.opacity = body.classList.contains('dark-mode') ? '0.5' : '0';
}