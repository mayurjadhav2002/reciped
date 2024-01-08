import LoginForm from '../../components/Forms/LoginForm';
import React, { useEffect, useState } from 'react';
import { ReactComponent as RamenBowl } from '../../Assets/Ramen_bowl_food.svg';
import { ReactComponent as CookieFriedRice } from '../../Assets/3377056_cooking_food_fried_rice_icon.svg';
import { ReactComponent as ChowFood } from '../../Assets/SVG/3377054_chow_food_mein_noodle_icon.svg';
import { ReactComponent as FishFood } from '../../Assets/SVG/3377059_fish_fishing_food_japanese_icon.svg';
import { ReactComponent as FishGoza } from '../../Assets/SVG/3377060_food_gyoza_japanese food_icon.svg';
import { ReactComponent as Cuisine } from '../../Assets/SVG/5296650_cuisine_food_japan_japanese_onigiri_icon.svg';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { LoginQuery } from '../../Utils/query';
import { toast } from 'react-toastify';

function getRandomPosition() {
    return {
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
    };
}

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const { loggedin, handleLoggedin, setUser, handleAccessToken } = useUserContext()
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedin) {
            navigate('/dashboard');
        }
    }, [loggedin])


    const handleSubmit = async () => {
        try {
            console.log("login")
            const res = await LoginQuery({ email: email, password: password })
            if (res.data.success === false && res.data.code === "unverified") {
                toast.error("Email not Verified! please check your inbox to verify mail.")
            }
            if (res.data.success === false && res.data.code === "oauth") {
                toast.error("Looks like you created account using Google. Please Login with Google.")
            }
            if (res.data.success === false && res.data.code === "invalid") {
                toast.error("Login Failed! Please Check your Email and password again.")
            }
            if (res.data.success === false && res.data.code === "error") {
                toast.error("Sorry, Error from our Side ! Please hang in while we solve this issues. ")
            }

            if (res.data.success === true) {
                await setUser(res.data.data)
                await handleAccessToken({ access_token: res.data.data.access_token, user: res.data.data });
                await handleLoggedin(true)
                toast.success("Logged into your Account")
            }

        } catch (error) {
            toast.error("Sorry! this time error from our side. Fixing the Issue.", error)
        }
    }

    return (
        <div className='relative min-h-[calc(100vh-12vh)] overflow-hidden'>

            {/* Randomly positioned images */}
            <div className=' w-full h-full -z-10'>


                <CookieFriedRice style={getRandomPosition()} className='absolute h-36 w-36' />
                <ChowFood style={getRandomPosition()} className='absolute h-36 w-36' />
                <RamenBowl style={getRandomPosition()} className='absolute h-36 w-36' />
                <FishFood style={getRandomPosition()} className='absolute h-36 w-36' />
                <FishGoza style={getRandomPosition()} className='absolute h-36 w-36' />
                <Cuisine style={getRandomPosition()} className='absolute h-36 w-36' />

            </div>
            {/* Centered LoginForm */}
            <div className="flex flex-col items-center justify-center  py-8 lg:py-20 z-20">
                <h1 className="scroll-m-20 text-4xl mb-10 text-center font-extrabold tracking-tight lg:text-4xl text-primary z-[9999]">
                    Login into your Account
                </h1>
                <LoginForm setEmail={setEmail} email={email} password={password} setPassword={setPassword} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default Login;
