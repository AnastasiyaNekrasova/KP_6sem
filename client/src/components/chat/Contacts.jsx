import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { GiBeveledStar } from 'react-icons/gi'

import Logo from "../../public/images/logos/Logo.svg";

export const Contacts = ({ contacts, changeChat }) => {
  
  const { user } = useSelector((state) => state.auth);
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserImage, setCurrentUserImage] = useState(user.avatarImage);
  const [currentSelected, setCurrentSelected] = useState('');

  useEffect(() => {
    setCurrentUserName(user.username);
  }, [user]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Chatty Time</h3>
          </div>
          <div className='contacts'>
          {contacts.map((contact, index) => {
              const isSpecUser = contact.role[0] === "spec";
              const isSelected = index === currentSelected;
              const contactClassName = isSpecUser
                ? "contact spec-contact"
                : "contact";
              return (
                <div
                  key={contact._id}
                  className={`${contactClassName} ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="flex items-center gap-4">
                  <div className="avatar">
                    <img
                      src={contact.avatarImage}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                  </div>
                  {isSpecUser && <span className="spec-star" alt="specialist"><GiBeveledStar/></span>}
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={currentUserImage}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  border-radius: 5px 0 0 0;
  overflow: hidden;
  background-color: #292929;
  .brand {
    background-color: #404040;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: -30px;
    justify-content: center;
    img {
      height: 3rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
      font-size:20px;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.5rem;
    margin: 5px 0;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 4rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.7rem;
      display: flex;
      justify-content:space-between;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
      .spec-star {
        color: #ff0303;
        font-size: 1.5rem;
        margin-left: 0.3rem;
      }
    }
    .selected {
      background-color: #73d1c0;
    }
    .contact.spec-contact {
      background-color: #149494;
    }

    .contact.spec-contact.selected {
      background-color: #73d1c0;
    }
  }

  .current-user {
    background-color: #404040;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 20px;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
        font-size:20px;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
