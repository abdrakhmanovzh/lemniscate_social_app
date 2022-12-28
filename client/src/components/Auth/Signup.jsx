import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [picturePath, setpicturePath] = useState('')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const resp = await axios.post('http://localhost:3001/auth/register', {
                firstName,
                lastName,
                email,
                picturePath,
                password
            });
            navigate('/signin');
            console.log(resp.data);
        } catch (error) {
            setMsg(error);
        }
    }

    return (
        <div className='flex flex-col'>
            <Navbar link='/' />
            <h1 className='mx-auto mt-40 text-4xl text-[#05d9e8]'>Sign Up</h1>
            <div className='flex flex-col justify-center w-max h-96 border-4 border-[#ff2a6d] mt-4 mx-auto p-4 pb-8 text-center'>
                <form onSubmit={handleSubmit}>
                    <p className='text-[#05d9e8]'>{msg}</p>
                    <div className='my-5'>
                        <input
                            type="email"
                            className='border border-[#ff2a6d] w-72 bg-transparent text-[#05d9e8] p-1'
                            placeholder='enter email'
                            name='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='my-5'>
                        <input
                            type="text"
                            className='border border-[#ff2a6d] w-72 bg-transparent text-[#05d9e8] p-1'
                            placeholder='enter first name'
                            name='firstName'
                            value={firstName}
                            onChange={e => setfirstName(e.target.value)}
                        />
                    </div>
                    <div className='my-5'>
                        <input
                            type="text"
                            className='border border-[#ff2a6d] w-72 bg-transparent text-[#05d9e8] p-1'
                            placeholder='enter last name'
                            name='lastName'
                            value={lastName}
                            onChange={e => setlastName(e.target.value)}
                        />
                    </div>
                    <div className='my-5'>
                        <input
                            type="text"
                            className='border border-[#ff2a6d] w-72 bg-transparent text-[#05d9e8] p-1'
                            placeholder='enter picturePath url'
                            name='picturePathPath'
                            value={picturePath}
                            onChange={e => setpicturePath(e.target.value)}
                        />
                    </div>
                    <div className='my-5'>
                        <input
                            type="password"
                            className='border border-[#ff2a6d] w-72 bg-transparent text-[#05d9e8] p-1'
                            placeholder='enter password'
                            name='password'
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

export default Signup