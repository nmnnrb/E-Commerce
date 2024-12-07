import usermodel from "../models/usermodel.js";
import validator from "validator"
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const createToken =  (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET, {expiresIn: '1h'});
}

//Routes for user Login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await usermodel.findOne({email: email});
        if(!user){
            return res.json({ sucess: false, message: "user Not exists" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = await createToken(user._id);
            return res.json({sucess:true, token})
        }else{
           return res.json({ sucess: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ sucess: false, message: error.message });    }
};






// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //checking user already exist or not
    const exists = await usermodel.findOne({ email });

    if (exists) {
      return res.json({ sucess: false, message: "user already exists" });
    }

    //validation email format and strong password for the user
    if (!validator.isEmail(email)) {

      return res.json({ sucess: false, message: "Email is not valid" });
    }
    if (password.length < 8) {
      return res.json({
        sucess: false,
        message: "please enter strong password",
      });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new usermodel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    const token = createToken(user._id)
    
    res.json({sucess: true, token: token})
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

//route for admin loginUser
const adminLogin = async (req, res) => {
  try {
    const {email,password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS){
      const token = jwt.sign(email+password, process.env.JWT_SECRET)
      res.json({sucess: true, token})
    }else{
      res.json({sucess: false, message: 'invalid credentials'})
    }
  } catch (error) {
    console.log("errro in admin login")
  }
};

export { loginUser, registerUser, adminLogin };
