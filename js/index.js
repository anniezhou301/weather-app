
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
  var tshirt = ["Dark blue", "Flowery", "White (F21)", "Black", "Cat Videos", "White (No B)", "Pink Patterned", 
  "Dark Red Lace Top", "Peach", "Neon Blue", "GOT", "A&F Grey"]; 
  var jackets = ["Pink", "Blue", "Smooth Grey Cardigan", "Knit Grey Cardigan", "Navy/White Cardigan", "Grey Hoodie",
  "Leather with soft arms", "Green and White Sweater", "Black Sweater"];
  var bottoms = ["Thick Leggings", "Thick Leggings", "No Boundaries Jeans"];
  var warmbottom = ["Holey Jeans", "Thin Leggings Costco", "Thin Leggings F21"]
  var longshirts = ["Pink Raglan", "Black Gilly", "Red and White", "Peach", "A&F Grey With Holey Sleeves", "Red Flannel"];
  var summery = ["Black Romper", "White Flowers", "Blue", "Flowy Pink", "Roses", "Strapless Blue", "Grey", "Eyelet Red Romper",
  " Black/Orange", "Grey", "Long Black with Flowers"];
  var breezy = ["Tan Tank", "Red Lace Tank", "Dark Red Straps", "Lush Top", "Brown Flower Top", "Brown Collar Top", "Pink Tank", "Orange Tank"];
  var shorts = ["Pink", "Purple", "Faded Blue", "America", "A&E Cutoffs", "Black", "Lacey Pink", "Lace on Bottoms",
  "Khaki", "Aero Black", "Rue 21 Lace", "Smooth Denim w/ Lace"];

  getArea();
  function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function getArea() {
    $.getJSON("http://ipinfo.io", function(location) {

      city = location.city.replace(/ /g,"_");;
      state = location.region.replace(/ /g,"_");;
      getWeekday(city, state);
    });
  }

  function hoverDesc(element){
    $.getJSON(weather, function(weather) {
      var weat = weather.forecast.txt_forecast.forecastday[element].fcttext;
    });
  }
  function getWeekday(city, state) {
    var count = 1;
    target = $('.day').first();
    descTarget = $('.desc').first();
    for (var i = 0; i<7; i++){
      target.append("<div class='weekday'>" + days[(index+count)%7].substring(0,3)+"</div>");
      target = target.next();
      count++;
    }
    var weather ='http://api.wunderground.com/api/ae54c990add28add/forecast10day/q/'+state+'/'+city+'.json';
console.log(weather)
    $.getJSON(weather, function(weather) {

      var otherCount = 1;
      target = $('.day').first();
      for (var j = 0; j<7; j++){

        var temperature;
        var icon = weather.forecast.simpleforecast.forecastday[otherCount].icon_url;

        var tempHigh = weather.forecast.simpleforecast.forecastday[otherCount].high.fahrenheit;
        var tempLow = weather.forecast.simpleforecast.forecastday[otherCount].low.fahrenheit;

        target.append("<div class='icon'><img src='"+icon+"'>");
        target.append("<br><div class='high'>"+tempHigh+" "+unitLabel+"</div>");
        
        target.append("<div class='low'>"+tempLow+" "+unitLabel+"</div>");

        var temperature = (Number(tempHigh) *2 + Number(tempLow))/3;

        otherCount++;
        console.log(icon);
        if (temperature < 40){
          var tindex = getRand(0,tshirt.length -1);
        var shirt = tshirt[tindex];
          tshirt.splice(tindex, 1);
          target.append("<div class='clothes'>Inner: " + shirt+ "</div>");
          
          var jindex = getRand(0,jackets.length -1)
          var jacket = jackets[jindex];
          jackets.splice(jindex,1);
          target.append("<div class='clothes'>Outer: " + jacket+ "</div>");
          

          var bottom = bottoms[getRand(1,bottoms.length -1)];
          target.append("<div class='clothes'>Bottom: " + bottom+ "</div>");
        }
        else if (temperature < 50){
          var tindex = getRand(0,tshirt.length -1);
        var shirt = tshirt[tindex];
          tshirt.splice(tindex, 1);
          target.append("<div class='clothes'>Inner: " + shirt+ "</div>");
          
          var jindex = getRand(0,jackets.length -1)
          var jacket = jackets[jindex];
          jackets.splice(jindex,1);
          target.append("<div class='clothes'>Outer: " + jacket+ "</div>");
          

          var bottom = bottoms[getRand(1,bottoms.length -1)];
          target.append("<div class='clothes'>Bottom: " + bottom+ "</div>");
        }
        else if (temperature < 60){
var tindex = getRand(0,tshirt.length -1);
        var shirt = tshirt[tindex];
          tshirt.splice(tindex, 1);
          target.append("<div class='clothes'>Inner: " + shirt+ "</div>");
          
          var jindex = getRand(0,jackets.length -1)
          var jacket = jackets[jindex];
          jackets.splice(jindex,1);
          target.append("<div class='clothes'>Outer: " + jacket+ "</div>");
          

          var wbottom = warmbottom[getRand(1,warmbottom.length -1)];
          target.append("<div class='clothes'>Bottom: " + wbottom+ "</div>");
        }
        else if (temperature < 70){
          

          var lindex = getRand(0,longshirts.length -1);
        var longShirt = longshirts[lindex];
          longshirts.splice(lindex, 1);
          target.append("<div class='clothes'>Inner: " + longShirt+ "</div>");

          var wbottom = warmbottom[getRand(1,warmbottom.length -1)];
          target.append("<div class='clothes'>Bottom: " + wbottom+ "</div>");
        }
        else if (temperature < 80){
          var tindex = getRand(0,tshirt.length -1);
        var shirt = tshirt[tindex];
          tshirt.splice(tindex, 1);
          target.append("<div class='clothes'>Inner: " + shirt+ "</div>");
          
          
var shindex = getRand(0,shorts.length -1);
          var short = shorts[shindex];
          shorts.splice(shindex,1);
          target.append("<div class='clothes'>Bottom: " + short+ "</div>");
        }
        else if (temperature < 90){
var suindex = getRand(0,summery.length -1);
          var summer = summery[suindex];
          summery.splice(suindex,1);
          target.append("<div class='clothes'>Dress: " + summer+ "</div>");
          
        }
        else{

          var hotindex = getRand(0,breezy.length -1);
          var hot = breezy[hotindex];
          breezy.splice(hotindex,1);
          target.append("<div class='clothes'>Inner: " + hot + "</div>");

var shindex = getRand(0,shorts.length -1);
          var short = shorts[shindex];
          shorts.splice(shindex,1);
          target.append("<div class='clothes'>Bottom: " + short+ "</div>");
        }



        target = target.next();


      }       

    });





};

});