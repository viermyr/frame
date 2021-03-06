jQuery(document).ready(function($) {
    var getWeatherInfo = function(city){
        /// call your function here
        $.ajax({
            url: "http://api.wunderground.com/api/72262bdafda1bf6a/geolookup/conditions/forecast/q/Norway/"+city+".json",
            dataType: "jsonp",
            success: function (parsed_json) {

                // TODAYS WEATHER ********************************
                // Location of the person
                var location = parsed_json['location']['city'];
                console.log(location);
                // document.getElementById('wCity').innerHTML = location;

                // The current temperature @ location
                var temp_f = parsed_json['current_observation']['temp_f'];
                console.log(temp_f);

                // Convert temperature from Fahrenheit to Celsius
                var celsius = (temp_f - 32) * (5 / 9);
                console.log(celsius);
                celsius = celsius.toFixed(1);   // Only get 1 didget
                console.log(celsius);
                document.getElementById('wOutsideTemp').innerHTML = celsius.toString();
                /*
                 // The weather report
                 var weatherReport = parsed_json["forecast"]["simpleforecast"]['forecastday'][0]["conditions"];
                 console.log(weatherReport);
                 document.getElementById('w-description').innerHTML = weatherReport;
                 */

                // Icon for illustration


                // TOMORROWS WEATHER
                // The day of the week (short)
                var forecastDayPlus1 = {};
                var jsonPath = parsed_json["forecast"]["simpleforecast"]["forecastday"];

                forecastDayPlus1.shortTxt = jsonPath[1]["date"]["weekday_short"];
                console.log(forecastDayPlus1.shortTxt);
                document.getElementById('day1-txt').innerHTML = forecastDayPlus1.shortTxt;

                // Degrees
                forecastDayPlus1.maxTemp = jsonPath[1]["high"]["celsius"];
                forecastDayPlus1.minTemp = jsonPath[1]["low"]["celsius"];
                forecastDayPlus1.avgTemp = (parseInt(forecastDayPlus1.maxTemp) + parseInt(forecastDayPlus1.minTemp)) / 2;
                console.log(forecastDayPlus1.minTemp + " " + forecastDayPlus1.maxTemp + " " + forecastDayPlus1.avgTemp);
                document.getElementById('day1-degrees').innerHTML = forecastDayPlus1.avgTemp;

                // Decide icon!


                // THE DAY AFTER TOMORROW
                // The day of the week (short)
                var forecastDayPlus2 = {};

                forecastDayPlus2.shortTxt = jsonPath[2]["date"]["weekday_short"];
                console.log(forecastDayPlus2.shortTxt);
                document.getElementById('day2-txt').innerHTML = forecastDayPlus2.shortTxt;

                // Degrees
                forecastDayPlus2.maxTemp = jsonPath[2]["high"]["celsius"];
                forecastDayPlus2.minTemp = jsonPath[2]["low"]["celsius"];
                forecastDayPlus2.avgTemp = (parseInt(forecastDayPlus2.maxTemp) + parseInt(forecastDayPlus2.minTemp)) / 2;
                console.log(forecastDayPlus2.minTemp + " " + forecastDayPlus2.maxTemp + " " + forecastDayPlus2.avgTemp);
                document.getElementById('day2-degrees').innerHTML = forecastDayPlus2.avgTemp;

                // Decide icon!

                // THREE DAYS INTO THE FUTURE
                // The day of the week (short)
                var forecastDayPlus3 = {};

                forecastDayPlus3.shortTxt = jsonPath[3]["date"]["weekday_short"];
                console.log(forecastDayPlus3.shortTxt);
                document.getElementById('day3-txt').innerHTML = forecastDayPlus3.shortTxt;

                // Degrees
                forecastDayPlus3.maxTemp = jsonPath[3]["high"]["celsius"];
                forecastDayPlus3.minTemp = jsonPath[3]["low"]["celsius"];
                forecastDayPlus3.avgTemp = (parseInt(forecastDayPlus3.maxTemp) + parseInt(forecastDayPlus3.minTemp)) / 2;
                console.log(forecastDayPlus3.minTemp + " " + forecastDayPlus3.maxTemp + " " + forecastDayPlus3.avgTemp);
                document.getElementById('day3-degrees').innerHTML = forecastDayPlus3.avgTemp;

                // Decide icon!

                // ICON TESTING
                var theIcons = [
                    "/images/clear.gif", "/images/mostlycloudy.gif", "/images/partlycloudy.gif",
                    "/images/cloudy.gif", "/images/rain.gif", "/images/rain.gif", "/images/tstorm", "/images/snow.gif"
                ];

                var iconStates = ["clear", "mostlycloudy", "partlycloudy", "cloudy", "chancerain", "rain",
                    "tstorm", "snow", "mostlysunny", "/images/mostlycloudy.gif"];


                console.log(theIcons);

                var todaysIconText = jsonPath[0]["icon"];
                var tomorrowsIconText = jsonPath[1]["icon"];
                var todayPlus2IconText = jsonPath[2]["icon"];
                var todayPlus3IconText = jsonPath[3]["icon"];


                // Array containg the states (not used)
                var iconText = [];
                iconText.push(todaysIconText);
                iconText.push(tomorrowsIconText);
                iconText.push(todayPlus2IconText);
                iconText.push(todayPlus3IconText);

                console.log(iconText);

                for(var i = 0; i < iconStates.length; i++){
                    if(todaysIconText == iconStates[i]){
                        document.getElementById('iconTest').src = theIcons[i];
                        console.log(theIcons[i]);
                    }
                    if(tomorrowsIconText == iconStates[i]){
                        document.getElementById('iconTest1').src = theIcons[i];
                        console.log(theIcons[i]);
                    }
                    if(todayPlus2IconText == iconStates[i]){
                        document.getElementById('iconTest2').src = theIcons[i];
                        console.log(theIcons[i]);
                    }
                    if(todayPlus3IconText == iconStates[i]){
                        document.getElementById('iconTest3').src = theIcons[i];
                        console.log(theIcons[i]);
                    }

                }

            }
        });

        $.ajax({
            url: 'https://unstable.futurehome.no/api/v2/sites/B6088F84-DAB6-420D-B89C-828489DD199A/fragments/xs/',
            contentType: 'application/json',
            dataType: 'jsonp',
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization', 'Bearer mWRuGZZc5U2Q8oHUIixwenL8craSMx14HxIWIkDJ');
            },
            success: function (parsed_json) {
                var data = parsed_json.fragment;

                document.getElementById('wInsideTemp').innerHTML = "200 OK"; //data.site.temperature.inside;
            },
            error: function(err){
                document.getElementById('wInsideTemp').innerHTML = "null";
            }
        });
    };
    var le = document.getElementById("selector");
    var lecity = le.options[le.selectedIndex].value;
    getWeatherInfo(lecity);
    window.setInterval(function(){

        var e = document.getElementById("selector");
        var city = e.options[e.selectedIndex].value;

        console.log(city);
        getWeatherInfo(city);


    }, 250000);
});

