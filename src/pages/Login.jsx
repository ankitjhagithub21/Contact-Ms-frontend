import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import toast from "react-hot-toast"
import {useDispatch} from "react-redux"

const Login = () => {
    const initialData = {
        email:"",
        password:"",
    }
    const [formData,setFormData]= useState(initialData)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })

    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        
        if(formData.password.length<6){
            toast.error("Password should be atleast 6 characters long.")
            return
        }

        try{
            setLoading(true)
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`,{
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
                navigate("/")
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
    <section id='login' className='h-screen w-full flex items-center justify-center  px-5'>
        <div className='border lg:w-1/3 md:w-1/2 w-full p-5 rounded shadow bg-white flex flex-col gap-5'>
            <h2 className='text-3xl font-bold text-green-500'>Login to your account</h2>
           <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
           
            <input type="email" placeholder='Your email' className='border rounded p-2 text-lg' name='email' value={formData.email} onChange={handleChange} required autoComplete='off' />
            <input type="password" placeholder='Your password' className='border rounded p-2 text-lg' name='password' value={formData.password} onChange={handleChange} required autoComplete='off' />
            <button type='submit' className='bg-green-500 hover:bg-green-600 text-white rounded text-xl p-2'>{loading ? 'Loading...':'Login'}</button>
           </form>
           <p className='text-lg'>Don't have an account ? <Link to={"/register"} className='text-blue-500 underline'>Register here</Link> </p>
        </div>
    </section>
  )
}

export default Login