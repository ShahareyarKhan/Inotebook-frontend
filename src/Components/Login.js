import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [login, setlogin] = useState(false);

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setemail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setpassword(e.target.value);
    };

    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://i-notebook-api-eight.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                setlogin(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                alert("Invalid Credentials");
            }
        } catch (error) {
            console.error('Error signing in:', error);
            alert('Error signing in. Please try again.');
        }
    };

    return (
        <div className='relative w-full mx-auto flex justify-center items-center flex-col px-4  bg-white'>

            <div>
                <h1 className='text-2xl  font-bold'>Log In to INotebook</h1>

            </div>
            <form className='my-9 w-full flex flex-col ' onSubmit={handleLogIn}>
                <input type="text" name="" id="name" placeholder='Enter Email' className='border-b-2 p-2 border-black outline-none w-full' value={email} onChange={handleEmailChange} required />
                <input type="password" name="" id="password" placeholder='Enter Password' className='mt-9 border-b-2 p-2 border-black outline-none w-full' value={password} onChange={handlePasswordChange} required minLength={8} />
                <button type="submit" className='p-2 mt-9 bg-[#ff9719]  text-black border-2 rounded-xl font-semibold' >Log In</button>
            </form>
            <div className={`absolute  bg-green-400 text-xl p-4 w-full text-center font-semibold top-1  ${login === true ? "opacity-1" : "opacity-0"}`} style={{ transition: "2s all ease" }}>Login Successfully.</div>

        </div>
    )
}

export default Login
