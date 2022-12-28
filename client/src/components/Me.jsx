import React, { useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loading from './Loading/Loading'

const Me = () => {
    const [user, setUser] = useState([])
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        setisLoading(true);
        const token = localStorage.getItem('jwtToken')
        const decoded = jwt_decode(token)
        await axios.get(`http://localhost:3001/users/${decoded.userId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
            },
        }).
            then((response) => {
                setUser(response.data)
                setisLoading(false);
            });
    }

    return (
        <div className='flex flex-col justify-center h-fit w-fit border-2 border-[#ff2a6d] text-[#05d9e8] mt-[3.25rem]'>
            <div className='flex flex-row w-[18.5rem] h-20 p-3 border-b border-[#ff2a6d]'>
                {isLoading ? <Loading width='w-20' height='h-20' /> : <div className='flex flex-row'><img src={user.picturePath} className="h-12 w-12 border-4 border-[#005678] rounded-full" />
                    <p className='text-[1.05rem] m-2 mt-3'>{user.firstName + ' ' + user.lastName}</p></div>}

            </div>
            <div className='flex flex-col p-3'>
                <Link to={`/posts/${user._id}`}><p className='text-base'>My Posts</p></Link>
                <Link to='/create'><p className='text-base'>Create Post</p></Link>
            </div>
        </div>

    )
}

export default Me