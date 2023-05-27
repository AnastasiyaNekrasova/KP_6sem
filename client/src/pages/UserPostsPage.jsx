import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostItem } from '../components/PostItem'
import { BsPlusSquare } from 'react-icons/bs'
import { getUserPosts } from '../redux/features/post/postSlice'
import { useNavigate } from 'react-router-dom'

export const UserPostsPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userPosts } = useSelector((state) => state.post)

    useEffect(() => {
        dispatch(getUserPosts())
    }, [dispatch])

    return (
        <div className='max-w-[1420px] mx-auto mt-32 md:mt-40 xl:mt-28'>
            <div className='flex justify-between gap-8'>
                <div className='scrollbar container max-h-[80vh] overflow-y-scroll mx-auto flex w-full flex-wrap px-4 pt-4 pb-12 gap-5 bg-[#292929] justify-center sm:justify-evenly xl:justify-evenly'>
                    {userPosts?.map((post, idx) => (
                        <PostItem post={post} key={idx} />
                    ))}
                </div>
                <div className='basis-2/5 md:basis-1/5 w-full cursor-pointer'>
                    <div className='text-xs md:text-base xl:text-lg uppercase text-white text-center'>
                        Add Post:
                    </div>
                    <div
                        onClick={() => {
                            navigate(`/posts/new`);
                        }}
                        title='Add Post'
                        className='w-full justify-center items-center'>
                        <BsPlusSquare className='w-3/5 h-full opacity-30 mx-auto' />
                    </div>
                </div>
            </div>
        </div>
    )
}
