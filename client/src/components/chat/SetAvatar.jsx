import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../../utils/APIRoutes";
import { getMe } from "../../redux/features/auth/authSlice.js";

export const SetAvatar = () => {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const dispatch = useDispatch();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user.isAvatarImageSet) {
      navigate('/');
    }
  }, [user.isAvatarImageSet]);

  const setProfilePicture = async () => {
    if (selectedAvatar === '') {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: 'data:image/svg+xml;base64,' + avatars[selectedAvatar],
      });
      dispatch(getMe());
    }
  };

  const getAvatar = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getAvatar()
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  const [hoveredAvatarIndex, setHoveredAvatarIndex] = useState(-1);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container isHovered={isHovered}>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${selectedAvatar === index ? "selected" : ""} hover-grow ${hoveredAvatarIndex === index ? "hovered" : ""}`}
                  onMouseEnter={() => setHoveredAvatarIndex(index)}
                  onMouseLeave={() => setHoveredAvatarIndex(-1)}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={index}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button
            onClick={setProfilePicture}
            className={`hover-grow ${isHovered ? "hovered" : ""} submit-btn`}
            onMouseEnter={() => setIsHovered()}
            onMouseLeave={() => setIsHovered()}
          >
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #141414;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
      font-size:30px;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
      &:hover {
        transform: scale(1.4);
      }
    }
    .selected {
      border: 0.4rem solid rgba(255, 255, 255, 0.3);
    }
  }
  .submit-btn {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 1rem 1.5rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.2rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: rgba(255, 255, 255, 0.4);
      transform: scale(1.05);
    }
  }
`;
