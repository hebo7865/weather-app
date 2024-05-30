
const apiUrl = "https:\/\/api.openweathermap.org/data/2.5/forecast?q="
const apiKey = "&appid=215be45aaa2fa554f9e3098bc075f8fa"
const searchBtn = document.getElementById("searchBtn");
const description = document.getElementById("description");
const cityName = document.getElementById("cityName");

var minTempreture = [];
var maxTempreture = [];
var currentTempreture = [];
var days = [];
var data = [];

searchBtn.addEventListener('click', ()=>{
    getWeather();
})


async function getWeather(){

    const response = await fetch(apiUrl + `${cityName.value}` + `${apiKey}` + "&units=metric");
    data = await response.json();

    JSON.stringify(data)

    currentTempreture.push(data.list[0])


    for(var i = 0; i < data.list.length;i++){
        if(data.list[i].dt_txt.includes("00:00:00")){
            minTempreture.push(data.list[i]);

        }
        else if(data.list[i].dt_txt.includes("12:00:00")){
            maxTempreture.push(data.list[i])
        }
    }

    for(var i = 0; i < minTempreture.length; i++)
        {
            var allDays= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var d = new Date(minTempreture[i].dt * 1000);
            var dayName = allDays[d.getDay()];
            days.push(dayName)
        }

    displayTodayWeather();
    displayWeekWeather();
    clearVars();
    clearInput();
}

function clearInput(){
    cityName.value = null
}

function clearVars(){
    minTempreture = [];
    maxTempreture = [];
    currentTempreture = [];
    days = [];
}


function weahterIcon(day){
    if(day[0].weather[0].description.includes('clear')){
        img = "images/clear.png";
    }
    else if(day[0].weather[0].description.includes('rain')){
        img = "images/rain.png";
    }
    else if(day[0].weather[0].description.includes('cloud')){
        img = "images/clouds.png";
    }
    else if(day[0].weather[0].description.includes('drizzle')){
        img = "images/drizzle.png";
    }
    else if(day[0].weather[0].description.includes('mist')){
        img = "images/mist.png";
    }
    else if(day[0].weather[0].description.includes('snow')){
        img = "images/snow.png";
    }

}


function displayTodayWeather(){

    weahterIcon(currentTempreture)

    var temp = `
    <div class= "text-center d-flex flex-column justify-content-between align-items-center">
        <div class="temp-img w-25">
            <img class="w-100" src="${img}" alt="${currentTempreture[0].weather[0].description}">
        </div>
        <h1 class="temp m-0">${Math.round(currentTempreture[0].main.temp)}<span>&deg;c</span></h1>
        <h3 class="city-info text-capitalize m-0">${cityName.value}</h3>
        <h6>${days[0]}</h6>
    </div>
    `
    var descr = `
    <div class="description">
        <h5>description: </h5>
        <h6 id="description">${currentTempreture[0].weather[0].description}</h6>
    </div>


    <div class="wind">
        <h5>wind speed: </h5>
        <h6 id="windSpeed">${currentTempreture[0].wind.speed}km/h</h6>
    </div>
                                

    <div class="humidity">
        <h5>humidity: </h5>
        <h6 id="humidity">${currentTempreture[0].main.humidity}%</h6>
    </div>
    `

    const todayTemp = document.getElementById("todayTemp").innerHTML = temp;
    description.innerHTML = descr;
}

function displayWeekWeather(){

    weahterIcon(minTempreture)

    var item = ''

    for(var i = 1; i < minTempreture.length; i++){
        item += `
        <div class="col-lg-3 col-md-6 text-center p-2">

            <div class="item-img">
                <img class="w-50" src="${img}" alt="${maxTempreture[i].weather[0].description}">
            </div>

            <div class="item-description">
                <h6>${days[i]}</h6>
                <p>Min Temp: ${Math.round(minTempreture[i].main.temp_min)}<span>&deg;c</span></p>
                <p>Max Temp ${Math.round(maxTempreture[i].main.temp_max)}<span>&deg;c</span></p>
            </div>
                        
        </div>
        `
    }

    document.getElementById("week").innerHTML = item

}