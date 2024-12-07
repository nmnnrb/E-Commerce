import orderModel from '../models/orderModel.js'
import userModel from '../models/usermodel.js';
import Stripe from 'stripe'
// Placing order with COD method
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


//global variable
const currency = 'usd'
const deliveryCharge = 10

const placeOrder =  async(req,res) => {
    try {
        const {userId , items, amount , address} = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            status: "Order Placed",
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData:{}});
        res.json({sucess: true, message: "Order Placed"})


    } catch (error) {
            console.error(error)
            res.json({sucess: false, message: error.message})
    }   
}
// Placing order with Stripe method

const placeOrderStripe =  async(req,res) => {
    try {
        const {userId , items, amount , address} = req.body;
        const {origin} = req.headers;
        const orderData = {
            userId,
            items,
            amount,
            address,
            status: "Order Placed",
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                    },
                unit_amount: item.price *100
                },
                quantity: item.quantity
            }
        ))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                    },
                unit_amount: deliveryCharge *100
                },
                quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`, // Success URL
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,  // Cancel URL
            line_items,
            mode: 'payment'
        });
        

        res.json({sucess: true, session_url: session.url})

    } catch (error) {
        console.error(error)
        res.json({sucess: false, message: error.message})
    }
}


//verify stripe
const verifyStripe = async (req, res) => {
    const { orderId, success, userid } = req.body;
    try {
        // Check if success is a boolean and handle accordingly
        if (success === true) { // Ensure you're comparing with a boolean
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userid, { cartData: {} }); // Clear cart data
            res.json({ success: true, message: "Order Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId); // Remove the order if payment failed
            res.json({ success: false, message: "Order not Paid" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};






// Placing order with razorpay method

const placeOrderRazorpay =  async(req,res) => {

}


// all order data for admin pannel

const allOrders = async (req,res) =>{
    try {
        const orders = await orderModel.find({});
        res.json({sucess: true, orders})
    } catch (error) {
        console.log(error)
        res.json({sucess: false, error: error.message});
    }
}


// UserOrder order data for frontend
const userOrders = async (req,res) =>{

   try {
    const {userId} = req.body;
    const orders = await orderModel.find({userId});
    res.json({sucess: true, orders})
   } catch (error) {
    console.log(error)
    res.json({sucess: false, error: error.message});
   }

}


// Update order stastus from admin pannel
const updateStatus = async (req,res) =>{
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({sucess: true, message: "Order status updated"})
    } catch (error) {
        console.log(error)
        res.json({sucess: false, error: error.message});
    }
}

export {placeOrder , placeOrderStripe , placeOrderRazorpay, allOrders, updateStatus, userOrders, verifyStripe}