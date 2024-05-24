import React, { useContext, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const { theme, toggleTheme} = useContext(ThemeContext)
  // const [theme, setTheme] = useState('light')

  useEffect(() => {
    const linkElement = document.getElementById("theme-link");
        if (linkElement) {
          linkElement.href = `/themes/mdc-${theme}-deeppurple/theme.css`;
        }
  }, [theme])

  const userItems = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => navigate("/users")
    },
    {
      label: "View Tasks",
      icon: "pi pi-eye",
      command: () => navigate("/users/tasks")
    },
    {
      label: "Change Theme",
      icon: "pi pi-palette",
      command: () => {
        toggleTheme()
        
      },
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        logout()
        
      },
    },
  ];

  const adminItems = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => navigate("/admin")
    },
    {
      label: "View Users",
      icon: "pi pi-eye",
      command: () => navigate("/admin/view/users")
    },
    {
      label: "Change Theme",
      icon: "pi pi-palette",
      command: () => {
        toggleTheme()
        
      },
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        logout()
        
      },
    },
  ];

  return (
    <div className="card">
      <Menubar model={user?.role === "ADMIN" ? adminItems : userItems} start={<span className="text-3xl font-bold">Task Tracker</span>} />
    </div>
  );
};

export default Navbar;
