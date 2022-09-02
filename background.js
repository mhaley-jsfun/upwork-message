'use strict'
console.log('===== background.js =====')



var http = new XMLHttpRequest()
var url = 'https://upworknotify.herokuapp.com/upwork'
http.open('POST', url, true);
//Send the proper header information along with the request

chrome.extension.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    console.log('msg: ', msg)
    switch (msg.txt) {
      case '@upworkNewMessage':
        var params;
        var data = new FormData();
        if (msg.content) {
          params = `flag=yes&text=${msg.contentmsg.content}`;
          data.append('flag', 'yes');
          data.append('text', msg.content);
        } else {
          params = 'flag=no';
          data.append('flag', 'no');
        }
        http.open('POST', url, true);
        

        http.send(data);
        break
    }
  })
})
