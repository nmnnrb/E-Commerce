import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('')
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Your Size");
      return;
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size]++;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if(token){
      try {
        const payLoad = {itemId, size};
        console.log("payload sent to API" , payLoad);
        const response = await axios.post(
          `${backendUrl}/api/cart/add`,
          payLoad,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token as 'Bearer <token>'
            },
          }
        );
        console.log("response for addtocartforntend  " , response)
      } catch (error) {
          console.log(error);
          toast.error(error.message)
      }
    }

  };

  const getCartCount = () => {
    let totalcount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalcount += cartItems[items][item];
          }
        } catch (error) {
          console.log("error in cart count", error);
        }
      }
    }
    return totalcount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
    if(token){
      try {
        await axios.post(backendUrl + '/api/cart/update' ,{ itemId,size, quantity} , {headers: {
          Authorization: `Bearer ${token}`, // Send token as 'Bearer <token>'
        }} )
      } catch (error) {
        console.log("error in cart update", error);
      }
    }
  };

  const getCartAmount =  () => {
        let totalAmount = 0;
        for(const items in cartItems) {
            let ItemInfo = products.find((product) => product._id === items);
            for(const item in cartItems[items]) {
                try {
                    if (cartItems[items][item]>0) {
                        totalAmount += ItemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    toast.error(error);
                }
            }

        }
          return totalAmount;
                
  }

  const getProductsData = async() => {
      const response = await axios.get(backendUrl +'/api/product/list' )
      if(response.data.sucess){
        setProducts(response.data.products);
      }
  }

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get' , {} , {headers: {
        Authorization: `bearer ${token}`, // Send token as 'Bearer <token>'
      }});
      console.log("get cartData" , response.data)
      if(response.data.sucess){
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log("error in GetCart frontend", error);
    }
  }


  useEffect(() => {
    getProductsData();
  }, [])


  useEffect(() => {
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'));
    }
  },[])
  
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token, setToken
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopProvider;
