const request = require("request");
const forecast = (lattitude, longitude, callback) => {
  const url =
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
    lattitude +
    "&lon=" +
    longitude +
    "&appid=4e1a9f2bc320d6efea067f7cd5f0e397";
  request({url, json: true }, (error, {body}) => {
    const requiredThing = {
      description:  body.weather[0].description,
      name: body.name,
      errorCode: body.cod,
    };
    const { errorCode, description, name } = requiredThing;
    console.log();
    if (error) {
      callback("Unable to connect to internet", undefined);
    } else if (errorCode === "400") {
      callback("Couldn't find the city name for the specified coordinates");
    } else {
      theData =   
        "The city for the specific coordinate is " +
        name +
        " and the weather is " +
        description;
      callback(undefined, theData);
    }
  });
};
module.exports = forecast;
