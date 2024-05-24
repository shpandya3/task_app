import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const AuthorizedRoutes = ({permissions}) => {
    const {user} = useAuth()
    console.log("🚀 ~ AuthorizedRoutes ~ user:", user)

    if(permissions?.includes(user?.role)) {
        return <Outlet />
    } else {
        return <Navigate to="/no-permission"/>
    }
}

export default AuthorizedRoutes