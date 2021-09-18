// onload
window.addEventListener("load",()=>{
    let lat;
    let long;
    let temperatureDegree = document.getElementById("degree");
    let temperatureDescription = document.getElementById("temperature-description");
    let locationTimezone = document.getElementById("location-timezone");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=> {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&appid=0060f3ef95bed731ec4f633ed5beaa5e`;

            fetch(api).then((data) =>{
                return data.json();
            }).then((parsedData) => {
                console.log(parsedData);
                const temperature = Math.round(parsedData.current.temp-273);
                const {description,icon} = parsedData.current.weather[0];
                
                // change the content according to user location
                setBackGroundImage(description);
                temperatureDegree.innerHTML = temperature;
                temperatureDescription.innerHTML = description;
                var timezone = parsedData.timezone;
                displayTimezone(timezone);
                showIcon(icon);
            });

        });
        
    }
    function setBackGroundImage(description){
        let bgUrl;

        if(description.includes("rain")){
            bgUrl = "url(resources/bg1.jpg)";
        }
        else if(description.includes("cloud")){
            bgUrl = "url(resources/overcast.jpg)";
        }
        else{
            bgUrl = "url(resources/clearsky.jpg)";
        }
        document.getElementById("main").style.setProperty("--background-url",bgUrl);
    }
    function displayTimezone(timezone){
        document.getElementById("location-timezone").innerHTML = timezone;
    }
    function showIcon(icon){
        let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
         document.getElementById("icon").setAttribute("src",iconUrl);
    }
    
});