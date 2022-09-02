'use strict'
console.log('===== background.js =====')

var http = new XMLHttpRequest()
var url = 'https://upworknotify.herokuapp.com/upwork';

chrome.extension.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    switch (msg.txt) {
      case '@upworkNewMessage':
        var data = new FormData();
        let json;
        if (msg.content) {
          json = JSON.stringify({
            flag: "yes",
            text: msg.content
          });
        } else {
          json = JSON.stringify({
            flag: "no",
            text: ''
          });
        }

        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        http.send(json);
        break
    }
  })
})
