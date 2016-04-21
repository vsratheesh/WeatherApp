$(document).ready(function () {
  $('#result').hide();
  $('#current').click(function () {
    // Clear all old data
    $('tbody>tr').remove();
    var cityName = $('#input1').val();
    // console.log(cityName);
    var weatherStr = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=bc1b6968884b3366859f9679983dc947';
    $.ajax({
      url: weatherStr,
      error: function () {},
      success: function (data) {
        var date = new Date(data.dt * 1000);
        var dateStr = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        var temparature = Math.round(data.main.temp - 273.5, 2);
        var humidity = data.main.humidity;
        var weather = data.weather[0].description;
        $('#textInfo').text('Current Weather for city ' + cityName + ',' + data.sys.country);
        var innerHtml = '<tr><td>' + dateStr + '</td><td>' + temparature + '</td><td>' + humidity + '</td><td>' + weather + '</td></tr>';
        $('tbody').append(innerHtml);
        $('#result').show();
      },
    });
  });
  $('#forecast').click(function () {
    // Clear all old data
    $('tbody>tr').remove();
    var cityName = $('#input1').val();
    // console.log(cityName);
    var forecastStr = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=bc1b6968884b3366859f9679983dc947';
    $.ajax({
      url: forecastStr,
      error: function () {},
      success: function (data) {
        var innerHtml = "";
        $('#textInfo').text('Forecast for 5 days for city ' + cityName + ',' + data.city.country);
        data.list.forEach(function (e) {
          var date = new Date(e.dt * 1000);
          var dateStr = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
          var timeStr = date.getHours() + ':' + date.getMinutes();
          var temparature = Math.round(e.main.temp - 273.5, 2);
          var humidity = e.main.humidity;
          var weather = e.weather[0].description;
          innerHtml += '<tr><td>' + dateStr + ' - ' + timeStr + '</td><td>' + temparature + '</td><td>' + humidity + '</td><td>' + weather + '</td></tr>';
        });
        $('tbody').append(innerHtml);
        $('#result').show();
      },
    });
  });
});
