
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

    // greating
    $greeting.text('Hello, friend from ' + address + '!');

    // background GoogleMap Streetview 
    var streetUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+ address +'&key=AIzaSyCxtITUrS4rJvrccGR_FT4qfJfyDwh8YMA'
    $body.append('<img class = "bgimg" src ="' + streetUrl + '">'); 

    // nyTimes
    // Built by LucyBot. www.lucybot.com
    var nyTimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
   nyTimesUrl += '?' + $.param({
      'api-key': "cf2fe9e6bb3d46b5a708a088d4619f80",
      'q': cityStr
    });
    $.ajax({
      url: nyTimesUrl,
      method: 'GET',
    }).done(function(data) {
        $nytHeaderElem.text('NY Times Articles about ' + cityStr);
      articles = data.response.docs;
        for(var i = 0; i < articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class = "article">'+
                '<a href="' + article.web_url+'">' + article.headline.main + '</a>'+
                '<p>'+ article.snippet + '</p>'+
                '</li>');
        };
    }).error(function(e) {
        $nytHeaderElem.text('NY Times Articles Error');
    });

    // Wikipedia
    var wikiRequestTimeout = setTimeout(function () {
        $wikiElem.text('Timeout To Get Wikipedia');
    },8000);
    var wikiUrl = 'https://en.wikipedia.org//w/api.php?action=opensearch&format=json&search='+
    cityStr +'&callback=wikiCallback';
    $.ajax({
      url: wikiUrl,
       dataType: "jsonp",
       }).done(function (response) {
            var articleList = response[1];
           for(var i = 0; i < articleList.length; i++){
              var articleName = articleList[i];
              var url = 'http://en.wikipedia.org/wiki' + articleName;
              $wikiElem.append('<li><a href="' + url + '">' + articleName + '</a></li>');
            };
            clearTimeout(wikiRequestTimeout);
        }).error(function(e) {
            $wikiElem.text('Failed To Get Wikipedia');
        });
    return false;
};

$('#form-container').submit(loadData);
