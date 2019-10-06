const request = require('request');

const getForecast = (longitude,latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f95226937e5ffe6ecee6bc60c8bd9ad1/'+longitude+","+latitude;
    //console.log(url);
    request({ 
        url:url,
        json:true
     }, (error, {body}) => {
        if(error){
            callback(`Something went wrong while fetching the weather`, undefined);
        }else if(body.error){
            callback(`Unable to fetch the weather`, undefined);
        }
        else{
            callback(undefined, {
                temprature : body.currently.temperature,
                rainProbability : body.currently.precipProbability
            });
            //console.log(`It is currently ${response.body.currently.temperature} degrees out in. There is a ${response.body.currently.precipProbability}% chances of rain`);
        }
    });
}

module.exports = getForecast;