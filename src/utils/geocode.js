const request = require('request')

const geocode = (address, callback) => {
    const accessToken = 'pk.eyJ1IjoibXVoZGVtYWQiLCJhIjoiY2t2emhrcnZnNGlyazJxa2w1aDN6MjN2NSJ9.hVp3t_jo7eseNUai71WLHA'
    const limit = 1

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+accessToken+'&limit='+limit

    request ({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search', undefined)
        } else {
            const data = body.features[0]

            const coordinates = data.center

            const long = coordinates[0]
            const lat = coordinates[1]
            const location = data.place_name
            
            callback(undefined, {lat, long, location})
        }
    })
}

module.exports = geocode