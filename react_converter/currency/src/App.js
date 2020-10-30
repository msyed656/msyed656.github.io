import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './Form'

const BASE_URL = 'https://api.exchangeratesapi.io/latest'


function App() {
  const [choices, setChoices] = useState([])
  const [fromChoices, setFromChoices] = useState()
  const [toChoices, setToChoices] = useState()
  const [conversionRate, setConversionRate] = useState()
  const [quantity, setQuantity] = useState(1)
  const [quantityFromChoice, setQuantityFromChoice] = useState(true)
  
  let toQuantity, fromQuantity
  if (quantityFromChoice) {
    fromQuantity = quantity
    toQuantity = quantity * conversionRate
  } else {
    toQuantity = quantity
    fromQuantity = quantity / conversionRate
  }



  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstChoice = Object.keys(data.rates)[0]
        setChoices([data.base, ...Object.keys(data.rates)])
        setFromChoices(data.base)
        setToChoices(firstChoice)
        setConversionRate(data.rates[firstChoice])
      })
  }, [])

  useEffect(() => {
    if (fromChoices != null && toChoices != null) {
      fetch(`${BASE_URL}?base=${fromChoices}&symbols=${toChoices}`)
        .then(res =>res.json())
        .then(data => setConversionRate(data.rates[toChoices]))
    }
    
  }, [fromChoices, toChoices])

  
  function handleFromQuantityChange(e) {
    setQuantity(e.target.value)
    setQuantityFromChoice(true)
  }

  function handleToQuantityChange(e) {
    setQuantity(e.target.value)
    setQuantityFromChoice(false)
  }


  return (
    <>
      <h1>Welcome to the Currency Exchange</h1>
      <Form
      choices = {choices}
      selectChoice = {fromChoices}
      onChangeChoice = {e => setFromChoices(e.target.value)}
      onChangeQuantity = {handleFromQuantityChange}
      quantity = {fromQuantity}
      
      />
      <div className = "statement">is equivalent to :</div>
      <Form
      choices = {choices}
      selectChoice = {toChoices} 
      onChangeChoice = {e => setToChoices(e.target.value)}
      onChangeQuantity = {handleToQuantityChange}
      quantity = {toQuantity}
      />
      
    </>
  );
}

export default App;
