import React, { useState, useEffect } from 'react';
import { IoMdClose, IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { MdDarkMode } from "react-icons/md";
const Header = ({ mode, setmode }) => {
    const [user, setUser] = useState([]);
    const [close, setclose] = useState(false);
    const navigate = useNavigate();

    const handleLogout = ({ params }) => {
        localStorage.removeItem('token');
        navigate('/loginsignup');
    }
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://i-notebook-api-eight.vercel.app/api/auth/user', {
                    method: 'GET',
                    headers: {
                        'authorization': localStorage.getItem('token')
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    console.log(data)
                } else {
                    // Handle error


                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error
            }
        };

        fetchUserData();
    }, []);
    const handledarkmode = () => {
        if (mode === "light") {
            setmode("dark")
        }
        else {
            setmode("light")
        }
    }
    return (
        <div className={` ${mode === "light" ? "bg-[#ff6600a2]" : "bg-[#080917] text-white"} `}>
            <div className='flex justify-between w-full md:w-4/5 lg:w-2/3 mx-auto p-9 items-center -z-40'>

                <div className={`text-xl font-semibold `} style={{ fontFamily: "cursive" }}>
                    INotebook
                </div>

                <div className='flex gap-11 items-center '>
                    <div className='relative logout flex '>
                        <div className='font-bold ' onClick={handleLogout}>
                            <IoMdLogOut className='text-3xl cursor-pointer font-bold ' />
                        </div>
                        <div className='absolute top-[30px] hidden '>Logout</div>
                    </div>
                    <div>
                        <div><CgProfile className='text-3xl cursor-pointer font-bold ' onClick={() => setclose(!close)} /></div>
                    </div>
                    <div>
                        <div><MdDarkMode className='text-3xl cursor-pointer font-bold ' onClick={handledarkmode} /></div>
                    </div>
                </div>
            </div>


            {close && <div className='absolute flex items-center w-full  mx-auto min-h-[80vh] z-40 '>
                <div className={` mx-auto   ${mode === "light" ? "bg-[rgb(228,134,83)]" : "bg-[#fff] text-black"} rounded-xl flex flex-col  gap-4 px-5 py-3 `}>
                    <IoMdClose onClick={() => setclose(!close)} className='text-2xl cursor-pointer font-bold ' />

                    <div className='flex justify-center text-2xl font-semibold '>
                        Profile
                    </div>
                    <div className='flex font-semibold my-2 text-xl'>
                        Name : {user.name}
                    </div>
                    <div className='flex font-semibold my-2 text-xl'>
                        Email : {user.email}
                    </div>

                </div>
            </div>}
        </div>
    );
};

export default Header;
