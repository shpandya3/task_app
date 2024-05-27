import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const toast = useRef(null);

    
    const navigate = useNavigate()
    
    const show = () => {
        toast.current.show({ severity: 'info', detail: 'Logged Out', life: 3000 });
    };
    
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        console.log("Userdata changed:", user);
      }, [user]);

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem("token", userData?.token)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
        ///api call to logout user-remove token
        navigate("/")
        show()
    }

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
             <Toast ref={toast} />
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}