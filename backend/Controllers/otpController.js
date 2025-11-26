import nodemailer from "nodemailer";

// Store OTPs in memory for demo (use Redis/DB for production)
const otpStore = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "studentnikhil163@gmail.com",
    pass: "<YOUR_APP_PASSWORD>"
  }
});

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email required" });

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  const mailOptions = {
    from: "studentnikhil163@gmail.com",
    to: email,
    subject: "Your SchedRx OTP",
    text: `Your OTP is: ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to send OTP", error: err.message });
  }
};

export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ success: false, message: "Email and OTP required" });
  if (otpStore[email] === otp) {
    delete otpStore[email];
    return res.json({ success: true, message: "OTP verified" });
  }
  res.status(400).json({ success: false, message: "Invalid OTP" });
};
