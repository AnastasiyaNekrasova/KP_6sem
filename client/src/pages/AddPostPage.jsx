import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/features/post/postSlice'
import { toast } from 'react-toastify'

import { useInput } from '../utils/validation'

import photo from "../public/addImageWhite.svg";

export const AddPostPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { status } = useSelector((state) => state.post)

    const [oldImage, setOldImage] = useState('')
    const [newImage, setNewImage] = useState('')

    const title = useInput('', { isEmpty: true })
    const text = useInput('', { isEmpty: true })

    const [isBtnAddHovered, setBtnAddHovered] = useState(false);
    const [isBtnCancelHovered, setBtnCancelHovered] = useState(false);
    const [isImageHovered, setImageHovered] = useState(false);

    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('title', title.value)
            data.append('text', text.value)
            data.append('image', newImage)
            dispatch(createPost(data))
            navigate('/forum')
        } catch (error) {
            console.log(error)
        }
    }
    const clearFormHandler = () => {
        title.onChange({ target: { value: '' } });
        text.onChange({ target: { value: '' } });
    }

    const fetchPost = useCallback(async () => {
        setOldImage(photo)
    }, [])

    useEffect(() => {
        if (status) { toast(status) }
        fetchPost()
    }, [fetchPost])

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
                        src={photo}
                        alt=""
                        className={`hover-grow ${isImageHovered ? 'hovered' : ''} w-32 h-32 object-cover cursor-pointer `}
                        onMouseEnter={() => setImageHovered(true)}
                        onMouseLeave={() => setImageHovered(false)}
                    />
                )}
                {newImage && (
                    <img
                        src={URL.createObjectURL(newImage)}
                        alt={newImage.name}
                        className={`hover-grow ${isImageHovered ? 'hovered' : ''} w-full md:w-4/5 h-60 object-cover cursor-pointer`}
                        onMouseEnter={() => setImageHovered(true)}
                        onMouseLeave={() => setImageHovered(false)}
                    />
                )}
            </label>

            <input
                type="file"
                id="imageInput"
                className="h-1 w-1 ml-1"
                onChange={(e) => {
                    setNewImage(e.target.files[0]);
                    setOldImage("");
                }}
            />

            {(title.isDirty && title.isEmpty) && <div className='error text-red-500 text-xs pl-1'>Title field can't be empty   (╯°益°)╯彡┻━┻</div>}

            <div className="title relative mb-5">
                <input
                    id='title'
                    type='text'
                    value={title.value}
                    onChange={e => title.onChange(e)}
                    onBlur={e => title.onBlur(e)}
                    placeholder=' '
                    className='block rounded-md px-6 pt-6 bb-1 w-full text-md text-white bg-white bg-opacity-20  appearance-none focus:outline-none foring-0 peer'
                ></input>
                <label htmlFor='title' className='absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'>
                    Title</label>
                <div className='error'></div>
            </div>

            {(text.isDirty && text.isEmpty) && <div className='error text-red-500 text-xs pl-1'>Write some text!!!   ٩(ఠ益ఠ)۶</div>}

            <div className="text relative mb-5">
                <textarea
                    id='text'
                    onChange={e => text.onChange(e)}
                    onBlur={e => text.onBlur(e)}
                    value={text.value}
                    placeholder=' '
                    className='block rounded-md px-6 pt-6 bb-1 w-full text-md text-white bg-white bg-opacity-20  appearance-none focus:outline-none foring-0 peer outline-none resize-none h-40 '
                />
                <label htmlFor='text' className='absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'>
                    Post text</label>
                <div className='error'></div>
            </div>

            <div className='flex gap-8 items-center justify-center mt-4'>
                <button
                    disabled={!text.inputValid || !title.inputValid}
                    onClick={submitHandler}
                    className={`hover-grow ${isBtnAddHovered ? 'hovered' : ''} items-center bg-white bg-opacity-20 hover:bg-opacity-30  text-sm text-white rounded-sm py-2 px-7 disabled:bg-opacity-20 disabled:border disabled:border-red-600`}
                    onMouseEnter={() => setBtnAddHovered(true)}
                    onMouseLeave={() => setBtnAddHovered(false)}
                >
                    Add
                </button>

                <button
                    onClick={clearFormHandler}
                    className={`hover-grow ${isBtnCancelHovered ? 'hovered' : ''} bg-red-500 hover:bg-red-400 text-sm text-white rounded-sm py-2 px-4`}
                    onMouseEnter={() => setBtnCancelHovered(true)}
                    onMouseLeave={() => setBtnCancelHovered(false)}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
