import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as Cloudinary } from "cloudinary";
import doctorModel from "../Models/doctorModel.js";
import appointmentModel from "../Models/appointmentModel.js";


//API to Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }

    //Validate E-mail Format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Enter a valid Emai",
      });
    }

    //Validate Password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter a Strong Password",
      });
    }

    //Hashing User Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
      address: { line1: '', line2: '' },
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// API for User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesnot exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({
        success: true,
        token,
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

//API to get User Profile Data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    return res.json({
      success: true,
      userData,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to Update User Profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !gender || !dob || !address) {
      return res.json({
        success: false,
        message: "Data Missing",
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      name: name,
      phone: phone,
      address: address,
      gender: gender,
      dob: dob,
    });

    if (imageFile) {
      // Upload Image to Cloudinary
      const imageUpload = await Cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    return res.json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to Book Appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({
        success: false,
        message: "Doctor Not Availble",
      });
    }

    let slots_booked = docData.slots_booked;

    // Checking For Slots Availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "Slot Not Availble",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Save New Slots data in Doctors data
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({
      success: true,
      message: "Appointment Booked",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to get User Appointment for Frontend My-Appointments Page
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;

    const appointments = await appointmentModel.find({ userId });

    return res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to Cancel Appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointmentsData = await appointmentModel.findById(appointmentId);

    // Verify Appointment User
    if (appointmentsData.userId !== userId) {
      return res.json({
        success: false,
        message: "Unauthorized Action",
      });
    }

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






export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
};
