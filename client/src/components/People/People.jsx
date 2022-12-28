import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'

const People = () => {

    const [users, setUsers] = useState([])
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        setisLoading(true);
        await axios.get(`http://localhost:3001/users`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
            },
        }).
            then((response) => {
                setUsers(response.data)
                setisLoading(false);
            });
    }

    return (
        <div className='flex flex-col justify-center w-fit h-fit border-2 border-[#ff2a6d] text-[#05d9e8] mt-5 p-3'>
            {isLoading ? <Loading /> : <div>{users.map(user => (
                <div>
                    <Link to={`/users/${user._id}`}><p>{user.firstName + ' ' + user.lastName}</p></Link>
                </div>
            ))}</div>}

        </div>
    )
}

export default People