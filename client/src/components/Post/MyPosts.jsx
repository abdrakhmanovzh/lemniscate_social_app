import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import Navbar from '../Navbar/Navbar'
import Post from './Post'


const MyPosts = () => {
    const [user, setUser] = useState([])
    const [posts, setPosts] = useState([])
    const [isLoading, setisLoading] = useState(false);
    const { me } = useParams()

    useEffect(() => {
        getUser();
        getPosts();
    }, [])

    const getUser = async () => {
        setisLoading(true);
        await axios.get(`http://localhost:3001/users/${me}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
            },
        }).
            then((response) => {
                setUser(response.data)
            });
    }

    const getPosts = async () => {
        setisLoading(true);
        const response = await axios.get(`http://localhost:3001/posts/${me}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
            },
        })
        setPosts(response.data)
        setisLoading(false);
    }

    const deletePost = async (e, post) => {
        e.preventDefault();
        await axios.delete(`http://localhost:3001/posts/${post._id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
            },
        })
    }

    return (
        <div>
            {isLoading === true ? <Loading /> : <div><Navbar link='/feed' />
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
                                    post.userId === me ?
                                        (<>
                                            <Post post={post} />
                                            <button type='button' onClick={e => deletePost(e, post)} className='text-[#ff2a6d] mt-2 mb-5'>Delete</button>
                                        </>)
                                        :
                                        (<></>)
                                )}
                            </div>}

                    </div>
                </div></div>}

        </div>
    )
}

export default MyPosts