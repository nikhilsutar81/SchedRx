import dotenv from "dotenv";
dotenv.config();

import connectDB from "../Config/mongodb.js";
import appointmentModel from "../Models/appointmentModel.js";

async function main() {
  await connectDB();

  const now = new Date();
  // Find appointments that are not cancelled and slot time/date is in the past
  const appointments = await appointmentModel.find({ cancelled: { $ne: true } });

  let cancelledCount = 0;
  for (const appt of appointments) {
    // Parse slotDate and slotTime
    if (!appt.slotDate || !appt.slotTime) continue;
    const [day, month, year] = appt.slotDate.split("_").map(Number);
    let slotDateTime = new Date(year, month - 1, day);
    // slotTime is like '01:00 PM' or '13:00'
    let timeMatch = appt.slotTime.match(/(\d{1,2}):(\d{2}) ?([APMapm]*)/);
    if (timeMatch) {
      let hour = Number(timeMatch[1]);
      let minute = Number(timeMatch[2]);
      let ampm = timeMatch[3].toLowerCase();
      if (ampm === "pm" && hour < 12) hour += 12;
      if (ampm === "am" && hour === 12) hour = 0;
      slotDateTime.setHours(hour, minute, 0, 0);
    }
    // If slotDateTime is in the past, cancel
    if (slotDateTime < now) {
      await appointmentModel.findByIdAndUpdate(appt._id, {
        cancelled: true,
        cancelReason: "Client didn't visit",
      });
      cancelledCount++;
    }
  }
  console.log(`Cancelled ${cancelledCount} missed appointment(s).`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});