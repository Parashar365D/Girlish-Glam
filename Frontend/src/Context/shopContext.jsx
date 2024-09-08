import React, { createContext, useState, useEffect } from 'react';

const ShopContext = createContext(null);

const getDefaultCart = (products) => {
  let cart = {};
  products.forEach((product) => {
    cart[product.id] = 0;
  });
  return cart;
};

function ShopProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItem, setCartItem] = useState({});

  const API = import.meta.env.VITE_URI;
  
  //   Fetch Product
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API}/product/fetchproduct`);
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setAllProducts(result.data);
          setCartItem(getDefaultCart(result.data));
        } else {
          console.error('Fetch product response is not in the expected format:', result);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

  const fetchCartItems = async () => {
    if (localStorage.getItem('auth-token')) {
      try {
        const response = await fetch(`${API}/cart/getcart`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'auth-token': localStorage.getItem('auth-token'),
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const result = await response.json();
          setCartItem(result.cart);
        } else {
          const result = await response.json();
          alert('Failed to fetch cart');
        }
      } catch (error) {
        alert('Failed to fetch cart');
      }
    }
  };

  fetchProducts();
  fetchCartItems();
}, []);
  

// Functions for cart
const addToCart = async (productId, quantity = 1) => {
  if (localStorage.getItem('auth-token')) {
      try {
          const response = await fetch(`${API}/cart/addcart`, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'auth-token': localStorage.getItem('auth-token'),
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ productId, quantity })
          });

          if (response.ok) {
              const result = await response.json();
              setCartItem(result.cart);
          } else {
              const result = await response.json();
          }
      } catch (error) {
          console.error('Error adding item to cart:', error);
      }
  } else {
      alert("You need to be logged in to add items to the cart");
      window.location.replace('/login')
  }
};

const removeFromCart = async (productId, quantity = 1) => {
  if (localStorage.getItem('auth-token')) {
    try {
      const response = await fetch(`${API}/cart/removecart`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity })
      });

      if (response.ok) {
        const result = await response.json();
        setCartItem(result.cart);
      } else {
        const result = await response.json();
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  } else {
    alert("You need to be logged in to remove items from the cart");
    window.location.replace('/login')
  }
};

const clearCart = async (id) => {
  if (localStorage.getItem('auth-token')) {
    try {
      const response = await fetch(`${API}/cart/clearcart`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: id })
      });

      if (response.ok) {
        setCartItem((prev) => {
          const newCart = { ...prev };
          delete newCart[id];
          return newCart;
        });
      } else {
        const result = await response.json();
      }
    } catch (error) {
      console.error('Error clearing item from cart:', error);
    }
  } else {
    alert("You need to be logged in to clear items from the cart");
  }
};


  const TotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = allProducts.find((product) => product.id === parseInt(item));
        if (itemInfo) {
          totalAmount += itemInfo.newprice * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  const TotalItem = () => {
    let totalItem = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItem += cartItem[item];
      }
    }
    return totalItem;
  };

  const contextValue = { allProducts, cartItem, addToCart, removeFromCart, clearCart, TotalCartAmount, TotalItem };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
}

export { ShopContext, ShopProvider };
