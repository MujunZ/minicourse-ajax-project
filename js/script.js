
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('Hello, friend from ' + address + '!');

    var streetUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+ address +'&key=AIzaSyCxtITUrS4rJvrccGR_FT4qfJfyDwh8YMA'
    $body.append('<img class = "bgimg" src ="' + streetUrl + '">'); 

    return false;
};

$('#form-container').submit(loadData);
