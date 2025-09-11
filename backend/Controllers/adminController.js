import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as Cloudinary } from "cloudinary";
import doctorModel from "../Models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../Models/appointmentModel.js";
import userModel from "../Models/userModel.js";

//API for adding Doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    //Checking for all data to add Doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ suucess: false, message: "Missing Details" });
    }

    //Validate E-mail Format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter a Valid E-mail",
      });
    }

    //Validate Password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please Enter a Strong Password",
      });
    }

    //Hashing Doctor Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Upload Image to Cloudinary
    const imageUpload = await Cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    return res.json({
      success: true,
      message: "Doctor Added Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// API for Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      return res.json({
        success: true,
        token: token,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to get all Doctors List for Admin Panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    return res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to get all Appointments List for Admin Panel
const allAppointments = async (req, res) => {
  try {
    
    const appointments = await appointmentModel.find({});
    return res.json({
      success: true,
      appointments,
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to Cancel Appointment for Admin Panel
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentsData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //Releasing Doctor Slots

    const { docId, slotDate, slotTime } = appointmentsData;

    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({
      success: true,
      message: "Appointment Cancelled",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to get Dashboard Data for Admin Panel
const adminDashboard = async (req, res) => {

  try {
    
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData ={
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0,5)
    }

    return res.json({
      success: true,
      dashData,
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};



export { addDoctor, loginAdmin, allDoctors, allAppointments, appointmentCancel, adminDashboard };