import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const PostComments = () => {
    const [post, setPost] = useState([])
    const [comments, setcomments] = useState([])
    const [comm, setComm] = useState('')

    const { postId } = useParams()

    useEffect(() => {
        getPost();
    }, [comments])

    const getPost = async () => {
        await axios.get(`http://localhost:3001/posts/single/${postId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
            },
        }).then(response => {
            setPost(response.data)
            setcomments(response.data.comments)
        })
    }

    const handleChange = (e) => {
        setComm(e.target.value)
    }

    const AddComment = async (e) => {
        e.preventDefault()
        { console.log(comm) }
        await axios.patch(`http://localhost:3001/posts/${postId}/comment`, { comm: comm }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
            },
        })
    }

    return (
        <div>
            <Navbar link='/feed' />
            <div className='flex flex-row'>
                <div key={post._id} className="flex flex-col justify-center w-fit h-fit text-[#05d9e8] border-2 border-[#ff2a6d] mt-10 ml-20">
                    <div className='flex flex-row w-96 p-3 pr-3'>
                        <img src={post.userPicturePath} className="h-12 w-12 border-4 border-[#005678] rounded-full" />
                        <p className='text-[1.05rem] m-2 mt-3'>{post.firstName + ' ' + post.lastName}</p>
                    </div>
                    <div className='w-96 px-3'>
                        <img src={post.picturePath} className="h-48 w-96 border-4 border-[#005678]" />
                        <p className='p-3 text-[#d1f7ff]'>{post.description}</p>
                    </div>
                </div>

                <div>
                    <div className='flex flex-col w-96 h-fit text-[#05d9e8] border-2 border-[#ff2a6d] mt-10 ml-20'>
                        <h1 className='text-2xl p-2 mb-2 w-full text-center border-b border-[#ff2a6d]'>Comments</h1>
                        <div className='mb-3'>
                            {comments.map(comment => (
                                <p className='ml-3'>{comment}</p>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={AddComment}>
                        <div className='flex flex-col w-96 h-fit mt-10 ml-20 border-2 border-[#ff2a6d] text-[#05d9e8]'>
                            <h1 className='text-xl p-2 mb-2 w-full text-center border-b border-[#ff2a6d]'>Add Comment</h1>
                            <input value={comm} onChange={handleChange} type='text' className='bg-transparent p-2 border-b border-[#ff2a6d] outline-none' placeholder='comment here' />
                            <button type='submit' className='w-full p-2'>Save</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default PostComments