
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addCustomer } from "../services/customerService";
import { logout } from "../services/authService";

import { toast } from "react-toastify";



export const AddCustomer = () => {

    const navigate = useNavigate();

    const initialFormData = {
        "firstName" : "",
        "middleName" : "",
        "lastName" : "",
        "dateOfBirth" : "",
        "status" : "active",
    }

    
    const [formData, setFormData] = useState(initialFormData);

    async function addNewCustomer(userData){
        
        try{

            const data = await addCustomer(userData);

            if(data.message  ==="auth-failed"){
                // error condition
                logout();
                navigate("/login");
                toast.error("Please login again",{ position: "bottom-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,theme: "light"});
                return true;
            }
            
            if(data._id){
                setFormData(initialFormData);
                
                toast.success("User added successfully", { position: "bottom-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,theme: "light"});
                
            }

        }catch(error){
            
            toast.error(error.message,{ position: "bottom-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,theme: "light"});
        }
    }
    

    const handleAddCustomer = (event) => {
        event.preventDefault();
        
        const customerData = formData;
        addNewCustomer(customerData);

    }

    const handleChange = (event) =>{
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })

    }

  return (
    <div>
        <div className="flex items-center justify-center p-12">

            <div className="mx-auto w-full max-w-[550px]">
                <form onSubmit={ handleAddCustomer} action="" method="POST">
                <div className="mb-5">
                    <label
                    htmlFor="firstName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                    First Name
                    </label>
                    <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    onChange={ handleChange }
                    value={formData.firstName}
                    placeholder="First Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>
                <div className="mb-5">
                    <label
                    htmlFor="middleName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                    Middle Name
                    </label>
                    <input
                    type="text"
                    name="middleName"
                    id="middleName"
                    onChange={ handleChange }
                    value={formData.middleName}
                    placeholder="Middle Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>
                <div className="mb-5">
                    <label
                    htmlFor="lastName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                    Last Name
                    </label>
                    <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    onChange={ handleChange }
                    value={formData.lastName}
                    placeholder="Last Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>
                <div className="mb-5">
                    <label
                    htmlFor="message"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                    Date of birth
                    </label>
                    <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    placeholder="Date of birth"
                    onChange={ handleChange }
                    value={formData.dateOfBirth}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    
                </div>

                <div className="mb-5">
                    <label
                    htmlFor="status"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                    User Status
                    </label>
                    <select className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    name="status"
                    id="status"
                    onChange={ handleChange }
                    value={formData.status}
                   >
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                        <option value="deleted">deleted</option>
                    </select>
                    
                </div>
                <div>
                    <button
                    className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                    >
                    Submit
                    </button>
                </div>
                </form>
            </div>
        </div>

        
    </div>

    
  )
}
