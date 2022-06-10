const request = require("postman-request");

const forecast = (latitude, longtitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=6384b7e0d6442f1846d79f41eaab8c60&query=${latitude},${longtitude}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(`Can't connect to weatherstack.com! (error code: ${error.code})`);
    } else if (response.body.error) {
      callback(`Can't find location! (error code: ${error.error})`);
    } else {
      callback(undefined, response.body.current);
    }
  });
};

module.exports = forecast;
