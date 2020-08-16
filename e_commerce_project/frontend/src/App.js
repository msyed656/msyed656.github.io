import React from 'react';
import data from './data'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import './App.css';
import HomePage from "./components/HomePage"
import ProductsPage from "./components/ProductsPage"

function App() {
  
  const openMenu = () => {

    document.querySelector(".sidebar").classList.add("open");

  }

  const closeMenu = () => {
    
    document.querySelector(".sidebar").classList.remove("open");

  }
  
  return (
 <BrowserRouter>
    <div className = "grid-container">
        <header className = "header">
            <div className = "perfumery">
                <button onClick = {openMenu}>
                    &#9776;
                </button>
                <Link to= "/">Perfumery</Link>
            </div> 
            <div className= "header-links">
                <a href="cart.html">Cart</a>
                <a href="signin.html">Sign-In</a>
            </div>



        </header>
        <aside className="sidebar">
            <h3>Shopping Categories</h3>
            <button className ="sidebar-close" onClick={closeMenu}>x</button>
            <ul>
                <li>
                    <a href="index.html">Perfumes</a>
                </li>

                <li>
                    <a href="index.html">Fragrance Oils</a>
                </li>

            </ul>

        </aside>

        <main className = "main">
            <div className= "content">
              <Route path="/products/:id" component = {ProductsPage} />
              <Route path="/" exact={true} component = {HomePage} />
            
            </div> 
        </main>
        <footer className = "footer">
            Perfumery is Great! 
        </footer>

    </div>
    </BrowserRouter>
  );
}

export default App;
