import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { EditCustomer } from "../component";
import { fetchCustomer,deleteCustomerById,getSingleUser,updateUserDetails } from "../services/customerService";
import { logout } from "../services/authService";

import { toast } from "react-toastify";

import { fetchCustomers, deleteACustomer, editACustomer } from "../store/customerSlice";
import { useDispatch, useSelector } from "react-redux";



export const CustomerList = () => {

    const dispatch = useDispatch();
    const customers = useSelector((state) => state.customer.customers);
    const { loading } = useSelector((state) => state.customer);
    const { error }  = useSelector((state) =>  state.customer);

    const navigate = useNavigate();

    const initialUserData = {
        "firstName" : "",
        "middleName" : "",
        "lastName" : "",
        "dateOfBirth" : "",
        "status" : "",
    }

    const [customerList, setCustomerList] = useState([]);

    const [deleted, setDeleted ] = useState(false);

    const [updated, setUpdated ] = useState(false);

    const [editEnable, setEditEnable] = useState(false);

    const [singleUser, setSingleUser] = useState(initialUserData);

    const [noCustomer , setNoCustomer] = useState(false);
    
    
    
    // fetch customers
    useEffect(()=>{
        async function initialDataLoad(){
            const data = await dispatch(fetchCustomers());
            console.log(data.payload.length);

            if(data.payload.message  ==="auth-failed"){

                logout();
                navigate("/login");
                toast.error("Please login again",{ position: "bottom-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,theme: "light"});
            
            }

        }

        initialDataLoad();
        
    },[deleted, updated])

    useEffect(()=>{
        
        if (customers && customers.length > 0) {
            // Condition to execute when customers exist

            const formatedData = customers.map((item) => (
                {
                ...item,
                dateOfBirth: new Date(item.dateOfBirth).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                })  
            }))

            setCustomerList(formatedData);
            setNoCustomer(false);
            
        }else {
            setNoCustomer(true);
            setCustomerList([]);
        }

    },[deleted,updated, customers])

    // delete customer
    async function deleteCustomer(userid){
        
        try{
            // const data = await deleteCustomerById(userid);

            const data  = await dispatch(deleteACustomer(userid));

            // console.log(data);

            if(data.payload.message ==="auth-failed"){
                // error condition
                logout();
                navigate("/login");
                toast.error("Please login again",{ position: "bottom-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,theme: "light"});
                return true;
            }


            if(data.payload){
                
                setDeleted(true);

                toast.success("User deleted successfully", { position: "bottom-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,theme: "light"});
            }
            
        }catch(error){
            
            toast.error(error.message,{ position: "bottom-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,theme: "light"});
        }
    }

    // get single user
    async function getUser(userid){

        try{

            console.log(userid);
            const userDetails = customers.filter((item) => {
                return item._id === userid ;
            });
            
            const data = userDetails[0];
            const updatedDob = formatDate(data.dateOfBirth);
            
            setSingleUser({...data, dateOfBirth : updatedDob});

        }catch(error){
            
            toast.error(error.message,{ position: "bottom-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,theme: "light"});
        }
        
    }

    // update single user details
    async function updateUser(userData){
        
        try{
            // const data  = await updateUserDetails(userData);

            const data = await dispatch(editACustomer(userData));

            if(data.payload.message ==="auth-failed"){
                // error condition
                logout();
                navigate("/login");
                toast.error("Please login again",{ position: "bottom-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,theme: "light"});
                return true;
            }

            if(data.payload){

                setUpdated(true);
                toast.success("User updated successfully", { position: "bottom-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,theme: "light"});
            }

        }catch(error){
            
            toast.error(error.message,{ position: "bottom-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,theme: "light"});
        }
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const handleDelete = (userid) => {
        deleteCustomer(userid);
        
    }

    const handleCustomerEdit = (userid) => {
        getUser(userid);
        setEditEnable(true);
    }

    const handleCloseModal = () => {
        setEditEnable(false);
    }

    const handleChange = (event) =>{
        setSingleUser({
            ...singleUser,
            [event.target.name] : event.target.value
        })

    }

    const handleEditSubmit = (event) =>{
        event.preventDefault();
        
        updateUser(singleUser);

        setEditEnable(false);
    }

  return (
    <div>


<link rel="stylesheet" href="https://cdn.tailgrids.com/tailgrids-fallback.css" />



<section className="bg-white py-20 lg:py-[120px]">
   <div className="container">
      <div className="flex flex-wrap -mx-4">
         <div className="w-full px-4">
            <div className="max-w-full overflow-x-auto">
               <table className="table-auto w-full">
                  <thead>
                     <tr className="bg-primary text-center">
                        <th
                           className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-l border-transparent
                           "
                           >
                           First Name
                        </th>
                        <th
                           className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                           Middle Name
                        </th>
                        <th
                           className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                           Last Name
                        </th>
                        <th
                           className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                           Date of birth
                        </th>
                        <th
                           className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                           Status
                        </th>
                        <th
                           className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-r border-transparent
                           "
                           >
                           Action
                        </th>
                     </tr>
                  </thead>
                  <tbody>
            
                    { 
                    
                    customerList.map((customer, id) => (

                        
                        
                        <tr key={ id }>
                            <td
                            className="
                            text-center text-dark
                            font-medium
                            text-base
                            py-5
                            px-2
                            bg-[#F3F6FF]
                            border-b border-l border-[#E8E8E8]
                            "
                            >
                            { customer.firstName }
                            </td>
                            <td
                            className="
                            text-center text-dark
                            font-medium
                            text-base
                            py-5
                            px-2
                            bg-white
                            border-b border-[#E8E8E8]
                            "
                            >
                            { customer.middleName }
                            </td>
                            <td
                            className="
                            text-center text-dark
                            font-medium
                            text-base
                            py-5
                            px-2
                            bg-[#F3F6FF]
                            border-b border-[#E8E8E8]
                            "
                            >
                            { customer.lastName }
                            </td>
                            <td
                            className="
                            text-center text-dark
                            font-medium
                            text-base
                            py-5
                            px-2
                            bg-white
                            border-b border-[#E8E8E8]
                            "
                            >
                            { customer.dateOfBirth }
                            </td>
                            <td
                            className="
                            text-center text-dark
                            font-medium
                            text-base
                            py-5
                            px-2
                            bg-[#F3F6FF]
                            border-b border-[#E8E8E8]
                            "
                            >
                            { customer.status }
                            </td>
                            <td
                            className="
                            text-center text-dark
                            font-medium
                            text-base
                            py-5
                            px-2
                            bg-white
                            border-b border-r border-[#E8E8E8]
                            "
                            >
                            
                            <button
                                onClick={ () => {handleCustomerEdit(customer._id)} }
                                className="
                                border border-primary
                                py-2
                                px-6
                                mx-1
                                text-primary
                                inline-block
                                rounded
                                hover:bg-primary hover:text-white
                                "
                                >
                            Edit
                            </button>

                            <button
                                onClick={ () => { handleDelete( customer._id ) }}
                                className="
                                border border-primary
                                py-2
                                px-6
                                text-primary
                                inline-block
                                rounded
                                hover:bg-primary hover:text-white
                                "
                                >
                            Delete
                            </button>
                            </td>
                        </tr>
                    ))}

                    {
                        noCustomer && (
                            <tr>
                                <td colSpan={4}>
                                    <p>No customers Found</p>
                                </td>
                            </tr>
                        )
                    }

                    {/* --------------------- */}
                     
                     
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   </div>
</section>

    
    { editEnable === true && (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close-btn" onClick={handleCloseModal}>
                &times;
                close model
                </button>
                <div className="modal-content">
                {/* Modal content goes here */}
                    <EditCustomer singleUser={singleUser} handleChange={handleChange} handleEditSubmit={handleEditSubmit}/>
            
                </div>
            </div>
        </div>
    )}               
    

    </div>
  )
}
