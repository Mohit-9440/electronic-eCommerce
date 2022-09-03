import React from 'react';
import './Wishlist.css';

const Wishlist = ({wishlistItems, handleWishlistClearance, handleAddWish}) => {
    return (
        <div className='wishlist-items'>
            <h2 className='wishlist-items-header'>Wishlist Items</h2>
            <div className='clear-wishlist'>
                {wishlistItems.length >= 1 && (
                    <button className='clear-wishlist-button' onClick={handleWishlistClearance}>Clear Wishlist</button>
                )}
            </div>
    
            {wishlistItems.length === 0 && (
                <div className='wishlist-items-empty'>No Items are added.</div>
            )}
    
            <div>
                {wishlistItems.map((item) => (
                    <div key={item.id} className="wishlist-items-List">
                        <img
                         className='wishlist-items-image'
                         src={item.image}
                         alt={item.name}
                        />
                        <div className='wishlist-items-name'>{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Wishlist