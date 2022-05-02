const request = require('request')

const forecast = (lat, long, callback) => {
    const accessKey = '6fe03217519e29d1be64b08e64befe94'
    const url = 'http://api.weatherstack.com/current?access_key='+accessKey+'&query='+lat+','+long

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            const data = body.current
            const {temperature, feelslike:feelsLike} = data
            const description = data.weather_descriptions[0]

            callback(undefined, {temperature, feelsLike, description})
        }
    })
}

module.exports = forecast
