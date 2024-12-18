import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Newsletterbox from '../components/Newsletterbox'


const Home = () => {
   const [showPopup, setShowPopup] = useState(true); // State to control popup visibility
    
    // Close popup when clicking the close button
    const handleClosePopup = () => {
      setShowPopup(false);
    };
  
    // Automatically close popup after 5 seconds
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 30000);
      return () => clearTimeout(timer);
    }, []);
  
    useEffect(() => {
      console.log('Popup visibility:', showPopup); // Log the popup state
    }, [showPopup]);
  return (
    <div>
            {/* Popup Section */}
            {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">**ATTENTION!!</h2>
            <p className="text-gray-600 mb-6">
              For testing purposes, make sure the backend is up and running.<a className='px-2 py-1 text-white bg-blue-600 hover:bg-blue-400 rounded-md' href='https://e-commerce-backend-8x0r.onrender.com'> Check here to check backend   </a>  As the project is hosted on the free server, it will take few second to minutes <span className='text-white text-sm rounded-md font-light bg-black px-2 py-1 ' >usually it make take 40-60 second to run backend</span> time to fully work in production.
            </p>
            <button
              onClick={handleClosePopup}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
       <Hero/>
       <LatestCollection/>
       <BestSeller/>
       <OurPolicy/>
       <Newsletterbox/>
    </div>
  )
}

export default Home