import userModel from "../models/usermodel.js";





//add products to userCART
const addToCart = async (req,res) => {
        try {

            const {userId, itemId, size} = req.body;
            console.log("Received userId:", userId);
            console.log("Received itemId:", itemId);
            console.log("Received size:", size);

            const userData = await userModel.findById(userId);
            let cartData = await userData.cartData || {};
            console.log("Current cart data:", cartData);

            if(cartData[itemId]){
                if(cartData[itemId][size]){
                    cartData[itemId][size] += 1;
                }else{
                    cartData[itemId][size] = 1;

                }
            }else{  
                cartData[itemId] = {}
                cartData[itemId][size] =1 
            }
            console.log("Updated cart data:", cartData);
            const updatedUser = await userModel.findByIdAndUpdate(userId,{cartData})
            console.log("Updated user data:", updatedUser);
            res.json({sucess: true, message: "Added to Cart"})

        } catch (error) {
            console.log("error in addtocart" , error);
            res.json({sucess: false, message: "Not added to Cart"})
        }
}




//update user Cart
const updateCart = async (req,res) => {
    try {
       const {userId, itemId, size, quantity} = req.body;

       const userData = await userModel.findById(userId);
       let cartData = await userData.cartData;

       cartData[itemId][size] = quantity;
       await userModel.findByIdAndUpdate(userId,{cartData})
       res.json({sucess: true, message: "Cart Updated"})

    } catch (error) {
        console.log(error);
        res.json({sucess: false, message: error.message})
    }
    
}





//get user cart data
const getUserCart = async (req,res) => {
    try {
            const {userId} = req.body;

            const userData = await userModel.findById(userId);
            let cartData = await userData.cartData;
            res.json({sucess:  true, cartData})
    }catch (error){
        console.log(error);
        res.json({sucess: false, message: error.message})
    }
    
}


export { addToCart, updateCart, getUserCart}
 