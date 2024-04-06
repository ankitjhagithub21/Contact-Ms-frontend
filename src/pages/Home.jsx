import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { NavLink, Navigate } from "react-router-dom"
import { setUser } from '../redux/slices/authSlice'
import Navbar from '../components/Navbar'

const Home = () => {
  const user = useSelector(state => state.auth.user)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const getUserFromServer = async () => {

    try{
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/user`, {
        credentials: 'include'
      })
      const data = await res.json()
      if (data.success) {
        dispatch(setUser(data.user))
      }

    }catch(error){
        
        console.log(error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
   getUserFromServer()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }
  if (!user) {
    return <Navigate to="/login" />
  }
  return (
   <>
   <Navbar/>
    <section className='h-screen w-full text-center flex flex-col items-center justify-center gap-5'>
      <h2 className='text-3xl font-bold'>Welcome {user.name}</h2>
      <p className='text-lg lg:text-xl'>Manage Your Contacts in very easy way.</p>
      <NavLink to={"/add"} className="text-lg bg-green-500 text-white px-4 py-1 font-medium rounded">Add Contact</NavLink>
    </section>
   </>

  )
}

export default Home