import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import { toast } from "react-toastify"
import { checkIsAuth } from "../redux/features/auth/authSlice";

export const PopularPlants = ({ plant }) => {

    const isAuth = useSelector(checkIsAuth);

    const [isHovered, setIsHovered] = useState(false);

    const navigate = useNavigate()

    const handleLinkClick = () => {
        if (isAuth) {
            navigate(`/plants/${plant._id}`);
        } else {
            toast("Start membership! Sign up and join our community to continue!!!");
        }
    };

    return (
        <div className='bg-[#292929] my-1 justify-between cursor-pointer'>
            <div
                onClick={handleLinkClick}
                className={`hover-grow ${isHovered ? 'hovered' : ''} flex text-xs w-full md:text-base xl:text-lg p-2 text-gray-300 hover:bg-[#3E3E3E] hover:text-white`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>

                <div className='w-full flex items-center pr-[6px]'>
                    {plant.imgUrl && (
                        <div className=''>
                            <img
                                src={`https://succulents.onrender.com/${plant.imgUrl}`}
                                alt='img'
                                className='min-w-[30px] h-[30px]  w-[30px] mr-2 object-cover rounded-sm overflow-hidden'

                            />
                        </div>
                    )}
                    <div className='w-full max-w-[65px] md:max-w-[100px]'>
                        <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
                            {plant.plantname}
                        </div>
                    </div>
                </div>

                <div className='flex gap-2'>
                    <div className='flex items-center gap-1 text-xs text-white opacity-50'>
                        <AiFillEye /> <span>{plant.views}</span>
                    </div>
                    <div className='flex items-center gap-1 text-xs text-white opacity-50'>
                        <AiOutlineMessage />{' '}
                        <span>{plant.comments?.length || 0} </span>
                    </div>
                </div>

            </div>
        </div>
    )
}
