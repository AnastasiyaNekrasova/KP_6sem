import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useLayoutEffect } from 'react'
import { useState } from 'react'
import { PlantItem } from '../components/PlantItem'
import axios from '../utils/axios'

export const UserPlantsPage = () => {
    const [plants, setPlants] = useState([]);
    const { user } = useSelector((state) => state.auth);

    const fetchMyPlants = async () => {
        try {
            const userId = user ? user._id : null;
            const { data } = await axios.get('/userplants', { params: { userId } });
            setPlants(data.plants);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user && user._id) {
            fetchMyPlants();
        }
    }, [user]);

    return (
        <div className='container  mt-32 md:mt-40 xl:mt-28 mx-auto flex w-0.98 flex-wrap px-4 pt-8 pb-12 gap-5 bg-[#292929] justify-center sm:justify-evenly xl:justify-evenly'>
            {
                plants.length === 0 
                ? (<p className='text-xl text-center text-white '>You still don't have any plants???<br/>ψ(▼へ▼メ)～→ ＼(º □ º l|l)/</p>) 
                : (plants.map((x, idx) => <PlantItem plant={x} key={idx} />))
            }
        </div>
    )
}
