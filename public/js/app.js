const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''
    
    const location = search.value

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast + '. ' + 'Wind speed is '+ data.windSpeed + ', and humidity is ' + data.humidity 
            }
        })
    })
})