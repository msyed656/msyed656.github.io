import React from 'react'

export const Transaction = () => {
    return (
        <div>
            <h3>Past Transactions</h3>
            <ul id = 'list' className= 'list'>
                <li className= "minus">
                    Cash <span>-$400</span><button className="delete-btn">x</button>
                </li>

            </ul>

        </div>
    )
}
