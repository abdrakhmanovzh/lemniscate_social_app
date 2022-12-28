import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Post from './Post/Post';
import Me from './Me'
import Navbar from './Navbar/Navbar'
import People from './People/People';
import Loading from './Loading/Loading'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        getPosts();
    }, []);


    const getPosts = async () => {
        setisLoading(true);
        const response = await axios.get("http://localhost:3001/posts", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
            },
        }).catch((error) => {
            navigate('/error')
        });
        setPosts(response.data);
        setisLoading(false);
    }

    return (
        <div>
            {isLoading === true ?
                <Loading />
                :
                <div>
                    <Navbar link='/feed' signOut={true} />
                    <div className='flex flex-row mt-10 mx-10'>
                        <Me />
                        <div className='flex flex-col flex-wrap h-fit w-fit ml-[12rem] mr-auto text-center'>
                            {posts.length === 0 ? <div className='text-[#059de8]'>No posts</div> : <div>
                                <h1 className='text-2xl text-[#05d9e8] mb-5'>All Posts</h1>
                                {posts.map((post) => (
                                    <Post post={post} />
                                ))}</div>}
                        </div>
                        <div className='text-center'>
                            <h1 className='text-2xl text-[#05d9e8]'>People</h1>
                            <People />
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}

export default Profile