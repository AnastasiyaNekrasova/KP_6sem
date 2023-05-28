import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth } from "../redux/features/auth/authSlice";
import { removePlant } from '../redux/features/plant/plantSlice';
import { toast } from 'react-toastify';

export const AdminPlantItem = ({ plant }) => {

    const [isHovered, setIsHovered] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuth = useSelector(checkIsAuth);

    const removePlantHandler = () => {
        try {
            dispatch(removePlant(plant._id))
            navigate('/')
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const handleLinkClick = () => {
        if (isAuth) {
            navigate(`/plants/${plant._id}`);
        } else {
            toast("Start membership! Sign up and join our community to continue!!!");
        }
    };

    return (
        <div
            onClick={handleLinkClick}
            className={`hover-grow ${isHovered ? 'hovered' : ''} bg-[#292929] my-1 cursor-pointer justify-between flex text-xs w-full md:text-base xl:text-lg p-2 text-gray-300 hover:bg-[#3E3E3E] hover:text-white gap-5`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {plant.imgUrl && (
                <div className=''>
                    <img
                        src={`http://localhost:5000/${plant.imgUrl}`}
                        alt='img'
                        className='min-w-[40px] h-[40px] w-[40px] mr-2 object-cover rounded-sm overflow-hidden'
                    />
                </div>
            )}
            <div className='-ml-4 xl:-ml-12 w-4/5'>
                <div className='overflow-hidden text-ellipsis whitespace-nowrap text-base'>
                    {plant.plantname}
                </div>
                <div className=''>
                    <div className='w-[17rem] md:w-[28rem] lg:w-[43rem] xl:w-[58rem] 2xl:w-[73rem] overflow-hidden flex text-xs text-ellipsis whitespace-nowrap'>
                        <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
                            {plant.descript}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-between gap-2 w-[140px]'>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1 text-xs text-white opacity-50">
                        <AiFillEye /> <span>{plant.views}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-white opacity-50">
                        <AiOutlineMessage /> <span>{plant.comments?.length || 0} </span>
                    </div>
                </div>

                <div className='flex gap-2'>
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            navigate(`/plants/${plant._id}/edit`);
                        }}
                        className='flex items-center justify-center gap-2 text-white opacity-50'
                    >
                        <AiTwotoneEdit className='text-xl' />
                    </button>
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            removePlantHandler();
                        }}
                        className='flex items-center justify-center gap-2 text-white opacity-50'
                    >
                        <AiFillDelete className='text-lg' />
                    </button>
                </div>
            </div>
        </div>
    )
}