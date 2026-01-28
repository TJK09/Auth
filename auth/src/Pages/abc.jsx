import React from 'react'
import { useState } from 'react'

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState ('')
    const [success, setSuccess] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault();
        if(! username || !password){
        setError("username and password are required")
        setLoading(false);
        return;
    }
        setLoading(true);
        setError('');
        setSuccess(false);

        try{
            const res = await fetch("http://localhost:8000/login",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({username,password}),
            })
            const data = await res.json();

            if(!res.ok){
                setError("Invalid Credentials")
            }else{
                setSuccess(true);
                if(rememberMe){
                    localStorage.setItem("token",data.token);
                    console.log(data.token);
                }else 
                    sessionStorage.setItem("token", data.token);
            }
        }catch(err){
            setError("Network Error");
        }
        finally{
            setLoading(false)
        }
    }
  return (
    <>
    
    <div className='w-full min-h-screen flex flex-col bg-gray-700 text-white justify-center items-center'>
        <h2 className='text-2xl font-bold text-gray-400'>React Login</h2>
        <form className='w-72 h-72 flex flex-col border-2 border-b-blue-50  rounded' onSubmit={handleLogin}>
            <input className='m-5 border border-[#fa4315] rounded ' type="text" value={username} placeholder='username' onChange={(e)=>setUsername(e.target.value)} />
            <input className='m-5 border border-[#fa4315] rounded mb-5'type='password' value={password} placeholder='password' onChange={(e) =>setPassword(e.target.value)} />
            <input className='inline-block m-5' type='checkbox' checked={rememberMe} onChange={(e) =>setRememberMe(e.target.checked)} />

            <button className='m-5 bg-[#fa4315] rounded hover:bg-red-400 transition-colors duration-300' type='submit' disabled={loading}>{loading ? "Logging In": "Login"}</button>

            {error && <p>{error}</p>}
            {success && <p>Logged in</p>}
        </form>
    </div>
    </>
  )
}
export default Login;
