console.log(
  '============================================content!!!===========================================',
);
var gmailCapture = chrome.extension.connect({
	name: "gmail <-> background.js"
});
if (window.location.hostname == 'mail.google.com') {
	gmailCapture.postMessage({txt: "@upworkNewMessage", content:  null});
	var filter  = Array.prototype.filter;

	function grabUpwork() {
		var rows = document.querySelectorAll("table.F.cf.zt tbody tr.zA.zE");
		var upworkRows = filter.call(rows, function(row) {
			var email = row.querySelector("td.yX.xY div.afn span.bA4 span").getAttribute('email');
			return email.indexOf("hotjar.com") > -1; //@upwork.com,  email.indexOf("room_") > -1
		});
		// take only latest email
		
		// if(upworkRows.length) {
		// 	var latestUpworkEmailTxt = upworkRows[0].querySelector("td.yX.xY div.afn span[data-thread-id][data-legacy-thread-id]").textContent;
		// 	gmailCapture.postMessage({txt: "@upworkNewMessage", content:  latestUpworkEmailTxt});
		// } else {
		// 	gmailCapture.postMessage({txt: "@upworkNewMessage", content:  null});
		// }
	}
	setInterval(function() {
		grabUpwork();
	}, 1000 * 10);
	
} else {
  var banTextsArr = [
    'india',
    'indonesia',
    'pakistan',
    'philippines',
    'bangladesh',
    'lebanon',
    'nigeria',
    'vietnam',
    'kazakhstan',
    'thailand',
    'kenya',
    'lithuania',
    'china',
    'uzbekistan',
    'finland',
    'malaysia',
    'bahrain',
    'jamaica',
    'israel',
    'turkmenistan',
    'singapore',
    'ukraine',
  ]
  function banCountries() {
    var sections = document.querySelectorAll(
      "div[data-test = 'job-tile-list'] section",
    )
    if (sections && sections.length)
      for (var i = 0; i < sections.length; i++) {
        if (
          !sections[i].querySelector(
            "small[data-test = 'client-country'] strong",
          )
        )
          continue
        var txt = sections[i].querySelector(
          "small[data-test = 'client-country'] strong",
        ).textContent

        if (!txt) continue
        txt = txt.toLowerCase()

        if (banTextsArr.indexOf(txt) > -1) {
          // elements[i].style.color = "red";
          // elements[i].style["font-weight"] = "bold";
          // elements[i].style["font-size"] = "14px";
          // elements[i].style["text-decoration"] = "line-through";
          sections[i].style['display'] = 'none'
        }
      }
  }

  //=============================================================================
  var idArray = []

  function pushIDsToArray() {
    var elements = document.querySelectorAll(
      "div[data-test = 'job-tile-list'] section",
    )

    if (elements && elements.length)
      for (var i = 0; i < elements.length; i++) {
        var id = elements[i].getAttribute('id')

        if (!id) continue
        idArray.push(id)

        // marks on fixed job
        var fixedJob = elements[i].querySelector("strong[data-test='job-type']")
        var txtJobType = fixedJob.textContent
        if (txtJobType == 'Fixed-price') {
          fixedJob.style['border'] = '3px solid green'
          elements[i].querySelector("span[data-test='budget']").style[
            'font-weight'
          ] = 'bold'
          elements[i].querySelector("span[data-test='budget']").style['color'] =
            'green'
          elements[i].querySelector("span[data-test='budget']").style[
            'font-size'
          ] = '16px'
        } else if (txtJobType.indexOf('Hourly') > -1) {
          fixedJob.style['border'] = '2px solid blue'
          var hourlyperiod = elements[i].querySelector(
            "span[data-test='duration']",
          )
          if (hourlyperiod) hourlyperiod.style['border'] = '1px solid blue'
        }
      }
  }

  function detectJob() {
    banCountries()
    var elements = document.querySelectorAll(
      "div[data-test = 'job-tile-list'] section",
    )
    if (elements && elements.length) {
      var flag = false
      for (var i = 0; i < elements.length; i++) {
        // var txt = elements[i].textContent;
        var id = elements[i].getAttribute('id')
        // elements[i].style["padding"] = "0px 35px";
        // console.log("id===>", idArray.indexOf(id));
        if (!id) continue
        if (idArray.indexOf(id) < 0) {
          flag = true
          elements[i].style['border'] = '2px solid green' //
        }
      }
      if (flag) {
        setTimeout(function () {
          // alert("New Job!");
          pushIDsToArray()
          setTimeout(function () {
            clearSectionColors()
          }, 1000 * 120)
        }, 0)
      }
    }
  }

  function clearSectionColors() {
    var elements = document.querySelectorAll(
      "div[data-test = 'job-tile-list'] section",
    )

    if (elements && elements.length)
      for (var i = 0; i < elements.length; i++) {
        elements[i].style['border'] = '0px'
      }
  }

  pushIDsToArray()

  setInterval(function () {
    detectJob()
    // console.log("c===========>", idArray.length);
  }, 1000 * 5)
}
