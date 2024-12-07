import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-xs">
        <div>
          <img src={assets.logo} className="mb-5 w-32 " alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident
            accusantium iste earum veritatis sapiente hic.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-888-834-8978</li>
            <li>contact@naman.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-center py-3 text-gray-600">
          &copy; 2024 Naman. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;