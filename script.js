
document.getElementById("dugme").addEventListener("click", function () {
	document.getElementById("weekdays").innerHTML = "";

	// Api request

	const city = document.getElementById("searchbar").value
	const requestCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6e8fd375562bf0578b68cdbfca4821c3`
	const requestWeekDays = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=6e8fd375562bf0578b68cdbfca4821c3`
	const requestMinMax = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=dc3d0a4225dd4ec8be0102109192404&q=${city}&format=json&num_of_days=3`

	// Weather data for a city
	$.getJSON(requestCity, callbackCity)
	function callbackCity(data) {
		const temp = kToC(data.main.temp)
		const location = data.name
		const description = data.weather[0].description
		const icons = document.getElementById("weathericon")
		const timelocal = dayOfTheWeek(data.dt)
		const wind = data.wind.speed

		document.getElementById("localtime").innerHTML = timelocal
		document.getElementById("locationcity").innerHTML = location
		document.getElementById("temperaturedescription").innerHTML = description
		document.getElementById("temperaturedegree").innerHTML = temp + "°"
		document.getElementById("windspeed").innerText = "Wind" + ":" + " " + wind + "m/s"
	}

	// Forecast weather
	$.getJSON(requestWeekDays, callbackWeek)
	function callbackWeek(data) {
		const outputWeek = document.getElementById("weekdays")
		const inputWeek = data.list
		for (let i = 8; i < data.list.length; i = i + 8) {
			outputWeek.innerHTML += `<div class="box">
            <p class="name-day">${dayOfTheWeek(inputWeek[i].dt)}</p>
            <p class="descriptionweek">${inputWeek[i].weather[0].description}</p>
            </div >`
		}
	}
	// Time format
	function dayOfTheWeek(timestamp) {
		const date = new Date(timestamp * 1000)
		const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
		return week[date.getDay()]
	}
	// Konvertovanje Kelvina u Celzijus
	function kToC(temp) {
		return Math.round(temp - 273)
	}
})
// Izvrsavanje pretrage pritiskom na taster Enter
function keyboardEnter(event) {
	if (event.keyCode === 13) {
		event.preventDefault()
		document.getElementById("dugme").click()
	}
}
document.getElementById("searchbar").addEventListener("keyup", keyboardEnter)
