// This is where we get the info stored in variables for using the API key(essentially we are making a url that includes the API given by the website)
//This is the base url needed before adding API key
const baseURL = `https://api.openweathermap.org/data/2.5/weather?`
//This is API given (also instruction given in email from webiste on how to intiate API use) 
const apiKey = `APPID=aa0b14f498fb7226014ece3bedab8f29`
const queryType = `q=`
//The title query is what will be replaced in the code to see different weather in different areas 
let titleQuery = 'Boston,MA,USA'
//Add up all of the pieces of the URL, make sure to put in units=imperial to get the temp. in Fahrenheit
let queryURL = baseURL + queryType + titleQuery +'&units=imperial'+'&' + apiKey  

//This will allow you to access the information from the API via link. Remeber to use JSON viewer to help you get the info from API
console.log(queryURL)

///////////////////////////////
/////Code to get weather///////
///////////////////////////////

//Make a function and use .ajax method to access info from API
const getWeather = () => {
    $.ajax({
      url: queryURL 
    }).then((element) => {
//Append info on list by using id 
//Create Dive class using with class of list
//Take the parameter and navigate the info from the API website into the code.  
    $('#temps-to-see').append(`  

        <div class = "list">
        <h2> ${element.name} </h2>
        <h3> ${element.main.temp} Degrees Fahrenheit</h3>
        <h4> Description: ${element.weather[0].description} </h4>
        <button class = "remove">remove</button>
        </div>
        `)

//Create a remove button if the user no longer wants to see that weather anymore
        $('.remove').on('click', (event) => {
            console.log(event.currentTarget)
          $(event.currentTarget).parent().remove()
        } )
//Returns an error if function if input of info is not correct 
    }, (error) => {
      console.error(error)
    })
}


  
$(()=> {
  //From the <form> in the html index make a function that creates an event 
    $('form').on('submit', (event) => {
      event.preventDefault()    
      console.log('click')
//Replace the title query with submission given by user
      titleQuery = $('input[type="text"]').val()
//Repeat the variable queryURL so the program knows it needs to replace the titleQuery      
      queryURL = baseURL + queryType + titleQuery +'&units=imperial'+'&' + apiKey
      console.log(titleQuery)
//Call thie getWeather() function
      getWeather()
      
    })
    
    
    
})

