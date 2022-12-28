import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Post from '../Post/Post';

const ShowUser = () => {

    const [user, setUser] = useState([])
    const [posts, setPosts] = useState([])
    const { id } = useParams()

    useEffect(() => {
        getUser();
        getPosts();
    }, [])

    const getUser = async () => {
        await axios.get(`http://localhost:3001/users/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
            },
        }).
            then((response) => {
                setUser(response.data)
            });
    }

    const getPosts = async () => {
        const response = await axios.get(`http://localhost:3001/posts/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
            },
        })
        setPosts(response.data)
    }

    return (
        <div>
            <Navbar link='/feed' />
            <div className='flex flex-row mt-10'>
                <div className='flex flex-col justify-center h-fit w-fit border-2 border-[#ff2a6d] absolute left-[2.5rem] text-[#05d9e8] mt-[3.25rem]'>
                    <div className='flex flex-row p-3 border-b border-[#ff2a6d]'>
                        <img src={user.picturePath} className="h-12 w-12 border-4 border-[#005678] rounded-full" />
                        <p className='text-[1.05rem] m-2 mt-3'>{user.firstName + ' ' + user.lastName}</p>
                    </div>
                </div>

                <div className='flex flex-col flex-wrap h-fit w-fit absolute left-1/2 text-center'>
                    {posts.length === 0 ?
                        <div className='text-[#059de8] w-40 mt-16 ml-[-5rem]'>
                            <h1 className='text-2xl text-[#05d9e8] mb-5'>No Posts...</h1>
                        </div> :
                        <div className='ml-[-12rem]'>
                            <h1 className='text-2xl text-[#05d9e8] mb-5'>All Posts</h1>
                            {posts.map((post) =>
                                post.userId === id ? (<Post post={post} />) : (<></>)
                            )}
                        </div>}

                </div>
            </div>
        </div>
    )
}

export default ShowUser