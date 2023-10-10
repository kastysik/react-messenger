import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

interface GuardedRouteProps {
    auth: boolean,
    redirectUrl?: string
}

function GuardedRoute({auth, redirectUrl} : GuardedRouteProps) {
    return (
        auth
            ? <Outlet/>
            : <Navigate to={redirectUrl ?? '/'}/>
    )
}

export default GuardedRoute;
