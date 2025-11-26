import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-white min-h-[80vh] py-10">
      <div className="text-center mb-10">
        <p className="text-3xl md:text-4xl text-primary font-bold tracking-wide">Contact Us</p>
        <p className="text-gray-500 mt-2">We'd love to hear from you!</p>
      </div>
      <div className="flex flex-col md:flex-row gap-12 justify-center items-center mb-20">
        <img className="w-full md:max-w-[360px] rounded-xl shadow-lg" src={assets.contact_image} alt="Contact" />
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 min-w-[300px] max-w-[400px] border border-gray-100">
          <div>
            <p className="font-semibold text-lg text-primary mb-2 flex items-center gap-2"><i className="fa fa-map-marker text-primary"></i> Our Office</p>
            <p className="text-gray-600">00000 Willms Station<br />Suite 078, New Delhi, India</p>
          </div>
          <div>
            <p className="font-semibold text-lg text-primary mb-2 flex items-center gap-2"><i className="fa fa-phone text-primary"></i> Phone</p>
            <p className="text-gray-600">+91 923XXXXXXXX</p>
          </div>
          <div>
            <p className="font-semibold text-lg text-primary mb-2 flex items-center gap-2"><i className="fa fa-envelope text-primary"></i> Email</p>
            <p className="text-gray-600">SchedRx@gmail.com</p>
          </div>
          <div>
            <p className="font-semibold text-lg text-primary mb-2 flex items-center gap-2"><i className="fa fa-briefcase text-primary"></i> Careers at SchedRx</p>
            <p className="text-gray-600">Learn more about our teams and job openings.</p>
            <button className="bg-primary text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-indigo-700 transition-all mt-2">Explore Jobs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
