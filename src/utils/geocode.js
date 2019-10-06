const request = require('request');

const getGeoCode = (location, callback) => {
    const geocoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) +'.json?access_token=pk.eyJ1IjoidmFpYmhhdmthdHR5YW5pIiwiYSI6ImNrMWM1ZzRydDAwMmkzY2xwaWYzMTBicWUifQ.5PCUnybVTjFUWwoNdEcYVA&limit=1'

    request({ url:geocoding, json:true }, (error, {body})=>{
        if(error){
            callback('Failed to connect to the service', undefined);
        }
        else if(body.features.length == 0){
            callback('Failed to find location', undefined);
        }
        else{           
            callback(undefined, {
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                locationName :  body.features[0].place_name
            });
        }
    });
}

module.exports = getGeoCode;