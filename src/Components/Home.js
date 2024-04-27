import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Notes from './Notes';
const HomePage = () => {
    let navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/loginsignup');
        }
        // eslint-disable-next-line
    }, []);

    const [mode, setmode] = useState("light");

    return (
        <>
            <Header mode={mode} setmode={setmode} />
            <div className=' min-h-screen   ' >
                <Notes mode={mode} setmode={setmode} />
            </div>
        </>
    )
}

export default HomePage
