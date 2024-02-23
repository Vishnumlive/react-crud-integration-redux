import { useRef } from "react";
import { toast } from "react-toastify";
import { registerNewUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Register = () => {

    const navigate = useNavigate();

    const userName = useRef("");
    const password = useRef("");
    const userEmail = useRef("");

    async function registerUser(forms) {

        const data = await registerNewUser(forms);

        if(data.message==="success"){
            console.log(data.message);
            toast.success("User registered successfully", { position: "bottom-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,theme: "light"});
            
            navigate("/login");
        }
    }

    const handleRegister = function(event) {
        event.preventDefault();

        const forms = {
            "username" : userName.current.value,
            "email" : userEmail.current.value,
            "password" : password.current.value,
        }
        
        registerUser(forms);
        
    }

    return (
        <div>
        
        <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css" />
        
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
          <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
            <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Register Your Account</div>
            
            <div className="mt-10">
              <form onSubmit={ handleRegister } action="#">
                <div className="flex flex-col mb-6">
                  <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">User Name:</label>
                  <div className="relative">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                      
                    </div>
        
                    <input ref={userName} id="username" type="text" name="username" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="User Name" />
                  </div>
                </div>

                <div className="flex flex-col mb-6">
                  <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">User Email:</label>
                  <div className="relative">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                      
                    </div>
        
                    <input ref={userEmail} id="useremail" type="text" name="useremail" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="User Email" />
                  </div>
                </div>

                <div className="flex flex-col mb-6">
                  <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                  <div className="relative">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                      <span>
                        
                      </span>
                    </div>
        
                    <input ref={password} id="password" type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" />
                  </div>
                </div>
        
                <div className="flex w-full">
                  <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                    <span className="mr-2 uppercase">Register</span>
                    <span>
                      <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
            <div className="flex justify-center items-center mt-6">
              <Link to="/login" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
                <span>
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </span>
                <span className="ml-2">Do you already have an account ?</span>
              </Link>
            </div>
          </div>
        </div>
        </div>
      )
}
