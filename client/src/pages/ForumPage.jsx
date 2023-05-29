import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PopularPosts } from "../components/PopularPosts";
import { PostItem } from "../components/PostItem";
import { getAllPosts } from "../redux/features/post/postSlice";
import { checkIsAuth, resetStatus } from "../redux/features/auth/authSlice";
import { BsPlusSquare } from 'react-icons/bs'

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminPostItem } from "../components/AdminPostItem";

export const ForumPage = () => {

    const isAuth = useSelector(checkIsAuth);
    const { user } = useSelector((state) => state.auth);

    const [isHovered, setIsHovered] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

  const { posts, popularPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [posts]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;

  // Logic to determine the index range of posts to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const handleClickPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!posts.length) {
    return (
      <div className="text-xl text-center text-white py-28">
        There are no posts yet (＃￣0￣) <br /> Be the first! Share information
        with others!
      </div>
    );
  }

  return (
    <div className="max-w-[1420px] w-[90%] mx-auto mt-32 md:mt-40 xl:mt-28">
      {user?.role[0] === "user" || !isAuth ? (
        <div className="flex justify-between gap-8">
          <div className="scrollbar container max-h-[80vh] overflow-y-scroll mx-auto flex w-full flex-wrap px-4 pt-4 pb-12 gap-5 bg-[#292929] justify-center sm:justify-evenly xl:justify-evenly">
            {posts?.map((post, idx) => (
              <PostItem key={idx} post={post} />
            ))}
          </div>
          <div className="basis-2/5 md:basis-1/5 w-full">
            <div className="text-xs md:text-base xl:text-lg uppercase text-white ">
              Popular:
            </div>

            {popularPosts?.map((post, idx) => (
              <PopularPosts key={idx} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <div
            className={`hover-grow ${
              isHovered ? "hovered" : ""
            } flex h-12 bg-[#292929] text-xs w-full md:text-base xl:text-lg p-2 text-gray-300 hover:bg-[#3E3E3E] hover:text-white gap-5`}
            onClick={(e) => navigate("/posts/new")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <BsPlusSquare className="text-[32px]" />
          </div>
          <div className="w-full">
            {currentPosts?.map((post, idx) => (
              <AdminPostItem key={idx} post={post} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-5">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`mx-1 w-6 text-center rounded bg-gray-600 text-gray-200 hover:opacity-80 hover:text-white transition-colors duration-300 ${
                    currentPage === index + 1 ? "bg-green-500 text-white" : ""
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
