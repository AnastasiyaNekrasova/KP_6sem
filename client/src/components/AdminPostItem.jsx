import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import { checkIsAuth } from "../redux/features/auth/authSlice";
import { removePost } from "../redux/features/post/postSlice";
import { toast } from "react-toastify";


export const AdminPostItem = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(checkIsAuth);
  const [postDeleted, setPostDeleted] = useState(false);

  const removePostHandler = () => {
    try {
      dispatch(removePost(post._id));
      toast("Post was deleted");
      setPostDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLinkClick = () => {
    if (isAuth) {
      navigate(`/posts/${post._id}`);
    } else {
      toast("Start membership! Sign up and join our community to continue!!!");
    }
  };

  return (
    <div onClick={handleLinkClick}
      className={`hover-grow ${isHovered ? 'hovered' : ''} bg-[#292929] my-1 cursor-pointer justify-between flex text-xs w-full md:text-base xl:text-lg p-2 text-gray-300 hover:bg-[#3E3E3E] hover:text-white gap-2`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {post.imgUrl ? (
        <div className="">
          <img
            src={`https://anastasiyanekrasova.github.io//${post.imgUrl}`}
            alt="img"
            className='min-w-[40px] h-[40px] w-[40px] mr-2 object-cover rounded-sm overflow-hidden'
          />
        </div>
      ) : (
        <div className = 'min-w-[40px] h-[40px] w-[40px] mr-2 object-cover rounded-sm overflow-hidden bg-white bg-opacity-20'></div>
      )}

      <div className='-ml-4 xl:-ml-12 w-4/5'>
        <div className='overflow-hidden text-ellipsis whitespace-nowrap text-base'>
          {post.title}
        </div>
        <div className=''>
          <div className='w-[17rem] md:w-[28rem] lg:w-[43rem] xl:w-[58rem] 2xl:w-[73rem] overflow-hidden flex text-xs text-ellipsis whitespace-nowrap'>
            <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
              {post.text}
            </div>
          </div>
        </div>
      </div>


      <div className='flex justify-between gap-2 w-[90px]'>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 text-xs text-white opacity-50">
            <AiFillEye /> <span>{post.views}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-white opacity-50">
            <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
          </div>
        </div>

        <div className='flex gap-2'>
          <button
            onClick={(event) => {
              event.stopPropagation();
              removePostHandler();
            }}
            className="flex items-center justify-center gap-2  text-white opacity-50"
          >
            <AiFillDelete className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};
