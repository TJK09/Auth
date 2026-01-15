import React from 'react'
import { useState } from 'react'

export const Login2 = () => {
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
    <div>
        <form onSubmit={handleLogin}>
            <input type="text" value={username} placeholder='username' onChange={(e)=>setUsername(e.target.value)} />
            <input type='password' value={password} placeholder='password' onChange={(e) =>setPassword(e.target.value)} />
            <input type='checkbox' checked={rememberMe} onChange={(e) =>setRememberMe(e.target.checked)} />

            <button type='submit' disabled={loading}>{loading ? "Logging In": "Login"}</button>

            {error && <p>{error}</p>}
            {success && <p>Logged in</p>}
        </form>
    </div>
  )
}
