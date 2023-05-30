import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ChatContainer } from "../components/chat/ChatContainer";
import { Contacts } from "../components/chat/Contacts";
import { Welcome } from "../components/chat/Welcome";
import { checkIsAuth } from "../redux/features/auth/authSlice";
import { allUsersRoute, host } from "../utils/APIRoutes";

export const ChatPage = () => {
    const isAuth = useSelector(checkIsAuth);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState('');
    
    useEffect(() => {
        if (user) {
            socket.current = io(host);
            socket.current.emit("add-user", user._id);
        }
    }, [user]);


    const getUserInfo = async () => {
        const data = await axios.get(`${allUsersRoute}/${user._id}`)
        setContacts(data.data);
    
    }                

    useEffect( () => {
        if (user) {
            if (user.isAvatarImageSet) {
                getUserInfo() 
            } else {
            navigate("/setAvatar");
            }
        }
    }, [user]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };
    return (
        <>
            <Container>
                <div className="container">
                    <Contacts contacts={contacts} changeChat={handleChatChange} />
                    {currentChat === '' ? (
                        <Welcome />
                    ) : (
                        <ChatContainer currentChat={currentChat} socket={socket} />
                        
                    )}
                </div>
            </Container>
        </>
    );
}

const Container = styled.div`
  height: 80vh;
  width: 80vw;
  margin: auto;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #191919;
    display: grid;
    border-radius: 5px;
    grid-template-columns: 25% 75%;
    box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.5);
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;