import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete, } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from '../utils/axios'
import { removePost } from '../redux/features/post/postSlice'
import { createComment, getRelatedModelComments } from '../redux/features/comment/commentSlice'
import { CommentItem } from '../components/CommentItem'

export const PostPage = () => {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')

    const { user } = useSelector((state) => state.auth)
    const { comments } = useSelector((state) => state.comment)
    const { posts } = useSelector((state) => state.post)

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    const [postDeleted, setPostDeleted] = useState(false);

    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id))
            toast('Post was deleted')
            setPostDeleted(true);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (postDeleted) {
            setPostDeleted(false); 
            navigate('/posts');
        }
    }, [postDeleted]);

    const handleSubmit = () => {
        try {
            const uId = user._id
            const relatedModel = 'posts';
            const relatedId = params.id;
            if (comment != '') {
                dispatch(createComment({ relatedModel, relatedId, comment, uId }));
                setComment('');
            }
            else {
                toast('Enter the comment field')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchComments = useCallback(async () => {
        try {
            const relatedModel = 'posts';
            const relatedId = params.id;
            dispatch(getRelatedModelComments({ relatedModel, relatedId }));
        } catch (error) {
            console.log(error);
        }
    }, [params.id, dispatch]);

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    if (!post) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Loading...
            </div>
        )
    }
    return (
        <div className='mt-32 md:mt-40 xl:mt-28 w-[90%] mx-auto'>
            <button className='text-sm md:text-basic xl:text-lg text-white border max-w-fit border-white font-bold hover:bg-[#292929] py-1 px-5 mt-5'>
                <Link className='flex' to={'/forum'}>
                    Back
                </Link>
            </button>

            <div className='flex gap-10 py-8'>
                <div className='w-2/3'>
                    <div className='flex flex-col basis-1/4 flex-grow'>
                        <div
                            className={
                                post?.imgUrl
                                    ? 'flex rouded-sm h-80'
                                    : 'flex rounded-sm'
                            }
                        >
                            {post?.imgUrl && (
                                <img
                                    src={`http://localhost:5000/${post.imgUrl}`}
                                    alt='img'
                                    className='object-cover w-full'
                                />
                            )}
                        </div>
                    </div>

                    <div className='flex justify-between items-center pt-2'>
                        <div className='text-xs text-white opacity-50'>
                            {post.username}
                        </div>
                        <div className='text-xs text-white opacity-50'>
                            <Moment date={post.createdAt} format='D MMM YYYY' />
                        </div>
                    </div>
                    <div className='text-white text-xl'>{post.title}</div>
                    <p className='text-white opacity-60 text-xs pt-4'>
                        {post.text}
                    </p>

                    <div className='flex gap-3 items-center mt-2 justify-between'>
                        <div className='flex gap-3 mt-4'>
                            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                                <AiFillEye /> <span>{post.views}</span>
                            </button>
                            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                                <AiOutlineMessage />{' '}
                                <span>{post.comments?.length || 0} </span>
                            </button>
                        </div>

                        {user?._id === post.author && (
                            <div className='flex gap-3 mt-4'>
                                <button
                                    onClick={() => navigate(`/posts/${params.id}/edit`)}
                                    className='flex items-center justify-center gap-2 text-white opacity-50'>
                                    <AiTwotoneEdit />
                                </button>
                                <button
                                    onClick={removePostHandler}
                                    className='flex items-center justify-center gap-2  text-white opacity-50'
                                >
                                    <AiFillDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className='w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm'>
                    <form
                        className='flex gap-2'
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type='text'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Comment'
                            className='text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700'
                        ></input>
                        <button
                            type='submit'
                            onClick={handleSubmit}
                            className='flex justify-center items-center bg-[#292929] text-xs text-white rounded-sm py-2 px-4'
                        >
                            Send
                        </button>
                    </form>

                    {Array.isArray(comments) && comments.map((cmt) => (
                        <CommentItem key={cmt._id} cmt={cmt} />
                    ))}
                </div>
            </div>
        </div>
    )
}
