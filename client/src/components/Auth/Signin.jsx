import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post('http://localhost:3001/auth/login', {
                email,
                password
            }).then((result) => {
                localStorage.setItem('jwtToken', result.data.token)
                navigate('/feed');
            });
        } catch (error) {
            setMsg(error.message);
        }
    }

    return (
        <div className='flex flex-col'>
            <Navbar link='/' />
            <h1 className='mx-auto mt-40 text-4xl text-[#05d9e8]'>Sign In</h1>
            <div className='flex flex-col justify-center w-max h-48 border-4 border-[#ff2a6d] mt-4 mx-auto p-4 text-center'>
                <form onSubmit={handleSubmit}>
                    <p className='text-[#05d9e8]'>{msg}</p>
                    <div className='my-5'>
                        <input
                            type="email"
                            className='border border-[#ff2a6d] w-72 bg-transparent text-[#05d9e8] p-1'
                            placeholder='enter email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='my-5'>
                        <input
                            type="password"
                            className='border border-[#ff2a6d] w-72 bg-transparent text-[#05d9e8] p-1'
                            placeholder='enter password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-fit h-fit px-2 text-[#05d9e8] border border-[#05d9e8]">Enter</button>
                </form>
            </div>
        </div>
    )
}

export default Signin