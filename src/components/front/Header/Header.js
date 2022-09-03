import React from 'react';
import {Link } from "react-router-dom";
import "./Header.css";

const Header = ({cartItems, search, setSearch}) => {
  return (
    <header className='header'>
    <div className='search'>
                <h1 className='search-text'>{}</h1>
                <form>
                    <input type='text' placeholder='Search' className='search-input' defaultValue={search} onChange= {(e) => setSearch(e.target.value)} ></input>
                </form>
            </div>

        <div className='header-links'>
            <ul>
                <li>
                    <Link to = "/">Home</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to = "/addNew"><i className="fa fa-plus" aria-hidden="true"></i></Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to = "/cart">
                        <i className="fas fa-shopping-cart" />
                        <span className='cart-length'>
                            {cartItems.length === 0 ? "0" : cartItems.length}
                        </span>
                    </Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to = "/wishlist">
                        <i className="fas fa-solid fa-heart"></i>
                    </Link>
                </li>
            </ul>
        </div>
    </header>
  )
}

export default Header