const request = require("postman-request");

//MapBox USING MAPBOX
const geocode = (adress, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adress
  )}.json?access_token=pk.eyJ1IjoiYWhtZWRuYWxzYXlhZCIsImEiOiJjbDN5aDc3ZHAwaGVyM2puNWI3bTFkN3NlIn0.uOlKnL9eI9BNfz1AWll3oQ`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search!");
    } else {
      callback(undefined, {
        longtitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
