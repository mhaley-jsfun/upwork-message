'use strict'
console.log('===== background.js =====')

var http = new XMLHttpRequest()
var url = 'https://upworknotify.herokuapp.com/upwork';

chrome.extension.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    console.log('msg: ', msg)
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
        http.setRequestHeader("Content-Type", "text/plain");
        http.send("--aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        break
    }
  })
})
