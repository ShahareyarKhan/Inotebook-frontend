import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Notes from './Notes';
import Footer from './Footer';
const HomePage = () => {
    let navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/loginsignup')
        }
        // eslint-disable-next-line
    }, []);

    const [mode, setmode] = useState("light");

    return (
        <div className={`${mode === "light" ? "bg-gradient-to-br from-[#ffe9e9] to-[#ff9393] text-black" : "bg-gradient-to-br from-[#00002c] to-[#000] text-white"}`}>
            <Header mode={mode} setmode={setmode} />
            <div className=' min-h-screen ' >
                <Notes mode={mode} setmode={setmode} />
            </div>
            <Footer mode={mode} setmode={setmode}/>
        </div>
    )
}

export default HomePage
