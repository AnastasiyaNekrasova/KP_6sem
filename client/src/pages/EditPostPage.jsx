import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../redux/features/post/postSlice'

import axios from '../utils/axios'
import photo from "../public/addImageWhite.svg";

export const EditPostPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [oldImage, setOldImage] = useState('')
    const [newImage, setNewImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setTitle(data.title)
        setText(data.text)
        setOldImage(data.imgUrl)
    }, [params.id])

    const submitHandler = () => {
        try {
            const updatedPost = new FormData()
            updatedPost.append('title', title)
            updatedPost.append('text', text)
            updatedPost.append('id', params.id)
            updatedPost.append('image', newImage)
            dispatch(updatePost(updatedPost))
            navigate('/posts')
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setTitle('')
        setText('')
    }

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    const [isHovered, setIsHovered] = useState(false);

    return (
        <form
            className=' mt-32 md:mt-40 xl:mt-28 w-4/5 md:w-3/5 xl:w-1/3 bg-white bg-opacity-10 mx-auto p-5 rounded-md shadow-2xl shadow-gray-500'
            onSubmit={(e) => e.preventDefault()}
        >
            <label
                className="m-4 mt-0 flex items-center justify-center cursor-pointer"
                htmlFor="imageInput"
            >
                {oldImage && (
                    <img
                    src={`https://succulents.onrender.com/${oldImage}`}
                    alt={oldImage.name}
                        className={`hover-grow ${isHovered ? 'hovered' : ''} w-32 h-32 object-cover cursor-pointer `}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    />
                )}
                {newImage && (
                    <img
                        src={URL.createObjectURL(newImage)}
                        alt={newImage.name}
                        className={`hover-grow ${isHovered ? 'hovered' : ''} w-full md:w-4/5 h-60 object-cover cursor-pointer`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    />
                )}
            </label>
            <input
                type="file"
                id="imageInput"
                className="hidden"
                onChange={(e) => {
                    setNewImage(e.target.files[0]);
                    setOldImage("");
                }}
            />

            <div className="title relative mb-5">
                <input
                    id='title'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder=' '
                    className='block rounded-md px-6 pt-6 bb-1 w-full text-md text-white bg-white bg-opacity-20  appearance-none focus:outline-none foring-0 peer'
                ></input>
                <label htmlFor='title' className='absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'> Title</label>
            </div>

            <div className="text relative mb-5">
                <textarea
                    id='text'
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder=' '
                    className='block rounded-md px-6 pt-6 bb-1 w-full text-md text-white bg-white bg-opacity-20  appearance-none focus:outline-none foring-0 peer outline-none resize-none h-40 '
                />
                <label htmlFor='text' className='absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'>
                    Post text</label>
            </div>

            <div className='flex gap-8 items-center justify-center mt-4'>
                <button
                    onClick={submitHandler}
                    className='items-center bg-white bg-opacity-20 hover:bg-opacity-40  text-sm text-white rounded-sm py-2 px-7'
                >
                    Update
                </button>

                <button
                    onClick={clearFormHandler}
                    className='bg-red-500 hover:bg-red-300 text-sm text-white rounded-sm py-2 px-4'
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
