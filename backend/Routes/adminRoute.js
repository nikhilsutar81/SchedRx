import express from 'express';
import { loginAdmin, addDoctor, allDoctors, allAppointments, appointmentCancel, adminDashboard } from '../Controllers/adminController.js';
import upload from '../Middlewares/multer.js';
import authAdmin from '../Middlewares/authAdmin.js';
import { changeAvailability } from '../Controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.post('/all-doctors',authAdmin,allDoctors);
adminRouter.post('/change-availability',authAdmin,changeAvailability);
adminRouter.get('/appointments',authAdmin,allAppointments);
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel);
adminRouter.get('/dashboard',authAdmin,adminDashboard);

export default adminRouter;