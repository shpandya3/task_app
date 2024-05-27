import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const AuthorizedRoutes = ({permissions}) => {
    const {user} = useAuth()
    const navigate = useNavigate()
    console.log("🚀 ~ AuthorizedRoutes ~ user:", user)

    if(permissions?.includes(user?.role)) {
        return <Outlet />
    } else {
        navigate("/no-permission")
    }
}

export default AuthorizedRoutes