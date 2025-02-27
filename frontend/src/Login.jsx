import React, { useState } from 'react'
import axios from 'axios'
import routes from './utils/API'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [credential, setCredential] = useState({ email: "", password: "" });

    const handleChange = (event) => {
        setCredential({ ...credential, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const res = await axios.post(routes.loginRoute, credential);
            navigate('/content');
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">🔐 Login</h1>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={credential.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={credential.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <div className="flex justify-between mt-4">
                        <button type="submit" className="w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Login</button>
                        <button type="button" className="w-1/2 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition" onClick={() => setCredential({ email: "", password: "" })}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
