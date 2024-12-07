import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.json({sucess: false, message: 'Not authorized'})
    }

    try {
         const token_decode  = jwt.verify(token, process.env.JWT_SECRET)
         req.body.userId = token_decode.id
         console.log("User ID in middleware:", req.body.userId);
         next()
    } catch (error) {
            console.log(error);
            res.json({sucess: false, message: error.message})
    }

}


export default authUser; 