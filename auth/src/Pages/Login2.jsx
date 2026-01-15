import React, { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();
        setError('')
        setSuccess(false)
        

        setLoading(true)
        setTimeout(()=>{
        if(username === 'Taimur' && password === '12345'){
            setSuccess(true)
            setLoading(false)
            setError("")

            if (rememberMe){
                localStorage.setItem("username",username);
            }else
                sessionStorage.setItem("username",username);


        }else {
            setError("Invalid Credentials.")
            setLoading(false)
        }
    },1000);
    };
  return (
    <div>
        <form onSubmit={handleLogin}>
            <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={(e) =>setPassword(e.target.value)} />
            <input type='checkbox' checked={rememberMe} onChange={(e) =>setRememberMe(e.target.value)} />
            <button type='submit' disabled={loading}>{loading ? "Logging in ...":"Login"}</button>

            {error && <p>{error}</p>}
            {success && <p>Login Successful</p>}
        </form>
    </div>
  )
}

export default Login;
