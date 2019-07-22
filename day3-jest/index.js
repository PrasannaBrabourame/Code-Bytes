var request = require("request");

var options = {
    method: 'GET',
    url: 'https://pub.orcid.org/0000-0002-6147-6366',
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});