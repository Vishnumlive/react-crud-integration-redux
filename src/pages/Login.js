import { useRef, useState } from "react";

import { userLogin } from "../services/authService";

import { useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();

    const initialFormData = {
        "username" : "",
        "password" : "",
    }

    const userName = useRef("");
    const password = useRef("");

    const [formData, setFormData] = useState(initialFormData);

    async function checkUserLogin(forms) {

        const data = await userLogin(forms)

        if(data.message==="success"){
            console.log(data.message);
            sessionStorage.setItem("cuser", "vishnu");

            navigate("/");
        }
    }
    const handleLogin = (event) => {
        event.preventDefault();
        
        const forms = {
            "username" : userName.current.value,
            "password" : password.current.value,
        }
        
        
         
        checkUserLogin(forms);
    }

  return (
    <div>
    
    <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css" />
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Login To Your Account</div>
        
        <div className="relative mt-10 h-px bg-gray-300">
          <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
            <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Login With User Name</span>
          </div>
        </div>
        <div className="mt-10">
          <form onSubmit={ handleLogin } action="#">
            <div className="flex flex-col mb-6">
              <label for="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">User Name:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  
                </div>
    
                <input ref={userName} id="username" type="text" name="username" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="User Name" />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label for="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    
                  </span>
                </div>
    
                <input ref={password} id="password" type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" />
              </div>
            </div>
    
            {/* <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto">
                <a href="#" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Forgot Your Password?</a>
              </div>
            </div> */}
    
            <div className="flex w-full">
              <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                <span className="mr-2 uppercase">Login</span>
                <span>
                  <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center mt-6">
          <a href="#" target="_blank" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
            <span>
              <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </span>
            <span className="ml-2">You don't have an account?</span>
          </a>
        </div>
      </div>
    </div>
    </div>
  )
}
