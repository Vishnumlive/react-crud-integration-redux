import React from 'react'

export const EditCustomer = ({singleUser, handleChange, handleEditSubmit}) => {
  return (
    <div className="flex items-center justify-center p-12">

        <div className="mx-auto w-full max-w-[550px]">
            <form  onSubmit={ handleEditSubmit } action="" method="POST">
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
                value={singleUser.firstName}
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
                value={singleUser.middleName}
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
                value={singleUser.lastName}
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
                value={singleUser.dateOfBirth}
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
                value={singleUser.status}
                >
                    <option value="active" >active</option>
                    <option value="inactive" >inactive</option>
                    <option value="deleted" >deleted</option>
                </select>
                
            </div>
            
            <div>
                <button
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                >
                Update
                </button>
            </div>
            </form>
        </div>
    </div>
  )
}
