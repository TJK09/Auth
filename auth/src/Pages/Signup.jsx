import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSignup = async (e) =>{
        e.preventDefault();
        if(!username || !email || !password){
            setError("Enter Credentials")
            setLoading(false)
            return
        }

        try{
            const res = await fetch("http://localhost:8000/signup",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    username,
                    email,
                    password
                })
            })
            const data = await res.json()
            if(!res.ok){
                setError("invalid credentials")
                setLoading(false)
                setSuccess(false)
            }
            else{
                setSuccess(true)
                if(rememberMe){
                    localStorage.setItem("Token",data.token)
                    navigate('/dashboard')
                }
                setLoading(false)
            }
        }catch(error){
            setError("Network error")
        }finally{
            setLoading(false)
        }
    }

  return (
    <div>
        <div className="container mx-auto flex flex-col justify-center items-center">
            <form onSubmit={handleSignup} className="flex flex-col gap-5" >
                <input type="text" placeholder='Username' className='border-2 rounded-xl bg-black text-white' onChange={(e)=>setUsername(e.target.value)} />
                <input type="email" placeholder='Email' className='border-2 rounded-xl bg-black text-white' onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" className='border-2 rounded-xl bg-black text-white' onChange={(e)=>setPassword(e.target.value)} />
                <input type="checkbox" className='bg-black text-white ' onChange={(e)=>setRememberMe(e.target.checked)} />
                <button className='bg-[#fa4315] rounded  ' disabled={loading}>{loading ? 'Submitting':'Submit'}</button>
            </form>
            {error && <p className='text-red-800 text-lg'>{error}</p>}
            {success && <p className='text-green-700 text-lg'>Account Created Successfully</p>}
        </div>
    </div>
  )
}

export default Signup