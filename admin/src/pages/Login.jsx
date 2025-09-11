import React, { useContext, useState, } from 'react';
import {AdminContext} from '../Context/AdminContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { DoctorContext } from '../Context/DoctorContext';

const Login = () => {

    const [state,setState] = useState('Admin');
    const {setAToken,backendUrl} = useContext(AdminContext);
    const {setDToken} = useContext(DoctorContext);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {

           if(state === 'Admin')
            {
            const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
            if(data.success)
            {
            localStorage.setItem('aToken',data.token);
            setAToken(data.token);
            navigate('/admin-dashboard');
            }
            else{
                toast.error(data.message);
            }
           }
           else
           {
            const {data} = await axios.post(backendUrl + '/api/doctor/login',{email,password})
            if(data.success)
            {
            localStorage.setItem('dToken',data.token);
            setDToken(data.token);
            navigate('/doctor-dashboard')
            }
            else{
                toast.error(data.message);
            }
           }
            
        } catch (error) {
            console.log("Error")
        }
    }

  return (
  <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
    <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl m-auto font-semibold'><span className='text-primary'>{state}</span>Login</p>
        <div className='w-full'>
            <p>Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1 outline-indigo-700' placeholder='Email' type="email" required />
        </div>
        <div className='w-full'>
            <p>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1 outline-indigo-700' placeholder='Password' type="password" required />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base mt-6'>Login</button>
        {
            state === 'Admin'
            ? <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
            : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>
        }
    </div>
  </form>
      

  );
}

export default Login;
