import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({token}) => {
  const [image1,setImage1] = useState(false);
  const [image2,setImage2] = useState(false);
  const [image3,setImage3] = useState(false);
  const [image4,setImage4] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('MEN');
  const [subCategory, setSubCategory] = useState('Top Wear');
  const [sizes, setSizes] = useState([]);
  const [bestseller,setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
      e.preventDefault();

      try {
         const formData = new FormData();

         formData.append("name", name);
         formData.append("description", description);
         formData.append("price", price);
         formData.append("category", category);
         formData.append("subCategory", subCategory);
         formData.append("bestseller", bestseller);
         formData.append("sizes", JSON.stringify(sizes));

         image1 && formData.append("image1", image1);
        image2 &&  formData.append("image2", image2);
         image3 && formData.append("image3", image3);
        image4 &&  formData.append("image4", image4);

        const response = await axios.post(backendUrl + "/api/product/add", formData, {headers:{ token } });
          
        if(response.data.sucess === true) {
          toast.success(response.data.message);
          setName('');
          setPrice('');
          setDescription('');
          setImage1(false);
          setImage2(false);
          setImage3(false);
          setImage4(false);
          setSizes([]);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong!");

      }
  }


  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-6 font-extrabold text-2xl">Upload Image</p>
        <div className="flex gap-5 flex-wrap">
          <label htmlFor="image1">
            <img
              className="cursor-pointer w-32 h-32"
              src={image1 ? URL.createObjectURL(image1) : assets.upload_area }
              alt=""
            />
            <input  onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img 
              className="cursor-pointer  w-32 h-32"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img 
              className="cursor-pointer  w-32 h-32"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img 
              className="cursor-pointer  w-32 h-32"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-3">Product Name</p>
        <input onChange={(e)  => setName(e.target.value)} value={name}
          type="text"
          className="w-full max-w-[500px] px-3 py-2 rounded-lg border border-gray-300"
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-3">Product Description</p>
        <textarea onChange={(e)  => setDescription(e.target.value)} value={description}
          className="w-full max-w-[500px] px-3 py-2 rounded-lg border border-gray-300"
          placeholder="Enter product Description"
          required
        />
      </div>

      <div className="flex gap-12">
        <div>
          <p className="mb-3"> Product Category</p>
          <select onChange={(e)  => setCategory(e.target.value)} value={category} className="w-full max-w-[500px] px-3 py-2 rounded-lg border border-gray-300">
            <option value="MEN">MEN</option>
            <option value="WOMEN">WOMEN</option>
            <option value="KIDS">KIDS</option>
          </select>
        </div>
        <div>
          <div>
            <p  className="mb-3"> SubCategory</p>
            <select onChange={(e)  => setSubCategory(e.target.value)} value={subCategory} className="w-full max-w-[500px] px-3 py-2 rounded-lg border border-gray-300">
              <option value="Top Wear">Top Wear</option>
              <option value="Bottom Wear">Bottom Wear</option>
              <option value="Winter Wear">Winter Wear</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div>
        <p className="mb-3"> Product sizes</p>
        <div className="flex gap-3">
          <div onClick={() => {setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"]  )}}>
            <p className={`${sizes.includes("S") ? 'bg-orange-500 text-white' :' bg-slate-200'} px-3 py-1 cursor-pointer `}>S</p>
          </div>
          <div onClick={() => {setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"]  )}}>
            <p className={`${sizes.includes("M") ? 'bg-orange-500 text-white' :' bg-slate-200'} px-3 py-1 cursor-pointer `}>M</p>
          </div>
          <div onClick={() => {setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"]  )}}>
            <p className={`${sizes.includes("L") ? 'bg-orange-500 text-white' :' bg-slate-200'} px-3 py-1 cursor-pointer `}>L</p>
          </div>
          <div onClick={() => {setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"]  )}}>
            <p className={`${sizes.includes("XL") ? 'bg-orange-500 text-white' :' bg-slate-200'} px-3 py-1 cursor-pointer `}>XL</p>
          </div>
          <div onClick={() => {setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"]  )}}>
            <p className={`${sizes.includes("XXL") ? 'bg-orange-500 text-white' :' bg-slate-200'} px-3 py-1 cursor-pointer `}>XXL</p>
          </div>
        </div>
        </div>
       <div>
       <p className="mb-1 mt-3"> Price</p>
      <input onChange={(e)  => setPrice(e.target.value)} value={price} type="text"  className="w-full max-w-[100px] px-3 py-2 rounded-lg border border-gray-300"
          placeholder="$199" required/>
       </div>
      </div>

    <div className="flex gap-1">
      <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} className="w-4 h-4 mt-1 rounded-full cursor-pointer" type="checkbox" id="bestseller" />
      <p className="font-extrabold">Best Seller</p>
    </div>


    <button type="submit" className="btn btn-primary w-full max-w-[500px] rounded-lg border px-3 py-1 bg-orange-400 text-white ">ADD PRODUCT</button>

    </form>
  );
};

export default Add;
