import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ link, signOut }) => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('jwtToken');
        navigate('/');
    }

    return (
        <div className='flex flex-row justify-center align-middle w-full h-20 border-b-4 border-[#ff2a6d]'>
            <Link to={link} className='my-auto'>
                <h1 className='text-4xl text-[#05d9e8]'>Lemniscate</h1>
            </Link>
            {signOut && <button onClick={logout} className='text-xl text-[#05d9e8] absolute right-0 p-6'>Sign out</button>}
        </div>
    )
}

export default Navbar