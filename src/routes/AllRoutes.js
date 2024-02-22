import { Routes, Route } from "react-router-dom";
import { AddCustomer, CustomerList, Login } from "../pages";
import { ProtectedRoutes } from "./ProtectedRoutes";


export const AllRoutes = () => {

  return (
    <div>
        <Routes>
            <Route path="/" element={<ProtectedRoutes> <CustomerList /> </ProtectedRoutes>}></Route>
            <Route path="/add" element={<ProtectedRoutes> <AddCustomer /> </ProtectedRoutes>}></Route>
            <Route path="/login" element={ <Login />}></Route>
            
        </Routes>
    </div>
  )
}
