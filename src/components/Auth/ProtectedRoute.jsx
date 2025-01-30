import React from 'react';
import {Outlet,Navigate} from 'react-router-dom'

const ProtectedRoute = ({user,children,Redirect ="/login"}) => {
    if(!user) return <Navigate to={Redirect}/>;

    return children ? children:<Outlet/>;
}

export default ProtectedRoute;
