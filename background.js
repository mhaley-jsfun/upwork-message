'use strict'
console.log('===== background.js =====')

var http = new XMLHttpRequest()
var url = 'https://upworknotify.herokuapp.com/upwork'
http.open('POST', url, true);
//Send the proper header information along with the request
http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        // alert(http.responseText);
    }
}

chrome.extension.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    console.log('msg: ', msg)
    switch (msg.txt) {
      case '@upworkNewMessage':
        var params;
        if (msg.content) {
          params = 'flag=yes'
        } else {
          params = 'flag=no'
        }
        http.open('POST', url, true);
        http.send(params);
        break
    }
  })
})
