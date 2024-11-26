import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

const Both = () => {
    const [login, setlogin] = useState(true);
    return (
        <div className=' h-[100vh] flex items-center justify-center'>

            <div className=' flex flex-col  w-[95%] mx-2 md:w-2/3  border rounded border-gray-300 shadow-lg shadow-gray-300 max-w-[500px]'>

                <div>
                    <img src="https://static.vecteezy.com/system/resources/previews/029/722/382/original/notes-icon-in-trendy-flat-style-isolated-on-white-background-notes-silhouette-symbol-for-your-website-design-logo-app-ui-illustration-eps10-free-vector.jpg" alt="" className='w-[50px] block mx-auto my-5' />
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
