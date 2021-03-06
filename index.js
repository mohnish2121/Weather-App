// onload
// window.addEventListener("load",()=>{

    // let lat;
    // let long;
    // let temperatureDegree = document.getElementById("degree");
    // let temperatureDescription = document.getElementById("temperature-description");
    // let locationTimezone = document.getElementById("location-timezone");

    // if(navigator.geolocation){
    //     navigator.geolocation.getCurrentPosition((position)=> {
    //         lat = position.coords.latitude;
    //         long = position.coords.longitude;
    //         let mykey = config.MY_KEY;
            
    //         // api for getting data about the weather
    //         const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&appid=${mykey}`;


    //         fetch(api).then((data) =>{
    //             return data.json();
    //         }).then((parsedData) => {
    //             const temperature = (parsedData.current.temp-273).toFixed(2);
    //             const {description,icon} = parsedData.current.weather[0];
                
    //             // change the content according to user location
    //             setBackGroundImage(description);
    //             temperatureDegree.innerHTML = temperature;
    //             temperatureDescription.innerHTML = description;
    //             var timezone = parsedData.timezone;
    //             displayTimezone(timezone);
    //             showIcon(icon);
    //         });

           

    //     });
        
    // }
    // function setBackGroundImage(description){
    //     let bgUrl;

    //     if(description.includes("rain")){
    //         bgUrl = "url(resources/bg1.jpg)";
    //     }
    //     else if(description.includes("cloud")){
    //         bgUrl = "url(resources/overcast.jpg)";
    //     }
    //     else{
    //         bgUrl = "url(resources/clearsky.jpg)";
    //     }
    //     document.getElementById("main").style.setProperty("--background-url",bgUrl);
    // }
    // function displayTimezone(timezone){
    //     document.getElementById("location-timezone").innerHTML = timezone;
    // }
    // function showIcon(icon){
    //     let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
    //      document.getElementById("icon").setAttribute("src",iconUrl);
    // }
    
// });
let clickevent = document.getElementById("submit-btn");

clickevent.addEventListener("click", ()=> {
    let cityname = document.getElementById("input").value;
 
    const mykey = '0060f3ef95bed731ec4f633ed5beaa5e';
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${mykey}`;
    
    fetch(api).then((data) => {
        return data.json();
    }).then((parsedData) => {
        console.log(parsedData);
        // extracting values
        let cityname =parsedData.name;
        let temp = (parsedData.main.temp-273).toFixed(2);
        let country = parsedData.sys.country;
        let {description,icon} = parsedData.weather[0];

        // display all fetch values
        displayCity(cityname);
        displayTemp(temp);
        displayCountry(country);
        displayDescription(description);
        displayIcon(icon);
        setBackGroundImage(description);

    }); 
    function displayCity(city){
        document.getElementById("city").innerHTML = city;
    }
    function displayTemp(temp){
        document.getElementById("degree").innerHTML = temp;
    }
    function displayCountry(country){
        document.getElementById("location-timezone").innerHTML = country;
    }
    function displayDescription(desc){
        document.getElementById("temperature-description").innerHTML = desc;
    }
    function displayIcon(icon){
        let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
        document.getElementById("icon").src = iconUrl;
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

});
//triger the button click event by enter key press
let searchbar = document.getElementById("input");
searchbar.addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        clickevent.click();
    }
});

// slide news section on clickevent
let newsbutton = document.getElementById("news-toggle-button");
newsbutton.addEventListener("click", () => {
    let newsAnimationVariable = document.getElementById("news-section").style;
    if (newsAnimationVariable.getPropertyValue("--newsin") == "none" || newsAnimationVariable.getPropertyValue("--newsin") == "newSliderOut" ||  newsAnimationVariable.getPropertyValue("--newsin") == ""){
       newsAnimationVariable.setProperty("--newsin","newSliderIn");
       newsAnimationVariable.left = "0";
       
    }
    else{
        newsAnimationVariable.setProperty("--newsin","newSliderOut");
        newsAnimationVariable.left = "-300px";
    }
    // fetching news and pushing in the news section
    newsapiCall();
});

// fetching news and pushing in the news section
function newsapiCall(){
    const newsKey = '2d381cb35897a0170f400009211b1324';
    const newsapi =  `http://api.mediastack.com/v1/news?access_key=${newsKey}&countries=in&keywords=corona`;
    
    fetch(newsapi).then((data) =>{
        return data.json();
    }).then((parsedData) =>{
        console.log(parsedData);
        let totalresults = parsedData.pagination.total;
        console.log(totalresults);
        for(let i = 0;i<totalresults;i++){
            let image = parsedData.data[i].image;
            let title = parsedData.data[i].title;
            pushNews(image,title);
        }
    });
}
function pushNews(image,title){
    let container = document.getElementById("news");

    let newsCardDiv = document.createElement("div");
    if(image != null){
        let imageEle = document.createElement("img");
        imageEle.setAttribute("src",image);
        imageEle.setAttribute("width","100%");
        newsCardDiv.append(imageEle);
    }

    let titleEle = document.createElement("p");
    titleEle.innerHTML = title;
    newsCardDiv.style.padding = "2rem 0";
    newsCardDiv.style.border = "1px solid white";
    newsCardDiv.style.borderRadius = "5px";
    newsCardDiv.append(titleEle);

    container.append(newsCardDiv);
    
}
