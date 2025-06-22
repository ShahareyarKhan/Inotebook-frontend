import React, { useState, useEffect } from 'react';
import { IoMdClose, IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { MdDarkMode } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa6";

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
                const response = await fetch('https://inotebook-api-cyan.vercel.app//api/auth/user', {
                    method: 'GET',
                    headers: {
                        'authorization': localStorage.getItem('token')
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    console.log(data)
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
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
        <div className={` ${mode === "light" ? "bg-[#ff5e29cd]" : "bg-[#00002d] text-white"} `}>
            <div className='flex justify-between w-full  mx-auto p-5 px-10 md:px-20 items-center -z-40'>

                <div className={`text font-semibold `} >
                    Inotebook
                </div>

                <div className='flex gap-8 items-center '>
                    
                    <div>
                        <div><FaUserSecret className='text-xl cursor-pointer font-bold ' onClick={() => setclose(!close)} /></div>
                    </div>
                    <div>
                        <div><MdDarkMode className='text-xl cursor-pointer font-bold ' onClick={handledarkmode} /></div>
                    </div>
                </div>
            </div>

            {close && <div className='fixed flex items-center justify-center w-full  mx-auto min-h-[80vh] z-40 '>
                <div className={`${mode === "light" ? "bg-white" : "bg-[#12126e] text-white"} rounded-lg flex flex-col  gap-3 p-7 py-14 w-[90%] max-w-[400px] relative`}>
                    <IoMdClose onClick={() => setclose(!close)} className='text-xl absolute top-4 right-4 cursor-pointer font-bold ' />

                    <div className='flex text-xl font-semibold '>
                        Profile
                    </div>
                    <div className='flex font-semibold  text-sm'>
                        Name : {user.name}
                    </div>
                    <div className='flex font-semibold text-sm '>
                        Email : {user.email}
                    </div>

                </div>
            </div>}
        </div>
    );
};

export default Header;
