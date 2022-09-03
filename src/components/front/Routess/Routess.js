import React from 'react';
import Products from "../Products/Products";
import AddProduct from '../AddProduct/AddProduct';
import Cart from '../Cart/Cart';
import { Route,Routes } from "react-router-dom";
import Wishlist from '../Wishlist/Wishlist';
import EditProduct from '../EditProduct/EditProduct';

const Routess = ({
     productItems, 
     cartItems, 
     handleAddProduct, 
     handleRemoveProduct,
     handleCartClearance,
     toggleWish,
     wishlistItems,
     handleAddWish,
     handleWishlistClearance,

     search
    }) => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Products wishlistItems={wishlistItems} productItems={productItems} search={search} handleAddProduct={handleAddProduct} handleAddWish={handleAddWish} toggleWish={toggleWish}  />} /> 
                <Route path='/addNew' element={<AddProduct/>}/>
                <Route path='/editProduct/:id' element={<EditProduct/>}/>
                <Route path='/cart' element={
                    <Cart
                     cartItems={cartItems} 
                     handleAddProduct={handleAddProduct} 
                     handleRemoveProduct={handleRemoveProduct}
                     handleCartClearance={handleCartClearance}/>
                }/>
                
                <Route path='/wishlist' element={
                    <Wishlist
                     wishlistItems={wishlistItems}
                     handleAddWish={handleAddWish}
                     handleWishlistClearance={handleWishlistClearance}
                    />
                } />
            </Routes>
        </div>
    );
};

export default Routess;
