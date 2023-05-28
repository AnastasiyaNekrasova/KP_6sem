import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, checkIsAuth } from '../redux/features/auth/authSlice'
import { toast } from "react-toastify";

export const RegisterPage = () => {
    const [values, setValues] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  
    const { status } = useSelector((state) => state.auth);
    const isAuth = useSelector(checkIsAuth);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    };
  
    const handleValidation = () => {
      const { password, confirmPassword, username, email } = values;
      if (password !== confirmPassword) {
        toast("Password and confirm password should be same.");
        return false;
      } else if (username.length < 3) {
        toast("Username should be greater than 3 characters.");
        return false;
      } else if (password.length < 8) {
        toast("Password should be equal or greater than 8 characters.");
        return false;
      } else if (email === "") {
        toast("Email is required");
        return false;
      }
      return true;
    };
  
    useEffect(() => {
      if (status) {
        toast(status);
      }
      if (isAuth) {
        navigate('/');
      }
    }, [status, isAuth, navigate]);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (handleValidation()) {
        const { email, username, password } = values;
        dispatch(registerUser({ username, password, email }));
      }
    };


    return (
        <>
            <div className="relative h-full w-full bg-suk-bg bg-center bg-no-repeat bg-fixed">
                <div className="h-5/6 flex flex-col align-middle">

                    <div className="flex flex-col justify-center md:justify-start my-auto px-8 md:px-24 lg:px-32">

                        <h1 className='max-w-50 md:max-w-100 xl:max-w-200 mx-auto font-bold text-xl md:text-2xl xl:text-4xl text-white mb-2 md:mb-3 xl:mb-4 mt-8 text-center'>
                            Welcome to SUCCULETS
                        </h1>

                        <form
                            onSubmit={(event) => handleSubmit(event)}
                            className='min-w-50 md:min-w-100 xl:min-w-200 mx-auto flex flex-col p-4 md:p-6 xl:p-8 items-center shadow-2xl shadow-gray-500 rounded-lg'>

                            <div className="username relative min-w-50 md:min-w-100 xl:min-w-[500px] mb-2">
                                <input
                                    id='username'
                                    type='text'
                                    onChange={(e) => handleChange(e)}
                                    name="username"
                                    placeholder=' '
                                    className='block rounded-md px-6 pt-6 bb-1 w-full text-md text-white bg-white bg-opacity-20  appearance-none focus:outline-none foring-0 peer'
                                ></input>
                                <label htmlFor="username" className="absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                                    Username</label>
                            </div>

                            <div className="email relative min-w-50 md:min-w-100 xl:min-w-[500px] mb-2">
                                <input
                                    id='email'
                                    type='email'
                                    onChange={(e) => handleChange(e)}
                                    name="email"
                                    placeholder=' '
                                    className='block rounded-md px-6 pt-6 bb-1 w-full text-md text-white bg-white bg-opacity-20  appearance-none focus:outline-none foring-0 peer'
                                ></input>
                                <label htmlFor="email" className="absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                                    Email</label>
                            </div>

                            <div className="password relative min-w-50 md:min-w-100 xl:min-w-[500px] mb-2">
                                <input
                                    id='password'
                                    type='password'
                                    onChange={(e) => handleChange(e)}
                                    name="password"
                                    placeholder=' '
                                    className='block rounded-md px-6 pt-6 bb-1 w-full text-md text-white bg-white bg-opacity-20  appearance-none focus:outline-none foring-0 peer'
                                ></input>
                                <label htmlFor="password" className="absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                                    Password</label>
                            </div>
                            <div className="reppassword relative min-w-50 md:min-w-100 xl:min-w-[500px]">
                                <input
                                    id='confirmPassword'
                                    type='password'
                                    onChange={(e) => handleChange(e)}
                                    name="confirmPassword"
                                    placeholder=' '
                                    className='block rounded-md px-6 pt-6 bb-1 w-full text-md text-white bg-white bg-opacity-20  appearance-none focus:outline-none foring-0 peer'
                                ></input>
                                <label htmlFor="confirmPassword" className="absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                                    Confirm Password</label>
                            </div>

                            <button
                                type='submit'
                                className='text-sm md:text-basic xl:text-lg text-white border max-w-fit border-white font-bold hover:bg-[#292929] py-1 px-5 mt-5'>
                                Sign up
                            </button>

                        </form>

                        <div className="text-center pt-3 md:pt-5 xl:pt-5 text-sm md:text-basic xl:text-lg">
                            <p>Already have an account?
                                <Link to='/login' className="underline font-semibold"> Authorize here.</Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
