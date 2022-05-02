const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Emad'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Emad'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'WTF do you want!!!',
        title: 'Help',
        name: 'Emad'
    })
})

app.get('/weather' ,(req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'Address must be provided!'
        })
    }
    
    geocode(address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            console.log(forecastData)
            res.send({
                address,
                location,
                forecast: forecastData.description+'. The temperature is '+forecastData.temperature+', but it feels like '+forecastData.feelsLike
            })
        })
    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Emad',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Emad',
        errorMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})