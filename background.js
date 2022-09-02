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
        if (msg.content) {
          data.append('flag', 'yes');
          data.append('text', msg.content);
        } else {
          data.append('flag', 'no');
          data.append('text', '');
        }

        http.open('POST', url, true);
        http.send(data);
        break
    }
  })
})
