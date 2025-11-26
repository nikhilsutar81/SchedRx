import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContex";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {backendUrl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Sign Up') {
        const {data} = await axios.post(backendUrl + '/api/user/register',{name,email,password})
        if(data.success){
          localStorage.setItem('token',data.token);
          setToken(data.token)
        }
        else{
          toast.error(data.message)
        }
      }
      else{
          const {data} = await axios.post(backendUrl + '/api/user/login',{email,password})
          if(data.success){
            localStorage.setItem('token',data.token);
            setToken(data.token)
          }
          else{
            toast.error(data.message)
          }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
   if(token){
     navigate('/');
   }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-700 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className="mb-6">
          Please {state === "Sign Up" ? "sign up" : "login"} to Book Appointment
        </p>
{
  state === 'Sign Up' && <div className="w-full">
  <p>Full Name</p>
  <input
    className="border border-zinc-300 rounded w-full p-2 mt-2 outline-indigo-600"
    onChange={(e) => {
      // Only allow alphabets and spaces
      const val = e.target.value.replace(/[^a-zA-Z ]/g, "");
      setName(val);
    }}
    value={name}
    type="text"
    placeholder="Full Name"
    required
    pattern="[A-Za-z ]+"
    title="Only alphabets and spaces allowed"
  />
</div>
}
        

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-2 outline-indigo-600"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-2 outline-indigo-600"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
          />
          <div className="text-xs mt-2 p-3 rounded bg-blue-50 border border-blue-200">
            <span className="font-semibold text-blue-700 flex items-center mb-2">
              <svg className="w-4 h-4 mr-1 inline-block text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
              Password must meet all criteria:
            </span>
            <ul className="list-none pl-0 space-y-1">
              <li className="flex items-center text-blue-600">
                <svg className="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" /></svg>
                At least <span className="font-bold">8 characters</span>
              </li>
              <li className="flex items-center text-blue-600">
                <svg className="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" /></svg>
                <span className="font-bold">One uppercase</span> letter
              </li>
              <li className="flex items-center text-blue-600">
                <svg className="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" /></svg>
                <span className="font-bold">One lowercase</span> letter
              </li>
              <li className="flex items-center text-blue-600">
                <svg className="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" /></svg>
                <span className="font-bold">One number</span>
              </li>
              <li className="flex items-center text-blue-600">
                <svg className="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" /></svg>
                <span className="font-bold">One special character</span>
              </li>
            </ul>
          </div>
        </div>
        <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base my-5">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new Account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary cursor-pointer underline"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
