import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PopularPlants } from "../components/PopularPlants";
import { PlantItem } from "../components/PlantItem";
import { getAllPlants } from "../redux/features/plant/plantSlice";
import { checkIsAuth, resetStatus } from "../redux/features/auth/authSlice";
import { BsPlusSquare } from 'react-icons/bs'
import { searching } from "../redux/features/plant/plantSlice";
import axios from "../utils/axios";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminPlantItem } from "../components/AdminPlantItem";

export const MainPage = () => {
  const isAuth = useSelector(checkIsAuth);
  const { user } = useSelector((state) => state.auth);
  const { plants, popularPlants } = useSelector((state) => state.plant);
  const [searchQuery, setSearchQuery] = useState("");
  const { status } = useSelector((state) => state.plant);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isAuth) {
      if (!user.isAvatarImageSet) {
        navigate("/setAvatar");
      }
    }
  }, [isAuth, user]);


  useEffect(() => {
    dispatch(getAllPlants());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlants = plants.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(plants.length / itemsPerPage);

  const handleClickPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!plants.length) {
    return (
      <div className="text-xl text-center text-white py-28">
        There are no plants ~(&gt;_&lt;) <br /> Catalog is empty!
      </div>
    );
  }


  const handleSearch = async () => {
    try {
      const trimmedQuery = searchQuery.trim();
      if (trimmedQuery !== '') {
        const result = await dispatch(searching(trimmedQuery))
        console.log(result.payload.plants.length);
        if (result.payload.plants.length === 0) {
          toast('No plants found');
          dispatch(getAllPlants())
        }
      }
      else dispatch(getAllPlants())
    } catch (error) {
      alert(error)
    }
  };

  return (
    <div className="max-w-[1420px] w-[90%] mx-auto  mt-24 md:mt-28 xl:mt-28">
      {user?.role[0] === "user" || !isAuth ? (
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-8">
          <div className="container mx-auto flex w-full flex-wrap px-4 pt-4 pb-12 gap-3 bg-[#292929] justify-center sm:justify-evenly xl:justify-evenly">
            {plants?.map((plant, idx) => (
              <PlantItem key={idx} plant={plant} />
            ))}
          </div>
          <div className="basis-2/5 md:basis-1/5 w-full flex flex-col gap-5">
            <div className=" w-full">
              <div className="text-sm md:text-base xl:text-lg uppercase text-white text-center sm:text-start">
                Popular:
              </div>
              <div className="flex justify-center sm:flex-col gap-[20px] sm:gap-0">
                {popularPlants?.map((plant, idx) => (
                  <PopularPlants key={idx} plant={plant} />
                ))}
              </div>
            </div>

            <div>
              <div className="search relative mb-2">
                <input
                  id="search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch();
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder=" "
                  className="block rounded-md px-6 pt-6 bb-1 w-full text-md text-white bg-white bg-opacity-20  appearance-none focus:outline-none foring-0 peer"
                />
                <label
                  htmlFor="search"
                  className="absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                >
                  Search
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <div className={`hover-grow ${isHovered ? 'hovered' : ''} flex h-12 bg-[#292929] text-xs w-full md:text-base xl:text-lg p-2 text-gray-300 hover:bg-[#3E3E3E] hover:text-white gap-5`}
            onClick={(e) => navigate('/plants/new')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <BsPlusSquare className="text-[32px]" />
          </div>
          <div className="w-full">
            {currentPlants?.map((plant, idx) => (
              <AdminPlantItem key={idx} plant={plant} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-5">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`mx-1 w-6 text-center rounded bg-gray-600 text-gray-200 hover:opacity-80 hover:text-white transition-colors duration-300 ${currentPage === index + 1 ? "bg-green-500 text-white" : ""
                    }`}
                  onClick={() => handleClickPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
