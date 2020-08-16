import React from 'react';
import { Header } from "./components/Header"
import { Balance } from "./components/Balance"
import { BillsIncome } from "./components/BillsIncome"
import { Transaction } from "./components/Transaction"
import { Form } from "./components/Form"
import './App.css';

function App() {
  return (
    <div>
     <Header />
     <div className = 'container'>
       <Balance />
       <BillsIncome />
       <Transaction />
       <Form />
     </div>
    </div>
  );
}

export default App;
