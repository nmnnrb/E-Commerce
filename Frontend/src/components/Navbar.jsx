import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
const Navbar = () => {
    const {setShowSearch , getCartCount , navigate, token , setToken, setCartItems} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);

    const logout = () => {
      navigate('/login');
      localStorage.removeItem('token');
      setToken('');
      setCartItems({})
    }
  return (
    <div className="flex items-center justify-between py-5 font-medium">
     <Link to='/'><img src={assets.logo} className="w-40" alt="logo" />
     </Link> 
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-1/2 hidden  border-none h-[1.5px] bg-blue-700" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTIONS</p>
          <hr className="w-1/2 hidden  border-none h-[1.5px] bg-blue-700" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-1/2 hidden  border-none h-[1.5px] bg-blue-700" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-1/2 hidden  border-none h-[1.5px] bg-blue-700" />
        </NavLink>

        <a className="bg-blue-600 text-xl flex gap-1 font-bold px-3 py-1 rounded-md md:ml-24 text-white " href="https://e-commerce-admin-pannel-aes6.onrender.com/" target="_blank" 
   rel="noopener noreferrer" >ADMIN PANNEL
        <svg  className="w-[15px]  text-white" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 0L9 1L11.2929 3.29289L6.2929 8.29289L7.70711 9.70711L12.7071 4.7071L15 7L16 6V0H10Z" fill="#ffffff"></path> <path d="M1 2H6V4H3V13H12V10H14V15H1V2Z" fill="#ffffff"></path> </g></svg>
        </a>
      </ul>

      <div className="flex items-center gap-6">
      <img onClick={() => setShowSearch(prev => !prev)}
          src={assets.search_icon}
          className="w-5 cursor-pointer hover:shadow-xl"
          alt="search"
        />
        <div className="group relative">
          <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className="w-5 cursor-pointer" alt="profile" />
          {/*-------- Dropdown list is here ------------ */}
         {
          token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-md">
                    <p className="cursor-pointer hover:text-black " >My Profile</p>
                    <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black " >Orders</p>
                    <p onClick={logout} className="cursor-pointer hover:text-black " >Logout</p>
            </div>
              </div>
          )
         }
        </div>
        <Link to="/cart" className=" relative">
        <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
        <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-orange-500 text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
        </Link>
        <img onClick={() => setVisible(true)}  src={assets.menu_icon} className="w-5 min-w-5 cursor-pointer sm:hidden" alt="menu" />
      </div>
{/* sidebar menu for small screen */}

    <div className={`absolute top-0 right-0 bottom-0  overflow-hidden bg-white transition-all duration-300 ease-in-out z-50 h-full ${visible ? 'w-full' : 'w-0'} `}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                        <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                     <NavLink onClick={() => setVisible(false)}  className='py-2 pl-6 bordeer' to='/'>HOME</NavLink>
                     <NavLink  onClick={() => setVisible(false)} className='py-2 pl-6 bordeer' to='/collection'>COLLECTION</NavLink>
                     <NavLink onClick={() => setVisible(false)}  className='py-2 pl-6 bordeer' to='/about'>ABOUT</NavLink>
                     <NavLink  onClick={() => setVisible(false)} className='py-2 pl-6 bordeer' to='/contact'>CONTACT</NavLink>
                </div>
    </div>
    </div>
  );
};

export default Navbar;
