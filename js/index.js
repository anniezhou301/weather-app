
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
    var count = 1;
    target = $('.day').first();
    for (var i = 0; i<6; i++){
      target.append(days[(index+count)%7]);
      target = target.next();
      count++;
    }
    
    var weather= 'http://api.wunderground.com/api/ae54c990add28add/conditions/q/'+state+'/'+city+'.json';
    
    var forecast ='http://api.wunderground.com/api/ae54c990add28add/forecast10day/q/'+state+'/'+city+'.json';
    $.getJSON(weather, function(weather) {
      var temperature = weather.version;
      console.log(temperature)
      $('#icon').append("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>");

      $('#temp').append(temperature.toFixed(0) + " " + unitLabel);

      $('#conditions').append(weather.weather[0].description);
      

    });
    $.getJSON(forecast, function(forecast) {
      var dates = [];
      for(x in forecast.list){
        var date = forecast.list[x].dt_txt;
        dates.push(date.substring(0,10));
      }
      var uniqueDates = [];
      $.each(dates, function(i, el){
        if($.inArray(el, uniqueDates) === -1) uniqueDates.push(el);
      });
      var index = 0;
      var target = $('.day').first();
      for (var i = 0; i<6; i++){
        target.append('<br>'+uniqueDates[index]);
        index++;
        target = target.next();
      }  

      var number = 0;
      target = $('.day').first();
      
      for (var i = 0; i<6; i++){
        target.append("<br><img src='http://openweathermap.org/img/w/" + forecast.list[number].weather[0].icon + ".png'>");
        target.append("<br>"+forecast.list[number].weather[0].description);
        var high = forecast.list[number].main.temp.toFixed(0);
        target.append("<br> 9AM: "+ high + unitLabel);
        number = number + 3
        var low = forecast.list[number].main.temp.toFixed(0);
        target.append("<br> 3PM: "+ low + unitLabel);
        number=number +5;
        target.append("<br>");
        if (high<40){
          target.append("Wear a sweater!");
        }
        else if (high < 50){
          target.append("Light jacket.")
        }
        else if (high<70){
          target.append("t-shirt and light leggings");
        }
        else{
          target.append("Dress!");
        }
        target = target.next();

        

      }       

    });
    
    
    
    

  };

});