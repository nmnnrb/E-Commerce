import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

const connectCloudinary = async () => {

    cloudinary.config({
        cloud_name: "dtro0afud",
        api_key:  "341324313183961",
        api_secret: "Q45ZY7euYD_N9T8Qrs15DYkoCKQ"
    })
}

export default connectCloudinary;