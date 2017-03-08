
$(document).ready(function() {


  var city, state;
  var unitLabel = "°F";
  var now = new Date();
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var index = now.getDay()
  var day = days[index];
  getArea();

  function getArea() {
    $.getJSON("http://ipinfo.io", function(location) {

      city = location.city.replace(/ /g,"_");;
      state = location.region.replace(/ /g,"_");;
      getWeekday(city, state);
    });
  }

  function getWeekday(city, state) {
    var count = 0;
    target = $('.day').first();
    for (var i = 0; i<7; i++){
      target.append(days[(index+count)%7]);
      target = target.next();
      count++;
    }

    var weather ='http://api.wunderground.com/api/ae54c990add28add/forecast10day/q/'+state+'/'+city+'.json';

    $.getJSON(weather, function(weather) {

      var number = 0;
      target = $('.day').first();
      for (var j = 0; j<7; j++){

        var temperature;
        var icon = weather.forecast.txt_forecast.forecastday[number].icon_url;
        var weat = weather.forecast.txt_forecast.forecastday[number].fcttext
        target.append("<br><img src='"+icon+"'>");
        target.append("<br>"+weat);
        number +=2;
        
        var forecastString = weat.split(" ");
        for(var i = 0; i<forecastString.length; i++){
          if (forecastString[i] == "Low" || forecastString[i] == "High"|| forecastString[i] == "upper"){
            if (forecastString[i+1]!="near"){
              temperature = forecastString[i+1];
            }
            else{
              temperature = forecastString[i+2];
            }
          }
        }
        temperature = parseInt(temperature, 10);
        target.append("<br><br><br>");
        if (temperature<30){
          target.append("Winter jacket, scarf, long boots, thick leggings, hat and gloves");
        }
        else if (temperature < 40){
          target.append("Winter jacket, scarf, warm pants, boots")
        }
        else if (temperature < 50){
          target.append("Heavy jacket, jeans")
        }
        else if (temperature < 55){
          target.append("Layer up! Heavy jacket with t-shirt on inside, jeans")
        }
        else if (temperature < 60){
          target.append("Heavy sweatshirt or a thick sweater, jeans")
        }
        else if (temperature < 70){
          target.append("Knit sweater")
        }
        else if (temperature < 75){
          target.append("Light sweater, jacket, or cardigan.")
        }
        else if (temperature < 80){
          target.append("Long sleeved top")
        }
        else if (temperature < 90){
          target.append("t-shirt and shorts, dress")
        }
        else{
          target.append("Breezy clothes - flowy tee, dress, skirt, shorts")
        }
      
        
        

        target = target.next();

        

      }       

    });
    
    
    
    

  };

});