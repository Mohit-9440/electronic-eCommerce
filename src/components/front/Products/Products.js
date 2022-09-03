import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Products.css";

const Products = ({ wishlistItems, productItems, handleAddProduct, handleAddWish, search, toggleWish }) => {
    const [productItem ] = useState(productItems);
    const [sortType, setSortType ] = useState('priceAsc');
    const navigate = useNavigate();

    const getLocalStorageData = localStorage.getItem('appData');
    const appData = getLocalStorageData !== '[object Object]' && JSON.parse(getLocalStorageData)



    const filteredProducts = appData ?  appData.filter(productItem =>
        productItem.name.toLowerCase().includes(search.toLowerCase()) || productItem.category.toLowerCase().includes(search.toLowerCase())
        ) : productItem.filter(productItem =>
            productItem.name.toLowerCase().includes(search.toLowerCase()) || productItem.category.toLowerCase().includes(search.toLowerCase())
      );

    const handleDeleteProduct = (id) => {

        var index = appData.map(x => {
            return x.id;
          }).indexOf(id);
          
          appData.splice(index, 1)
            localStorage.setItem('appData', JSON.stringify(appData))
            window.location.reload();

    }
    function checkWishlistItem (product) {
        const ProductExist = wishlistItems.find((item) => item.id === product.id);
        if (ProductExist) {
            return true
        } else {
            return false
        }
    }

    return (

        <div>
        <div className="productHeader">
        <select onChange={e => setSortType(e.target.value)} defaultValue='priceAsc'> 
            <option value="priceAsc"> Price Low - High</option>
            <option value="priceDsc">Price High - Low</option>
            <option value="ratingsDsc">Relevant</option>
        </select>
        </div>

        <div className='products'>
            {filteredProducts.sort((a, b) => 
                sortType === 'priceAsc' ?  a.price - b.price : 
                sortType === 'priceDsc' ?   b.price - a.price : 
                sortType === 'ratingsDsc' ?  b.ratings - a.ratings : null
            ).map((productItem) =>(
                <div key={productItem.id} className='card'>
                <div className='heart-wrapper'>

                        <button className='wishlist-button' onClick={ () => toggleWish(productItem)}>
                            <div className={`icon ${checkWishlistItem(productItem) ? 'icon-selected' : '' } `}>
                            <i className="fa fa-heart fa-3x"  aria-hidden="true"></i>
                            </div>
                        </button>
                </div>
                    <div>
                        <img
                         className='product-image'
                         src={productItem.image} 
                         alt={productItem.name} 
                        />
                    </div>
                    <div className='product-details'>
                        <div className='product-name'>{productItem.name}</div>
                        <div className='product-price'>₹{productItem.price} </div>
                        <div className='product-category'>{productItem.category}</div>
                        <div className='product-description'>{productItem.description}</div>
                        <div className='product-ratings'>{productItem.ratings}</div>
                    </div>
                    <div className='card-actions'>
                        <button className='product-add-button' onClick={ () => handleAddProduct(productItem)}>Add to Cart</button>
                        
                        <div className='card-action'>
                        <button className='edit-button' onClick={() => navigate(`/editProduct/${productItem.id}`) }>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='delete-button' onClick={ () => handleDeleteProduct(productItem.id)}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>

                        </div>
                    </div>
                </div>
            ))}
        </div></div>
    );
};

export default Products;