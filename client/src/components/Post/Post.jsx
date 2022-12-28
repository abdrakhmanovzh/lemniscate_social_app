import React from 'react'
import LikeBefore from '../../images/LikeBefore.svg'
import LikeAfter from '../../images/LikeAfter.svg'
import Comment from '../../images/CommentBlue.svg'
import { useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Post = ({ post }) => {
    const [liked, setLiked] = useState(false)
    const [commentNum, setCommentNum] = useState(0)
    const navigate = useNavigate()
    const [user, setUser] = useState([])

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        const token = localStorage.getItem('jwtToken')
        const decoded = jwt_decode(token)
        await axios.get(`http://localhost:3001/users/${decoded.userId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
            },
        }).
            then((response) => {
                setUser(response.data)
            });
    }

    useEffect(() => {
        getLike();
    })

    const getLike = async () => {
        const map = new Map(Object.entries(post.likes));
        if (map.get(user._id) !== undefined) {
            if (map.get(user._id) === true) {
                setLiked(true)
            }
        }
    }

    useEffect(() => {
        getComment()
    }, [])

    const getComment = () => {
        const arr = Object.values(post.comments);
        setCommentNum(arr.length)
    }

    const changeLike = async () => {
        setLiked(!liked)
        await axios.patch(`http://localhost:3001/posts/${post._id}/like`, { userId: user._id }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
            },
        })
    }

    const ShowComment = () => {
        navigate(`/post/${post._id}/comments`)
    }

    return (
        <div key={post._id} className="flex flex-col justify-center w-fit h-fit text-[#05d9e8] border-2 border-[#ff2a6d] mt-5">
            <div className='flex flex-row w-96 p-3 pr-3'>
                <img src={post.userPicturePath} className="h-12 w-12 border-4 border-[#005678] rounded-full" />
                <p className='text-[1.05rem] m-2 mt-3'>{post.firstName + ' ' + post.lastName}</p>
            </div>
            <div className='w-96 px-3'>
                <img src={post.picturePath} className="h-48 w-96 border-4 border-[#005678]" />
                <p className='p-3 text-[#d1f7ff]'>{post.description}</p>
            </div>
            <div className='flex flex-row justify-center mb-1'>
                <div className='flex flex-row'>
                    {liked === true
                        ?
                        <button onClick={changeLike}>
                            <img src={LikeAfter} className="h-8 w-8 border border-[#ff2a6d] p-1 m-2" />
                        </button>
                        :
                        <button onClick={changeLike}>
                            <img src={LikeBefore} className="h-8 w-8 border border-[#005678] p-1 m-2" />
                        </button>
                    }
                </div>
                <button onClick={ShowComment}>
                    <div className='flex flex-row border border-[#005678]'>
                        <img src={Comment} className="h-8 w-8 pl-1" />
                        <p className='text-[#05d9e8] text-xs mr-1 mt-2'>{commentNum}</p>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Post