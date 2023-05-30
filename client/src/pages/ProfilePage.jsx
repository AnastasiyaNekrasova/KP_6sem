import React, { useEffect, useState } from "react";
import { MdAlternateEmail } from 'react-icons/md'
import { RiPlantFill } from 'react-icons/ri'
import { BsFilePostFill } from 'react-icons/bs'
import { AiFillEye } from "react-icons/ai";


import axios from '../utils/axios'

import { useDispatch, useSelector } from "react-redux";

import vk from "../public/vk.svg";

export const ProfilePage = () => {

    const { user } = useSelector((state) => state.auth);
    const [viewsSum, setViewsSum] = useState('')
    const [postsCount, setPostsCount] = useState('')
    const [plantsCount, setPlantsCount] = useState('')

    const handleGetUserInfo = async () => {
        const userId = user._id;
        try {
            const { data } = await axios.get(`/userplants/getUserInfo/${userId}`);
            setViewsSum(data.viewsSum)
            setPostsCount(data.postsCount)
            setPlantsCount(data.plantsCount)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetUserInfo()
    }, [viewsSum])


    return (
        <div className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover mt-8">
            <div className="max-w-4xl flex items-center h-auto flex-wrap mx-auto my-32 ">
                <div
                    id="profile"
                    className="w-full rounded-lg l-lg shadow-2xl bg-white opacity-90 mx-6 "
                >
                    <div className="p-4 md:p-12 text-center ">
                        <div className="block  rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center">
                            <img src={user.avatarImage}></img>
                        </div>

                        <h1 className="text-3xl font-bold pt-4 ">{user.username}</h1>
                        <div className="mx-auto w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                        <p className="py-2 text-base font-bold flex items-center justify-center">
                            <MdAlternateEmail className="mx-3 text-[20px]" />
                            {user.email}
                        </p>

                        <div className="flex flex-col mx-auto md:w-[450px] gap-5 mt-2 items-center">
                            <p className="flex gap-1 items-center">
                                <RiPlantFill /> Суммарное количество просмотров: {viewsSum}
                            </p>
                            <p className="flex gap-1 items-center">
                                <BsFilePostFill /> Количество выложенных постов: {postsCount}
                            </p>
                            <p className="flex gap-1 items-center">
                                <AiFillEye/> Количество растений в домашнем каталоге: {plantsCount}
                            </p>
                        </div>

                        <div className="mt-4 pb-6 w-4/5 mx-auto flex flex-wrap items-center justify-center">
                            <a className="link" href="https://vk.com" data-tippy-content="VKontakte">
                                <img src={vk} className="max-w-4"></img>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
