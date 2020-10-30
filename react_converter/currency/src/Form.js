import React from 'react'

export default function Form(props) {
    const {
        choices,
        selectChoice,
        onChangeChoice,
        onChangeQuantity,
        quantity
    } = props

    
    return (
        <div>
            <input type= "number" className = "input" value = {quantity} onChange = {onChangeQuantity} />
            <select value= {selectChoice} onChange ={onChangeChoice}>
                {choices.map(option => (
                  <option key={option} value = {option}>{option}</option>       
                ))}
                
            </select>
        

        </div>
    )
}

