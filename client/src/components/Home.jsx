import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex flex-col justify-center'>
            <div className="flex flex-col justify-center w-1/2 h-64 mx-auto mt-60 border-2 border-x-8 border-[#ff2a6d]">
                <h1 className="text-6xl font-medium h-fit w-fit mx-auto text-[#05d9e8] [text-shadow:_2px_2px_3px_#d1f7ff]">Welcome to Lemniscate</h1>
                <h1 className="text-6xl font-medium h-fit w-fit mx-auto text-[#05d9e8] [text-shadow:_2px_2px_3px_#d1f7ff]">∞</h1>
            </div>
            <div className="h-fit mx-auto flex flex-row justify-evenly">
                <Link className='h-fit w-fit mt-10 p-2 mx-5 border-2 border-[#ff2a6d] text-[#05d9e8]' to="/signup">
                    <button className='h-fit w-fit text-lg'>Sign Up</button>
                </Link>
                <Link className='h-fit w-fit mt-10 p-2 mx-5 border-2 border-[#ff2a6d] text-[#05d9e8]' to="/signin">
                    <button className='h-fit w-fit text-lg'>Login</button>
                </Link>
            </div>
        </div>
    )
}

export default Home