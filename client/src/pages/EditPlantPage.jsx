import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePlant } from '../redux/features/plant/plantSlice';

import { useInput } from '../utils/validation';

import axios from '../utils/axios';

export const EditPlantPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const [oldImage, setOldImage] = useState('');
    const [newImage, setNewImage] = useState('');

    const plantname = useInput('', { isEmpty: false });
    const descript = useInput('', { isEmpty: false });

    const fetchPlant = async () => {
        try {
            const { data } = await axios.get(`/plants/${params.id}`);
            setOldImage(data.imgUrl);
            plantname.onChange({ target: { value: data.plantname } });
            descript.onChange({ target: { value: data.descript } });
        } catch (error) {
            console.log(error);
        }
    };

    const submitHandler = () => {
        try {
            if (plantname.inputValid && descript.inputValid) {
                const updatedPlant = new FormData();
                updatedPlant.append('plantname', plantname.value);
                updatedPlant.append('descript', descript.value);
                updatedPlant.append('id', params.id);
                updatedPlant.append('image', newImage);
                dispatch(updatePlant(updatedPlant));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [isBtnAddHovered, setBtnAddHovered] = useState(false);
    const [isBtnCancelHovered, setBtnCancelHovered] = useState(false);
    const [isImageHovered, setImageHovered] = useState(false);

    const clearFormHandler = () => {
        plantname.onChange({ target: { value: '' } });
        descript.onChange({ target: { value: '' } });
        setNewImage('');
    };

    useEffect(() => {
        fetchPlant();
    }, []);

    return (
        <form
            className=' mt-32 md:mt-40 xl:mt-28 w-4/5 md:w-3/5 xl:w-1/3 bg-white bg-opacity-10 mx-auto p-5 rounded-md shadow-2xl shadow-gray-500'
            onSubmit={(e) => e.preventDefault()}>
            <div className="flex justify-center">
  <label className="relative flex items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 text-sm font-medium text-white border border-transparent rounded-sm cursor-pointer">
    <span className="mr-2">Attach image</span>
    <input
      type="file"
      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
      onChange={(e) => {
        setNewImage(e.target.files[0]);
        setOldImage("");
      }}
    />
  </label>
</div>
<div
  className={`hover-grow ${isImageHovered ? "hovered" : ""} flex object-cover pb-5 w-full justify-center max-h-80`}
  onMouseEnter={() => setImageHovered(true)}
  onMouseLeave={() => setImageHovered(false)}
>
  {oldImage && (
    <img
      src={`https://succulents.onrender.com/${oldImage}`}
      alt={oldImage.name}
      className="w-full object-cover mt-3 mx-5"
    />
  )}
  {newImage && (
    <img
      src={URL.createObjectURL(newImage)}
      alt={newImage.name}
      className="w-full object-cover mt-3 mx-5"
    />
  )}
</div>

            {(plantname.isDirty && plantname.isEmpty) && <div className='error text-red-500 text-xs pl-1'>Plant name field can't be empty   (╯°益°)╯彡┻━┻</div>}

            <div className='plantname relative mb-5'>
                <input
                    type='plantname'
                    value={plantname.value}
                    onChange={plantname.onChange}
                    onBlur={plantname.onBlur}
                    placeholder=' '
                    className={`block rounded-md px-6 pt-6 bb-1 w-full text-md text-white bg-white bg-opacity-20 appearance-none focus:outline-none foring-0 peer ${plantname.isDirty && !plantname.isEmpty ? (plantname.minLength ? 'border-red-600' : '') : ''
                        }`}
                />
                <label
                    htmlFor='plantname'
                    className={`absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 ${plantname.isDirty && !plantname.isEmpty ? (plantname.minLength ? 'text-red-600' : '') : ''
                        }`}
                >
                    Plant name
                </label>
            </div>

            {(descript.isDirty && descript.isEmpty) && <div className='error text-red-500 text-xs pl-1'>Write some information about this plant!!!   ٩(ఠ益ఠ)۶</div>}

            <div className='descript relative mb-5'>
                <textarea
                    onChange={descript.onChange}
                    onBlur={descript.onBlur}
                    value={descript.value}
                    placeholder=' '
                    className={`block rounded-md px-6 pt-6 bb-1 w-full text-md text-white bg-white bg-opacity-20 appearance-none focus:outline-none foring-0 peer outline-none resize-none h-40 ${descript.isDirty && !descript.isEmpty ? (descript.minLength ? 'border-red-600' : '') : ''
                        }`}
                />
                <label
                    htmlFor='descript'
                    className={`absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 ${descript.isDirty && !descript.isEmpty ? (descript.minLength ? 'text-red-600' : '') : ''
                        }`}
                >
                    Plant description
                </label>
            </div>

            <div className='flex gap-8 items-center justify-center mt-4'>
                <button
                    disabled={!plantname.inputValid || !descript.inputValid}
                    onClick={submitHandler}
                    className={`hover-grow ${isBtnAddHovered ? 'hovered' : ''} items-center bg-white bg-opacity-20 hover:bg-opacity-30  text-sm text-white rounded-sm py-2 px-7 disabled:bg-opacity-20 disabled:border disabled:border-red-600`}
                    onMouseEnter={() => setBtnAddHovered(true)}
                    onMouseLeave={() => setBtnAddHovered(false)}
                >
                    Update
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
    );
};