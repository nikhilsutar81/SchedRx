import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContex";
import { assets } from "../assets/assets";
import RelatedDoctors from "../Components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointments = () => {
  const navigate = useNavigate();
  const { docId } = useParams();
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null);
  const [docslots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const getAvailableSlots = async () => {
    if (!docInfo) return;
    setDocSlots([]);

    //Getting Current Date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      //Getting Date with Index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //Setting End Time of the date with Index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //Setting Hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth()+1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year ;
        const slotTime =formattedTime;

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true ;

        if(isSlotAvailable){
        //Add Slots to Array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        }
        

        //Increment Current Time By 30 mins.
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const bookAppointment = async () => {
     if(!token){
       toast.warn("Login to Book Appointment")
       return navigate('/login', { state: { from: `/appointments/${docId}` } });
     }
     
     if (!slotTime) {
      toast.warn("Please select a time slot.");
      return;
    }

     try {
       const date = docslots[slotIndex][0].datetime;
       let day = date.getDate()
       let month = date.getMonth()+1;
       let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year ;
      
      const {data} = await axios.post(backendUrl + '/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}});
      if(data.success){
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      }
      else{
        toast.error(data.message);
      }

     } catch (error) {
        console.log(error);
        toast.error(error.message);
     }

  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docslots);
  }, [docslots]);

  return (
    docInfo && (
      <div>
        {/*--------------------Doctor Details------------------*/}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border border-gray-900 text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment Fee:{" "}
              <span className="text-gray-600">${docInfo.fees}</span>
            </p>
          </div>
        </div>

         
        {/*--------------------Booking Slots------------------------*/}

        {docInfo.available 
        ? (
          <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full mt-4 overflow-x-scroll">
            {docslots.length && docslots.map((item,index) => (
              <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white': 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysofWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && [item[0].datetime.getDate()]}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-6">
            {docslots.length > 0 && docslots[slotIndex]?.map((item,index)=>(
                <p onClick={()=> setSlotTime(item.time)} className={`text-sm font-light cursor-pointer px-5 py-2 rounded-full flex-shrink-0 ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-500 border border-gray-400' }`} key={index}>{item.time.toLowerCase()}</p>
            ))}
          </div>
          <button onClick={bookAppointment} className="bg-primary text-white font-light text-sm px-10 py-3 rounded-full my-6">Book an Appointment</button>
        </div>
        )
        :<h2 className="flex items-center justify-center my-20 text-4xl font-medium text-red-500">Doctor Not Available</h2>
        }
        
        {/*----------------------------Listing Related Doctors-----------------*/}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointments;
