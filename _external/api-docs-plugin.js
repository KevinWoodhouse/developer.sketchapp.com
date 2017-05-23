

var fs = require("fs");

exports.onStart = function(ev) {
  // take option
  scriptsPath = ev.data.option["scripts"];
};

exports.onHandleHTML = function(ev) {
  original = ev.data.html
  if (original.search("<html") != -1) {
    header = ""

    // extract the title
    match = original.match(/<title.*>(.*)<\/title>/)
    if (match) {
      title = match[1]
      header += "title: " + title + "\n"
    }

    // extract everything inside the <body> tag and throw the rest away
    body = original
    match = original.match(/body.*>([^]*)<\/body/)
    if (match) {
      body = match[1]
    }

    // adjust internal links to be absolute
    body = body.replace(/href="(?!http)(.*?)"/g, "href=\"/reference/api/$1\"")
    body = body.replace(/src=".\/image/g, "src=\"/reference/api/image")
    body = body.replace(/src="script/g, 'src="/reference/api/script/')

    // write out the jekyll front matter header plus the extracted body
    ev.data.html = "---\n" + header + "---\n\n" + body;
  }
};
