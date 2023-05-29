import React, { useState, useEffect } from "react";
import { AiFillEye, AiOutlineMessage, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { BsDropletHalf } from "react-icons/bs";
import Moment from "react-moment";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth } from "../redux/features/auth/authSlice";
import { addPlantToUser, deletePlantFromUser, setPlantInterval } from "../redux/features/plant/plantSlice";

export const PlantItem = ({ plant }) => {
  const isAuth = useSelector(checkIsAuth);
  const { status } = useSelector((state) => state.plant);
  const { user } = useSelector((state) => state.auth);

  const [lastWatering, setLastWatering] = useState(plant.lastWatering);
  const [interval, setWaterInt] = useState(plant.interval);
  const [isWateringNeeded, setIsWateringNeeded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleAddPlantToUser = () => {
    const userId = user._id;
    const plantId = plant._id;
    dispatch(addPlantToUser({ userId, plantId }));
    if(status)
      toast(status);
  };

  const handleChangeWateringDate = async () => {
    const userId = user._id;
    const plantId = plant._id;
    try {
      const { data } = await axios.put(`/userplants`, { userId, plantId });
      setLastWatering(data.watering);
      dispatch(setPlantInterval(data.interval));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeInterval = async (e) => {
    const newInterval = e.target.value;
    setWaterInt(e.target.value);
    const userId = user._id;
    const plantId = plant._id;
    try {
      const { data } = await axios.put(`/userplants/interval`, { userId, plantId, interval: newInterval });
      dispatch(setPlantInterval(data.interval));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePlantFromUser = async () => {
    const userId = user._id;
    const plantId = plant._id;
    dispatch(deletePlantFromUser({ userId, plantId }));
    if (status) {
      toast(status);
    }
  };

  const lastWateringDate = lastWatering;
  useEffect(() => {
    const checkWateringNeeded = () => {
      const lastWateringTime = new Date(lastWateringDate);
      const currentTime = new Date();
      const timeDiff = currentTime - lastWateringTime;
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      const isWateringNeeded = hoursDiff > interval * 24;
      setIsWateringNeeded(isWateringNeeded);
    };

    checkWateringNeeded();
  }, [lastWateringDate, interval]);

  useEffect(() => {
    setLastWatering(plant.lastWatering);
  }, [plant.lastWatering]);

  const handleLinkClick = () => {
    if (isAuth) {
      navigate(`/plants/${plant._id}`);
    } else {
      toast("Start membership! Sign up and join our community to continue!!!");
    }
  };

  return (
    <div
      className={`hover-grow ${isHovered ? "hovered" : ""} w-full md:w-64 p-5 flex flex-col items-center hover:shadow-2xl hover:shadow-gray-500 rounded-sm cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`hover-grow ${isHovered ? "hovered" : ""} flex rouded-sm md:w-52 h-52 w-full min-w-0`}
        onClick={handleLinkClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {plant.imgUrl && <img src={`https://succulents.onrender.com/${plant.imgUrl}`} alt="img" className="object-cover w-full" />}
      </div>

      <div className="flex flex-col justify-start md:w-52 w-full">
        <div className="flex justify-between gap-1 mt-2">
          <div className="text-white text-xl md:w-36 w-full min-w-0">{plant.plantname}</div>
          {isWateringNeeded && (
            <button
              onClick={(event) => {
                event.preventDefault();
                handleChangeWateringDate();
              }}
              className="watering-notification w-fit h-fit mt-[1px] py-1.5 px-1.5 items-center justify-center bg-blue-300 rounded-full hover:bg-blue-600"
            >
              <BsDropletHalf className="text-blue-900" />
            </button>
          )}
          {location.pathname === "/" ? (
            isAuth && (
              <button
                className="py-1  px-[6px] h-7 bg-white bg-opacity-20 rounded-full hover:bg-teal-600"
                onClick={(event) => {
                  event.preventDefault();
                  handleAddPlantToUser();
                }}
              >
                <AiOutlinePlus />
              </button>
            )
          ) : (
            <button
              className="py-1 px-[7px] h-[30px] bg-white bg-opacity-20 rounded-full hover:bg-red-600"
              onClick={(event) => {
                event.preventDefault();
                handleDeletePlantFromUser();
              }}
            >
              <AiOutlineDelete />
            </button>
          )}
        </div>

        {location.pathname === "/" && (
          <p className="text-white opacity-60 text-xs pt-2 line-clamp-4">{plant.descript}</p>
        )}

        {location.pathname === "/" && (
          <div className="flex justify-between items-center">
            <div className="w-full flex gap-3 items-center mt-2 bottom-0">
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiFillEye /> <span>{plant.views}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiOutlineMessage /> <span>{plant.comments?.length || 0}</span>
              </button>
            </div>
          </div>
        )}

        {location.pathname === "/plants" && (
          <div>
            <div className="text-xs text-white opacity-50 w-full mt-2">
              Last watering:{" "}
              <Moment fromNow ago>
                {lastWatering}
              </Moment>{" "}
              ago
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-xs text-white opacity-50">Watering interval:</div>
              <div className="w-fit h-fit flex">
                <input
                  type="number"
                  className="block rounded-md px-1 w-10 text-xs text-white bg-white bg-opacity-20  appearance-none focus:outline-none"
                  value={interval}
                  onChange={handleChangeInterval}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};