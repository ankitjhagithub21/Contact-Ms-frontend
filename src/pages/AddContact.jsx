import React, { useState } from 'react'
import {Link,NavLink,useNavigate} from "react-router-dom"
import toast from "react-hot-toast"

const AddContact = () => {
    const initialData = {
        name:"",
        email:"",
        phone:"",
        address:""
    }
    const [formData,setFormData]= useState(initialData)
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })

    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(formData.name.length<3){
            toast.error("Name should be atleast 3 characters long.")
            return
        }
        if(formData.phone.length!=10){
            toast.error("Invalid phone number.")
            return
        }

        try{
            setLoading(true)
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/add-contact`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:'include',
                body:JSON.stringify(formData)
            })
            const data = await res.json()
            if(data.success){
                toast.success(data.message)
                setFormData(initialData)
                navigate("/contacts")
               
            }else{
                toast.error(data.message)
            }
    
        }catch(error){
            toast.error("Something went wrong.")
            console.error(error.message)
        }finally{
            setLoading(false) 
        }
    }

    
  return (
    <section  className='h-screen w-full flex items-center justify-center px-5'>
        <div className='border lg:w-1/2 w-full p-5 rounded shadow bg-white flex flex-col gap-5'>
            <h2 className='text-3xl font-bold text-green-500'>Add new contact</h2>
           <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
           <input type="text" placeholder='Contact name' className='border rounded p-2 text-lg' name='name' value={formData.name} onChange={handleChange} required autoComplete='off' />
            <input type="email" placeholder='Contact email' className='border rounded p-2 text-lg' name='email' value={formData.email} onChange={handleChange} required autoComplete='off' />
            <input type="text" placeholder='Contact phone number' className='border rounded p-2 text-lg' name='phone' value={formData.phone} onChange={handleChange} required autoComplete='off' />
            <input type="text" placeholder='Contact address' className='border rounded p-2 text-lg' name='address' value={formData.address} onChange={handleChange} required autoComplete='off' />
            <button type='submit' className='bg-green-500 hover:bg-green-600 text-white rounded text-xl p-2'>{loading ? 'Loading...':'Add'}</button>
            
           </form>
          <NavLink to={"/"} className="mx-auto text-blue-500 underline">Back to Home</NavLink>
        </div>
    </section>
  )
}

export default AddContact