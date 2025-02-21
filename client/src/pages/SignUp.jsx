import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth'
import { toast } from 'react-toastify'
function SignUp() {
const navigate=useNavigate()
    const [formdata, setformData] = useState({username:"",email:"",password:""})
const handleChange=(e)=>{
          setformData({...formdata,[e.target.id]:e.target.value.trim()})
}
const handleSubmit = async (e)=>{
    e.preventDefault();
try {
  const res=  await fetch('/server/auth/signup',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formdata)
    
    })
    const data = await res.json()
if(data.success===false){
    return toast.error(data.message)
}

if(res.ok){
    navigate('/sign-in')
}

} catch (error) {
    console.log(error)
    toast.error(error)
}
}
    return (

        <div className='w-full py-20 md:space-x-5   min-h-[800px]   flex max-md:flex-col  items-center justify-center'>


        <div className="w-1/3 max-md:w-full md:h-[600px]   flex  flex-col items-center justify-center ">
            <div className='flex  items-center justify-center  w-full'>
                <h1 className='bg-gradient-to-br  from-purple-600  to-blue-600  text-white p-5 rounded-2xl sm:text-3xl  text-xl font-bold font-sans'>
                cv
                </h1>
                <span className='font-bold md:text-5xl text-2xl font-sans'>
                 maker
                 </span>
            </div>
            <h2 className='p-5  text-lg font-bold font-sans text-justify'>
            Bu bir cv oluşturma uygulamasıdır. Oturum açtıktan sonra cv oluşturabilir, oluşturduğunuz cvleri kaydederek pdf olarak indirebilir veya sonradan tekrar güncelleyebilirsiniz.
            </h2>

        </div>
        <div className="w-1/2 max-md:w-full space  md:h-[600px]   flex items-center justify-center ">
        <form className='flex flex-col max-w-96 w-full md:border border-black dark:border-white  
            transition-all duration-300  h-full items-center justify-center  gap-5  
            shadow-gray-400 p-5 rounded-lg '
                onSubmit={handleSubmit}>
                <div className='space-y-3 w-full'>
                    <div className='text-sm font-bold'>
                        your username
                        <input id='username' 
                        onChange={handleChange} 
                        className='p-3  border-2 rounded-lg bg-gray-200 
                        transition-all duration-300 outline-none w-full' 
                        type="text" 
                        placeholder='username'
                        autoComplete="username" />
                    </div>
                    <div 
                    className='text-sm font-bold'>
                        your email
                        <input 
                        autoComplete="email"
                        id='email' 
                        onChange={handleChange} 
                        className='p-3  border-2 rounded-lg bg-gray-200 transition-all duration-300 outline-none w-full' type="email" placeholder='email' />
                    </div>

                    <div 
                        className='text-sm font-bold'>
                        your password
                        <input 
                        id='password' 
                        onChange={handleChange} 
                        className='p-3  border-2 rounded-lg bg-gray-200 
                        transition-all duration-300 outline-none w-full' 
                        type="password" 
                        placeholder='password' 
                        autoComplete="current-password"
                        />
                    </div>
                </div>
                <button
                    type='submit'
                    
                    className='w-full p-4 bg-green-700 hover:bg-green-600 text-white font-bold  rounded-lg transition-all'>
                    SignUp
                </button>
                <OAuth />
<div className='w-full text-left'>
You have already an account <Link className='text-blue-600' to={'/sign-in'}>SignIn</Link>
</div>

            </form>
        </div>

    </div>
    )
}

export default SignUp