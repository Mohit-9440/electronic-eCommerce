import React, {useState} from 'react'
import data from "./components/back/Data/Data";
import Header from './components/front/Header/Header';
import Routess from './components/front/Routess/Routess';
import { BrowserRouter as Router } from 'react-router-dom';
import toast from 'react-hot-toast';

const App = () => {
  const { productItems } = data;
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  
  const [search, setSearch] = useState('');
  
  const handleAddProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if(ProductExist){
      setCartItems(cartItems.map((item) => item.id === product.id ? 
      {...ProductExist, quantity: ProductExist.quantity + 1}:item)
      );
    } else{
        setCartItems([...cartItems, {...product, quantity: 1}]);
    }
    toast.success('Added to Cart Successfully!!')

  };

  const handleAddWish = (product) => {
    const ProductExist = wishlistItems.find((item) => item.id === product.id);
    if(ProductExist){
      setWishlistItems(wishlistItems.map((item) => item.id === product.id ? 
      {...ProductExist, quantity: ProductExist.quantity + 1}:item)
      );
    } else{
        setWishlistItems([...wishlistItems, {...product, quantity: 1}]);
    }
  };

  const toggleWish = (product) => {
    const ProductExist = wishlistItems.find((item) => item.id === product.id);
    if(ProductExist){
      var index = wishlistItems.map(x => {return x.id;}).indexOf(product.id);
      wishlistItems.splice(index, 1)
      setWishlistItems(wishlistItems);
      toast.success('Removed from Wishlist Successfully!!')
    } else {
      setWishlistItems([...wishlistItems, {...product, quantity: 1}]);
      toast.success('Added to Wishlist Successfully!!')
    }
  };

  const handleRemoveProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if(ProductExist.quantity === 1) {
      var index = cartItems.map(x => {return x.id;}).indexOf(product.id);
      cartItems.splice(index, 1)
      console.log(cartItems)
      setCartItems(cartItems)
      // setCartItems(cartItems.filter((item) => item.id === product.id));
      // console.log(index)
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id 
          ? {...ProductExist, quantity: ProductExist.quantity - 1}
          : item
        )
      );
    };
    
  }
  const handleCartClearance = () => {
    setCartItems([]);
    toast.success('Cleared Cart Successfully!!')
  };

  const handleWishlistClearance = () => {
    setWishlistItems([]);
    toast.success('Cleared Wishlist Successfully!!')
  }

  return (
    <div>
      <Router>
        <Header cartItems={cartItems} search={search} setSearch={setSearch}/>
        <Routess
         productItems={productItems} 
         cartItems={cartItems} 
         handleAddProduct={handleAddProduct} 
         handleRemoveProduct={handleRemoveProduct}
         handleCartClearance={handleCartClearance}

         wishlistItems={wishlistItems}
         toggleWish={toggleWish}
         handleAddWish={handleAddWish}
         handleWishlistClearance={handleWishlistClearance}

         search={search}
        />
      </Router>
    </div>
  )
}

export default App