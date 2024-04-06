import React from 'react'
import { NavLink } from 'react-router-dom'
import toast from "react-hot-toast"
import {useDispatch} from "react-redux"
import { logoutUser } from '../redux/slices/authSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const handleLogout = async() =>{
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,{
        credentials:'include'
      })
      const data = await res.json()
      if(data.success){
        toast.success(data.message)
        dispatch(logoutUser())
      }
  }
  
  return (
    <header className='fixed w-full top-0'>
  <div className="container mx-auto flex  flex-wrap justify-between items-center p-5">
       <nav className='flex gap-3'>
       <NavLink to={"/"} className="text-xl font-bold border-r-2 pr-3">Contact Ms</NavLink>
       <NavLink to={"/"} className="text-lg hover:underline">Home</NavLink>
       <NavLink to={"/contacts"} className="text-lg hover:underline">Your Contacts</NavLink>
      
       </nav>
        <button className='px-2 py-1 bg-red-500 text-white rounded' onClick={handleLogout}>Logout</button>
  </div>
</header>

  )
}

export default Navbar