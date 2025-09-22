import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p className="text-xl md:text-2xl text-neutral-700 font-semibold">
          ABOUT US
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full max-w-[360px]" src={assets.about_image} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to SchedRx, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At SchedRx, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            SchedRx is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, SchedRx is here to support you every step of the
            way.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>Our vision at SchedRx is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>WHY <span className="text-gray-700 font-semibold">CHOOSE US</span></p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="border p-8 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer text-gray-600 rounded-lg shadow-md"><b>EFFICIENCY:</b><p>Streamlined appointment scheduling that fits into your busy lifestyle.</p></div>
        <div className="border p-8 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer text-gray-600 rounded-lg shadow-md"><b>CONVENIENCE:</b><p>Access to a network of trusted healthcare professionals in your area.</p></div>
        <div className="border p-8 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer text-gray-600 rounded-lg shadow-md"><b>PERSONALIZATION:</b><p>Tailored recommendations and reminders to help you stay on top of your health.</p></div>
      </div>
    </div>
  );
};

export default About;
