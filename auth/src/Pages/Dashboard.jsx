import { useEffect } from "react";
import {React, useState} from "react";
import { useNavigate } from "react-router";


const Dashboard = () =>{
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [totalusers, setTotalusers] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate();

    useEffect(() =>{
        const fetchDashboard = async () => {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token')
            if(!token){
                setError("No token found")
                setLoading(false)
                return
            }else{
                setLoading(true)
            }

            try{
                const res = await fetch('http://localhost:8000/dashboard',{
                    method:"GET",
                    headers:{
                        "Authorization":`Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                })
                const data = await res.json()
                if(!res.ok){
                    setError("Not Authorized")
                }else{
                    setUsers(data.users)
                    setTotalusers(data.totalusers)
                    setMessage(data.message)
                }
            }catch(error){
                setError("Network Error")
            }finally{
                setLoading(false)
            }
        }
        fetchDashboard();
    },[]);

    if (loading){
        return <p>Loading</p>
    }
    if (error){
        return <p>Error to Load</p>
    }

    const handlelogout = () =>{
        localStorage.removeItem("token")
        sessionStorage.removeItem("token")

        setUsers("")
        setTotalusers("")
        setMessage("")

        navigate("/")
        console.log(token)

    }

    return(
        <div className="container">
            <div className="flex flex-col justify-center items-center">
                <h1>Message</h1>
                <p className="text-xl font-extrabold">{message}</p>
                <h1>Total Users</h1>
                <p>{totalusers}</p>
                <h1>List of users</h1>
                <ul>
                    {users.map((users, index) => (
                        <li key={index}>{users.username} --- {users.email}</li>
                    ))}
                </ul>
                <button className="rounded border-2 bg-[#fa4315]" onClick={handlelogout}>Logout</button>
            </div>
        </div>
    )
}
export default Dashboard;