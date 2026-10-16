WEATHER TRACKER (LOCATION-BASED) APPLICATION
IT 110 Midterm Project
============================================================

GROUP NAME AND MEMBERS
------------------------------------------------------------
Group: Individual project (no group)
Member: Ardee Maddox C. Clarito
Role: Solo developer - HTML structure, CSS styling,
      JavaScript API integration, and documentation.


ABOUT THE PROJECT
------------------------------------------------------------
A single-page web application that fetches real-time,
location-based weather data. The user types a city name and
the app shows the current temperature, weather condition,
humidity, and wind speed for that city.

Error handling: the app shows friendly messages for an empty
search, a city that cannot be found, a failed API request, and
no internet connection.


API USED
------------------------------------------------------------
Open-Meteo (free, no API key required)

1. Geocoding API - turns a city name into latitude/longitude
   Documentation: https://open-meteo.com/en/docs/geocoding-api

2. Weather Forecast API - current weather for those coordinates
   Documentation: https://open-meteo.com/en/docs


FILES
------------------------------------------------------------
group.html   Portfolio homepage (title, project overview, profile,
             and a button that launches the app)
app.html     The Weather Tracker application page
styles.css   Styles for the portfolio page
styles1.css  Styles for the weather app page
script.js    JavaScript: API calls, error handling, and updating
             the page with the results
rain.gif     Background image used by both pages
placeholder.jpg  Profile photo shown on the portfolio page


HOW TO RUN
------------------------------------------------------------
No installation or API key is needed.

1. Keep all files together in the same folder.
2. Open group.html in a web browser (Chrome, Edge, Firefox).
3. Click "Launch Weather Tracker App".
4. Type a city name (for example: Iligan) and click
   "Get Weather" or press Enter.

An internet connection is required because the weather data
is fetched live from the Open-Meteo API.
