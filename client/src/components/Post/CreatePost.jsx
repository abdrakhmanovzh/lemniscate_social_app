import React from 'react'
import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'

const CreatePost = () => {
    const [user, setUser] = useState([])
    const [image, setImage] = useState('')
    const [desc, setDesc] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const navigate = useNavigate();

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


    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:3001/posts', { userId: user._id, description: desc, picturePath: image }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
            },
        })
        navigate('/feed')
    }


    return (
        <div>
            {isLoading === true
                ? <Loading />
                :
                <div className='flex flex-col justify-center'>
                    <Navbar link='/feed' />
                    <form onSubmit={handleSubmit}>

                        <div className='text-center mt-10'>
                            <h1 className='text-[#05d9e8] text-2xl'>Create Post</h1>
                            <div className='flex flex-col w-96 border-2 border-[#ff2a6d] text-[#05d9e8] mt-5 mx-auto text-center'>

                                <div className='flex flex-row'>
                                    <img src={user.picturePath} className="h-12 w-12 border-4 border-[#005678] rounded-full m-2" />
                                    <input onChange={e => setImage(e.target.value)} value={image} type="text" placeholder='Image URL' className='p-1 m-3 w-full bg-transparent border-2 border-[#ff2a6d]' />
                                </div>
                                <div className='flex flex-row'>
                                    <textarea onChange={e => setDesc(e.target.value)} value={desc} type="text" placeholder="What is on your mind?" className='bg-transparent border-2 border-[#005678] w-full h-32 resize-none m-3 px-1 text-[#d1f7ff]' />
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='border-2 border-[#005678] w-fit h-fit px-1 mt-3 ml-[47.5%] text-[#05d9e8]'>Submit</button>
                    </form>

                </div>
            }
        </div>

    )
}

export default CreatePost