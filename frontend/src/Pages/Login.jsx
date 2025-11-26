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
          {state === "Sign Up" && (
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters and include:
              <br />- At least one uppercase letter<br />- At least one lowercase letter<br />- At least one number<br />- At least one special character
            </p>
          )}
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
