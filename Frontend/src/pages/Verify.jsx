import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
    const { token, setCartItems, orderId, success, backendUrl } = useContext(ShopContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            if (!token) {
                console.warn("Token is missing. Cannot verify payment.");
                return;
            }
    
            // Ensure success is passed as a boolean (true or false)
            const response = await axios.post(
                `${backendUrl}/api/order/verifyStripe`,
                { orderId, success: success === "true" }, // Convert success to boolean
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            if (response.data.success) {
                console.log("Payment verified successfully. Clearing cart and redirecting.");
                setCartItems({}); // Clear cart state
                navigate("/orders"); // Redirect to orders page
            } else {
                console.warn("Payment verification failed. Redirecting to cart.");
                navigate("/cart"); // Redirect to cart
            }
        } catch (error) {
            console.error("Error during payment verification:", error);
            toast.error("An error occurred while verifying payment.");
        }
    };
     

    useEffect(() => {
        const runVerification = async () => {
            await verifyPayment();
        };
        runVerification();
    }, [token, orderId, success]); 

    return (
        <div>
            <p>Verifying your payment, please wait...</p>
        </div>
    );
};

export default Verify;
