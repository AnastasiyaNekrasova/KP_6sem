import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPlant } from '../redux/features/plant/plantSlice'
import { toast } from 'react-toastify'

import {useInput} from '../utils/validation'

import photo from "../public/addImageWhite.svg";

export const AddPlantPage = () => {
    const { status } = useSelector((state) => state.plant)

    const plantname = useInput('', { isEmpty: true })
    const descript = useInput('', { isEmpty: true })
    const imageInput = useInput(null, { isEmpty: true })

    const [oldImage, setOldImage] = useState('')
    const [newImage, setNewImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchPlant = useCallback(async () => {
        setOldImage(photo)
    }, [])

    const [isBtnAddHovered, setBtnAddHovered] = useState(false);
    const [isBtnCancelHovered, setBtnCancelHovered] = useState(false);
    const [isImageHovered, setImageHovered] = useState(false);

    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('plantname', plantname.value)
            data.append('descript', descript.value)
            data.append('image', newImage)
            dispatch(createPlant(data))
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    const clearFormHandler = () => {
        plantname.onChange({ target: { value: '' } });
        descript.onChange({ target: { value: '' } });
        imageInput.onChange({ target: { value: '' } });
        setNewImage('')
    }

    useEffect(() => {
        if (status) { toast(status) }
        if (!oldImage) fetchPlant()
    }, [fetchPlant, status])

    return (
        <form
            className=' mt-32 md:mt-40 xl:mt-28 w-4/5 md:w-3/5 xl:w-1/3 bg-white bg-opacity-10 mx-auto p-5 rounded-md shadow-2xl shadow-gray-500'
            onSubmit={(e) => e.preventDefault()}
        >
            {(imageInput.isDirty && imageInput.isEmpty) && <div className='error text-red-500 text-xs pl-1'>Please select an image.</div>}

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
                className="h-1 w-1 ml-2"
                onChange={(e) => {
                    imageInput.onChange(e);
                    setNewImage(e.target.files[0]);
                    setOldImage("");
                }}
                onBlur={(e) => imageInput.onBlur(e)}
            />

            {(plantname.isDirty && plantname.isEmpty) && <div className='error text-red-500 text-xs pl-1'>Plant name field can't be empty   (╯°益°)╯彡┻━┻</div>}

            <div className="plantname relative mb-5">
                <input
                    id='plantname'
                    type='text'
                    value={plantname.value}
                    onChange={e => plantname.onChange(e)}
                    onBlur={e => plantname.onBlur(e)}
                    placeholder=' '
                    className='block rounded-md px-6 pt-6 bb-1 w-full text-md text-white bg-white bg-opacity-20  appearance-none focus:outline-none foring-0 peer'
                ></input>
                <label htmlFor='plantname' className='absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'>
                    Plant name</label>
            </div>

            {(descript.isDirty && descript.isEmpty) && <div className='error text-red-500 text-xs pl-1'>Write some information about this plant!!!   ٩(ఠ益ఠ)۶</div>}

            <div className="descript relative mb-5">
                <textarea
                    id='descript'
                    onChange={e => descript.onChange(e)}
                    onBlur={e => descript.onBlur(e)}
                    value={descript.value}
                    placeholder=' '
                    className='block rounded-md px-6 pt-6 bb-1 w-full text-md text-white bg-white bg-opacity-20  appearance-none focus:outline-none foring-0 peer outline-none resize-none h-40 '
                />
                <label htmlFor='descript' className='absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'>
                    Plant description</label>
            </div>

            <div className='flex gap-8 items-center justify-center mt-4'>
                <button
                    disabled={!plantname.inputValid || !descript.inputValid || !imageInput.inputValid}
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
