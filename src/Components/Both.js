import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import { PiNotepadFill } from "react-icons/pi";

const Both = () => {
    const [login, setlogin] = useState(true);
    return (
        <div className=' min-h-screen flex items-center justify-center bg-[rgba(218,255,227,0.81)]'>

            <div className=' flex flex-col  w-[85%] mx-2 md:w-2/3 border border-[rgba(137,196,255,0.81)] bg-[rgba(99,177,255,0.81)]  max-w-[500px] py-8 px-5 transform hover:scale-105 hover:rounded-xl' style={{transition: "0.5s all ease"}}>

                <div>
                    <PiNotepadFill className='text-4xl block mx-auto my-5' />
                </div>

                {login === true ? <Login /> : <Signup />}

                {
                    login ? <div onClick={() => setlogin(false)} className='text-sm pb-6 text-center font-semibold cursor-pointer'>New User ?  Sign up</div> : <div className='text-sm pb-6 font-semibold cursor-pointer text-center' onClick={() => setlogin(true)}>Already an Account ? Login</div>
                }

            </div>
        </div>
    )
}

export default Both
