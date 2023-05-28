import React, { useState } from "react";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import Moment from "react-moment";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const PostItem = ({ post }) => {
  
  const navigator = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  
  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Loading...</div>
    );
  
  }

  return (
    <div
      onClick={() => {
        navigator(`/posts/${post._id}`);
      }}
      className={`hover-grow ${isHovered ? 'hovered' : ''} w-4/5 flex flex-col hover:shadow-2xl hover:shadow-gray-500 rounded-sm p-4`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={post.imgUrl ? "flex rouded-sm h-80 justify-center bg-white bg-opacity-10 rounded-sm" : "flex rounded-sm"}>
        {post.imgUrl && (
          <img
            src={`http://localhost:5000/${post.imgUrl}`}
            alt="img"
            className="object-cover w-fit"
          />
        )}
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="text-xs text-white opacity-50">{post.username}</div>
        <div className="text-xs text-white opacity-50">
          <Moment date={post.createdAt} format="D MMM YYYY" />
        </div>
      </div>
      <div className="text-white text-xl">{post.title}</div>
      <p className="text-white opacity-60 text-xs pt-4 line-clamp-4">
        {post.text}
      </p>

      <div className="flex gap-3 items-center mt-2">
        <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
          <AiFillEye /> <span>{post.views}</span>
        </button>
        <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
          <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
        </button>
      </div>
    </div>
  );
};
