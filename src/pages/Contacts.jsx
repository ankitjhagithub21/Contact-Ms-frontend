import React, { useEffect, useState } from 'react'
import ContactBox from '../components/ContactBox'
import { NavLink } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux"
import { setContacts } from '../redux/slices/contactSlice'

const Contacts = () => {
    const contacts = useSelector(state=>state.contacts.value)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        const getUserContacts = async() =>{
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/contacts`,{
                credentials:'include'
            })
            const data = await res.json()
            if(data.success){
               dispatch(setContacts(data.contacts))
            }
            setLoading(false)
        }

        getUserContacts()
    },[])

    if(loading){
        return <p>Loading...</p>
    }
    
  return (
    <section className='py-12'>
      <div className='container mx-auto flex justify-between items-center border-b pb-2 px-5 mb-10 lg:text-xl text-lg'>
      <h2 className=' text-center font-bold'>Your Contacts</h2>
        <NavLink to={"/"} className="bg-indigo-500 px-2 py-1 rounded text-white">Home</NavLink>
        
      </div>
     {
      contacts.length == 0 ? <p className='text-center text-3xl'>No contact found.</p> :  <div className="container mx-auto flex flex-wrap">
      <div className="flex flex-wrap w-full">

        {
          contacts.map((contact)=>{
              return <ContactBox key={contact._id} contact={contact}/>
          })
        }
      </div>
    </div>
     }
    </section>
  )
}

export default Contacts