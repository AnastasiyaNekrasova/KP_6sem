import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'

export const PopularPosts = ({ post }) => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='bg-[#292929] my-1 justify-between'>
            <Link
                to={`/posts/${post._id}`}
                className={`hover-grow ${isHovered ? 'hovered' : ''} flex text-xs w-full md:text-base xl:text-lg p-2 text-gray-300 hover:bg-[#3E3E3E] hover:text-white`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>

                <div className='w-full flex items-center pr-[6px]'>
                    {post.imgUrl && (
                        <div className=''>
                            <img
                                src={`https://anastasiyanekrasova.github.io//${post.imgUrl}`}
                                alt='img'
                                className='min-w-[30px] h-[30px]  w-[30px] mr-2 object-cover rounded-sm overflow-hidden'

                            />
                        </div>
                    )}
                    <div className='w-full max-w-[65px] md:max-w-[100px]'>
                        <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
                            {post.title}
                        </div>
                    </div>
                </div>

                <div className='flex gap-2'>
                    <div className='flex items-center gap-1 text-xs text-white opacity-50'>
                        <AiFillEye /> <span>{post.views}</span>
                    </div>
                    <div className='flex items-center gap-1 text-xs text-white opacity-50'>
                        <AiOutlineMessage />{' '}
                        <span>{post.comments?.length || 0} </span>
                    </div>
                </div>

            </Link>
        </div>
    )
}
