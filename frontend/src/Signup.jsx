import React, { useState } from 'react'
import axios from 'axios'
import routes from './utils/API'
import { Link, useNavigate } from 'react-router-dom'
const Signup = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        password: "",
        email: ""
    })
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    const handleReset = () => {
        setData({ name: "", password: "", email: "" })
    }
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const res = await axios.post(routes.signupRoute, data);
            handleReset();
            navigate('/login')
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    return (
        <div className='flex flex-col items-center bg-yellow-200 h-screen w-screen'>
            <h1>Signup</h1>
            <div className='flex flex-col justify-center bg-red-300 items-center'>
                <form className='flex flex-col items-center gap-10' onSubmit={handleSubmit}>
                    <input type='text' placeholder='Name' name="name" value={data.name} onChange={handleChange} required />
                    <input type='password' placeholder='Password' name="password" value={data.password} onChange={handleChange} required />
                    <input type='email' placeholder='Email' name="email" value={data.email} onChange={handleChange} required />
                    <div className='flex gap-10'>
                        <button type='submit'>Sign Up</button>
                        <button onClick={handleReset}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup