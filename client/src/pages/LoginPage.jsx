import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { status } = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (status) { toast(status) }
        if (isAuth) navigate('/')
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            dispatch(loginUser({ username, password }))
            setPassword('')
            setUsername('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="relative h-[100vh] w-full bg-suk-bg bg-center bg-no-repeat bg-fixed">
            <div className="w-full flex flex-col">

                <div className="flex flex-col justify-center md:justify-start my-auto px-8 md:px-24 lg:px-32">

                    <Link to='/'>
                        <h1 className='max-w-50 md:max-w-100 xl:max-w-200 mx-auto font-bold text-xl md:text-3xl xl:text-5xl text-teal-500 mb-2 md:mb-3 xl:mb-4 mt-40 md:mt-28 xl:mt-24 text-center'>
                            Succulents are more than just plants, they are the art of living!
                        </h1>
                    </Link>

                    <h2 className='max-w-50 md:max-w-100 xl:max-w-200 mx-auto text-xs md:text-base xl:text-xl font-bold mb-2 md:mb-3 xl:mb-4 text-center'>
                        Grow everywhere.
                    </h2>

                    <h3 className='max-w-50 md:max-w-100 xl:max-w-200 mx-auto text-xs md:text-sm xl:text-base mb-1 md:mb-2 xl:mb-3 text-center'>
                        Ready to start? Enter your username to restart your membership.
                    </h3>

                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className='min-w-50 md:min-w-100 xl:min-w-[500px] mx-auto flex flex-col p-4 md:p-6 xl:p-8 items-center shadow-2xl shadow-gray-500 rounded-lg'>

                        <div className="username relative min-w-50 md:min-w-100 xl:min-w-[500px] mb-2">
                            <input
                                id='username'
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder=' '
                                className='block rounded-md px-6 pt-6 bb-1 w-full text-md text-white bg-white bg-opacity-20  appearance-none focus:outline-none foring-0 peer'
                            ></input>
                            <label htmlFor="username" className="absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Username</label>
                        </div>

                        <div className="password relative min-w-50 md:min-w-100 xl:min-w-[500px]">
                            <input
                                id='password'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=' '
                                className='block rounded-md px-6 pt-6 bb-1 w-full text-md text-white bg-white bg-opacity-20  appearance-none focus:outline-none foring-0 peer'
                            ></input>
                            <label htmlFor="password" className="absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Password</label>
                        </div>

                        <button
                            type='submit'
                            onClick={handleSubmit}
                            className='text-sm md:text-basic xl:text-lg text-white border max-w-fit border-white font-bold hover:bg-[#292929] py-1 px-5 mt-5'>
                            Get Started
                        </button>

                    </form>

                    <div className="text-center pt-3 md:pt-5 xl:pt-5 text-sm md:text-basic xl:text-lg">
                        <p>Don't have an account?
                            <Link to='/register' className="underline font-semibold"> Register here.</Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
