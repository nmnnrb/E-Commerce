import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"
//listProduct

const listProduct = async (req,res) => {

    try {
        const products = await productModel.find({});
        res.json({sucess: true, products: products});
    } catch (error) {
        console.log(error);
        res.json({sucess : false, message: "listProduct not work"})
        
    }

}



//addproduct

const addProduct = async (req,res) => {
    try {
        const {name, description, price,category,subCategory,sizes,bestseller} = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images =[image1, image2, image3, image4].filter(image => image !== undefined);

        let imagesUrls = await Promise.all( 
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type: 'image'});
                return result.secure_url;
            })
        )
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            image: imagesUrls,
            date: Date.now()
        }
        const product = new productModel(productData);
        await product.save();
        res.json({sucess: true, message: "product added successfully"})
        
    } catch (error) {
        res.json({sucess : false, message: "product not added"})
        console.log(error)
    }
}





//remove product

const removeProduct = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({sucess: true, message: "product removed successfully"})
    } catch (error) {
        res.json({sucess: false, message: "product not removed"})
    }
}




//singleproduct info

const singleProduct = async (req,res) => {
        try {
            const {productId} = req.body

            const product = await productModel.findById(productId);

            res.json({sucess: true, product});
        } catch (error) {
            res.json({sucess: false, message: "product not found"});
        }
}





export {listProduct, addProduct, removeProduct, singleProduct}