import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () =>{

    const navigate = useNavigate();
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const handleLogin = async (e)  =>{
        e.preventDefault();
        if(!username || !password){
            setError("Error! Enter Username and Password")
            setLoading(false)
            return
        }
        setLoading(true)
        setError('')
        setSuccess(false)

        try{
            const response = await fetch("http://localhost:8000/login",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({username,
                    password})
            });
            const data = await response.json()

            if(!response.ok ){
                setError("Invalid Credentials")
                setSuccess(false)
                setLoading(false)
            }else{
                setLoading(false)
                if(rememberMe){
                    localStorage.setItem('token', data.token)
                    console.log("token in Local storage",data.token)
                }else{
                    sessionStorage.setItem("token",data.token)
                    console.log('token with Session storage', data.token)
                }
                setSuccess(true)
                navigate("/dashboard")
            }
        }catch(error){
            setError("Network Error")
        }
        
    }

    const handlelogout = async (e) => {
        e.preventDefault();
        localStorage.removeItem("Token")

        setUsername("")
        setPassword("")
    }


    return(
        <div>
            <div className="container mx-auto flex flex-col justify-center items-center gap-5">
                <form action="" onSubmit={handleLogin} className="flex flex-col justify-center items-center gap-5">
                    <label htmlFor="">UserName</label>
                    <input type="text" className="rounded border-2 border-black" onChange={(e)=>setUsername(e.target.value)} />
                    <label htmlFor="">Password</label>
                    <input type="password" className="rounded border-2 border-black " onChange={(e)=>setPassword(e.target.value)}/>
                    <input type="checkbox" className="rounded border-2 border-black" onChange={(e)=>setRememberMe(e.target.checked)} />
                    <button className="rounded border-2 w-full bg-[#fa4315] text-white" disabled={loading}>{loading ? 'Submitting':'Submit'}</button>
                </form>
                {error && <p className="text-red-700 text-lg font-bold">Login Failed</p>}
                {success && <p className="text-green-600 text-lg font-bold">Logged In</p>}
            </div>
        </div>
    )
}

export default Login;