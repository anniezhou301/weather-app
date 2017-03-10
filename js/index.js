
$(document).ready(function() {

navLinks = document.querySelector('.navNarrow');
narrowLinks = document.querySelector('.narrowLinks');

navLinks.addEventListener('click', toggle);

function toggle() {
    narrowLinks.classList.toggle('hidden');
};
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
    var count = 1;
    target = $('.day').first();
    descTarget = $('.desc').first();
    for (var i = 0; i<7; i++){
      target.append("<div class='weekday'>" + days[(index+count)%7]+"</div>");
      target = target.next();
      count++;
    }

    var weather ='http://api.wunderground.com/api/ae54c990add28add/forecast10day/q/'+state+'/'+city+'.json';

    $.getJSON(weather, function(weather) {

      var number = 1;
      var otherCount = 1;
      target = $('.day').first();
      for (var j = 0; j<7; j++){

        var temperature;
        var icon = weather.forecast.txt_forecast.forecastday[number].icon_url;
        var weat = weather.forecast.txt_forecast.forecastday[number].fcttext;

        var temperature = weather.forecast.simpleforecast.forecastday[otherCount].high.fahrenheit;
        var tempLow = weather.forecast.simpleforecast.forecastday[otherCount].low.fahrenheit;

        target.append("<div class='icon'><img src='"+icon+"'>");
        target.append("<div class='high'>"+temperature+unitLabel+"</div>");
        
        target.append("<div class='low'>"+tempLow+unitLabel+"</div>");


        
        number +=2;
        otherCount++;
if (temperature<30){
          target.append("<div class='clothes'>Winter jacket, scarf, long boots, thick leggings, hat and gloves</div>");
        }
        else if (temperature < 40){
          target.append("<div class='clothes'>Winter jacket, scarf, warm pants, boots")
        }
        else if (temperature < 50){
          target.append("<div class='clothes'>Heavy jacket, jeans")
        }
        else if (temperature < 55){
          target.append("<div class='clothes'>Layer up! Heavy jacket with t-shirt on inside, jeans")
        }
        else if (temperature < 60){
          target.append("<div class='clothes'>Heavy sweatshirt or a thick sweater, jeans")
        }
        else if (temperature < 70){
          target.append("<div class='clothes'>Knit sweater")
        }
        else if (temperature < 75){
          target.append("<div class='clothes'>Light sweater, jacket, or cardigan.")
        }
        else if (temperature < 80){
          target.append("<div class='clothes'>Long sleeved top")
        }
        else if (temperature < 90){
          target.append("<div class='clothes'>t-shirt and shorts, dress")
        }
        else{
          target.append("<div class='clothes'>Breezy clothes - flowy tee, dress, skirt, shorts")
        
        }
      
        
        descTarget.append("<div class='tempDesc'>"+weat+"</div>");

        target = target.next();
        descTarget = descTarget.next();
        

      }       

    });
    
    
    
    

  };

});