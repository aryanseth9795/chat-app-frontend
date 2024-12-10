import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ user, children, Redirect = "/" }) {

    if(!user)  return <Navigate to={Redirect} />
        
    return children? children:<Outlet/>
}
