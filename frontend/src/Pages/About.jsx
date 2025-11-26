import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-white min-h-[80vh] py-10">
      <div className="text-center mb-10">
        <p className="text-3xl md:text-4xl text-primary font-bold tracking-wide">About Us</p>
        <p className="text-gray-500 mt-2">Learn more about SchedRx and our mission.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-12 justify-center items-center mb-10">
        <img className="w-full max-w-[360px] rounded-xl shadow-lg" src={assets.about_image} alt="About" />
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 min-w-[300px] max-w-[500px] border border-gray-100 text-base text-gray-700">
          <p>
            Welcome to <span className="font-bold text-primary">SchedRx</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. At SchedRx, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            SchedRx is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, SchedRx is here to support you every step of the way.
          </p>
          <b className="text-primary">Our Vision</b>
          <p>
            Our vision at SchedRx is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>
      <div className="text-xl my-4 text-center">
        <p>WHY <span className="text-primary font-bold">CHOOSE US</span></p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 justify-center mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[16px] bg-white rounded-xl shadow hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer text-gray-600"><b className="text-primary">EFFICIENCY:</b><p>Streamlined appointment scheduling that fits into your busy lifestyle.</p></div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[16px] bg-white rounded-xl shadow hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer text-gray-600"><b className="text-primary">CONVENIENCE:</b><p>Access to a network of trusted healthcare professionals in your area.</p></div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[16px] bg-white rounded-xl shadow hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer text-gray-600"><b className="text-primary">PERSONALIZATION:</b><p>Tailored recommendations and reminders to help you stay on top of your health.</p></div>
      </div>
    </div>
  );
};

export default About;
