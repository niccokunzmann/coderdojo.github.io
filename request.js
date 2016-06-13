(function(){

  var date = new Date();
  date.setMonth(date.getMonth()-1)
  var base='https://api.github.com/repos/coderdojo/community-platform/issues?';
  var completed=base+'state=closed&since='+date;
  var upcoming=base+'labels=in+progress';

  var getHttpClient = function() {
    this.get = function(url, cb) {
      var httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
          cb(httpRequest.responseText);
      }
      httpRequest.open("GET", url, true);
      httpRequest.send(null);
    }
  }

  client = new getHttpClient();
  client.get(upcoming, function(response) {
    var items = document.getElementById("upcoming");
    var parsed = JSON.parse(response);
    for(var i=0; i<parsed.length; i++){
      var item = document.createElement("li");
      item.innerHTML = '<span class="glyphicon glyphicon-plus-sign blue" aria-hidden="true"></span><a href='+parsed[i].html_url+'>'+parsed[i].title+'</a>';
      items.appendChild(item);
    }
  });

  client.get(completed, function(response){
    var items = document.getElementById("completed");
    var parsed = JSON.parse(response);
    for(var i=0; i<parsed.length; i++){
      var item = document.createElement("li");
      item.innerHTML = '<span class="glyphicon glyphicon-ok-sign green" aria-hidden="true"></span><a href='+parsed[i].html_url+'>'+parsed[i].title+'</a>';
      items.appendChild(item);
    }
  })
})();
