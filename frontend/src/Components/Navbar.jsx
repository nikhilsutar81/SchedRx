import React, { useContext ,useState } from 'react';
import {assets} from '../assets/assets';
import {NavLink, useNavigate} from 'react-router-dom';
import { AppContext } from "../Context/AppContex";


const Navbar = () => {

    const navigate = useNavigate();
    const {token, setToken,userData } = useContext(AppContext);
    const [showMenu,setShowMenu] = useState(false);

    const logout = () => {
      setToken(false)
      localStorage.removeItem('token');
    }

  return (
  <div className='flex items-center justify-between text-sm py-4 mb-5 bg-white shadow-md rounded-xl px-6 border-b border-b-gray-200'>
      <img onClick={()=>navigate('/')} className='w-32 cursor-pointer' src={assets.logo} alt="" />
  <ul className='hidden md:flex items-start gap-7 font-semibold'>

        <NavLink to='/' className={({isActive}) => isActive ? 'text-primary' : ''}>
          <li className='py-2 px-4 rounded-lg hover:bg-indigo-50 transition-all duration-200 cursor-pointer'>HOME</li>
        </NavLink>
        <NavLink to='/doctors' className={({isActive}) => isActive ? 'text-primary' : ''}>
          <li className='py-2 px-4 rounded-lg hover:bg-indigo-50 transition-all duration-200 cursor-pointer'>ALL DOCTORS</li>
        </NavLink>
        <NavLink to='/about' className={({isActive}) => isActive ? 'text-primary' : ''}>
          <li className='py-2 px-4 rounded-lg hover:bg-indigo-50 transition-all duration-200 cursor-pointer'>ABOUT</li>
        </NavLink>
        <NavLink to='/contact' className={({isActive}) => isActive ? 'text-primary' : ''}>
          <li className='py-2 px-4 rounded-lg hover:bg-indigo-50 transition-all duration-200 cursor-pointer'>CONTACT</li>
        </NavLink>



      </ul>
  <div className='flex items-center gap-4'>
        {
            token && userData
           ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 h-8 rounded-full' src={userData.image} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                    <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                    <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                    <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={()=> navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block shadow hover:bg-indigo-700 transition-all'>Create account</button>
        }
  <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden hover:scale-110 transition-transform' src={assets.menu_icon} alt="" />

        {/*------------------------Mobile Menu------------------- */}
        
<div className={` ${showMenu ? 'fixed w-full shadow-lg rounded-b-xl' : 'h-0 w-0' } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
  <div className='flex items-center justify-between px-5 py-6'>
    <img className='w-36' src={assets.logo} alt="" />
    <img className='w-7' onClick={()=> setShowMenu(false)} src={assets.cross_icon} alt="" />
  </div>
  <ul className='flex flex-col gap-3 items-center mt-5 px-5 text-lg font-semibold'>
  <NavLink  onClick={()=>setShowMenu(false)} to='/'><p className='px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all w-full text-center'>HOME</p></NavLink>
  <NavLink  onClick={()=>setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all w-full text-center'>ALL DOCTORS</p></NavLink>
  <NavLink  onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all w-full text-center'>ABOUT</p></NavLink>
  <NavLink  onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all w-full text-center'>CONTACT</p></NavLink>
  { token 
  ? <p className='px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-all w-full text-center' onClick={logout}>LOGOUT</p> 
  : <NavLink  onClick={()=>setShowMenu(false)} to='/login'><p className='px-4 py-2 rounded-lg bg-primary text-white hover:bg-indigo-700 transition-all w-full text-center'>LOGIN</p></NavLink>
  }

  </ul>
</div>
</div>
</div>
  );
}

export default Navbar;
