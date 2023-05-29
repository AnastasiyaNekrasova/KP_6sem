import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete, } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkIsAuth } from "../redux/features/auth/authSlice";

import axios from '../utils/axios'
import { removePlant } from '../redux/features/plant/plantSlice'
import { createComment, getRelatedModelComments } from '../redux/features/comment/commentSlice'
import { CommentItem } from '../components/CommentItem'

export const PlantPage = () => {

    const isAuth = useSelector(checkIsAuth);
    // const isUser = useSelector(checkRole);

    const [plant, setPlant] = useState(null)
    const [comment, setComment] = useState('')

    const { user } = useSelector((state) => state.auth)
    const { comments } = useSelector((state) => state.comment)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    const handleSubmit = () => {
        try {
            const uId = user._id
            const relatedModel = 'plants';
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
            const relatedModel = 'plants';
            const relatedId = params.id;
            dispatch(getRelatedModelComments({ relatedModel, relatedId }));
        } catch (error) {
            console.log(error);
        }
    }, [params.id, dispatch]);

    const fetchPlant = useCallback(async () => {
        const role = user.role[0]
        const { data } = await axios.get(`/plants/${params.id}`, { params: { role } })
        setPlant(data)
    }, [params.id])

    useEffect(() => {
        fetchPlant()
    }, [fetchPlant])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    if (!plant) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Loading...
            </div>
        )
    }
    return (
        <div className=' mt-32 md:mt-40 xl:mt-28'>
            <div className='flex gap-10 py-8'>
                <div className='w-2/3'>
                    <div className='flex flex-col basis-1/4 flex-grow'>
                        <div
                            className={
                                plant?.imgUrl
                                    ? 'flex rouded-sm h-80'
                                    : 'flex rounded-sm'
                            }
                        >
                            {plant?.imgUrl && (
                                <img
                                    src={`https://succulents.onrender.com/${plant.imgUrl}`}
                                    alt='img'
                                    className='object-cover w-full'
                                />
                            )}
                        </div>
                    </div>

                    <div className='text-white text-xl'>{plant.plantname}</div>
                    <p className='text-white opacity-60 text-xs pt-4'>
                        {plant.descript}
                    </p>

                    <div className='flex gap-3 items-center mt-2 justify-between'>
                        <div className='flex gap-3 mt-4'>
                            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                                <AiFillEye /> <span>{plant.views}</span>
                            </button>
                            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                                <AiOutlineMessage />{' '}
                                <span>{plant.comments?.length || 0} </span>
                            </button>
                        </div>
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
