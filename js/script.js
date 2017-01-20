
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // define address
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    //greating
    $greeting.text('Hello, friend from ' + address + '!');

    // background GoogleMap Streetview 
    var streetUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+ address +'&key=AIzaSyCxtITUrS4rJvrccGR_FT4qfJfyDwh8YMA'
    $body.append('<img class = "bgimg" src ="' + streetUrl + '">'); 

    // nyTimes
    // Built by LucyBot. www.lucybot.com
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "cf2fe9e6bb3d46b5a708a088d4619f80",
      'q': cityStr
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      var articles = result.response.docs;
      for(var i = 0; i < articles.length; i++){
         var article = articles[i];
         $nytElem.append('<li class = "article"><a href = "'+
            article.web_url + '">' +
            article.headline.main + '</a><p>' +
            article.snippet + '</p>');
      }
    }).fail(function(err) {
      throw err;
    });

    return false;
};

$('#form-container').submit(loadData);
