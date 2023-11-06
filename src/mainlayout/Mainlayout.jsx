import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { Link, Outlet, useParams } from "react-router-dom";

export default function Mainlayout() {

    const { id } = useParams();
    const getName = window.location.pathname.split("/");
    const [sideNav,setSidenav] = useState([]);

    const admin = [
        {
            name: "Dashboard",
            link: `dashboard`
        },
        {
            name: "Employees",
            link: `employees`
        },

        {
            name: "Departments",
            link: "departments"
        }
    ]

    const employee = [
        // {
        //     name: "Dashboard",
        //     link: `dashboard/${id}`
        // },
        {
            name: "Profile",
            link: `profile/${id}`
        }
    ]

    useEffect(()=>{
        if(getName[1] === "admin") {
            setSidenav(admin);
        }else{
            setSidenav(employee);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            <Header />
            {/* Sidebar section start*/}
            <aside className="sidebar">
                <ul className="sidebar-nav">
                    {
                        sideNav.map((item, index)=>(
                            <li key={index} className="nav-item">
                            <Link to={item?.link} className="nav-link ">
                                <i className="bi bi-grid"></i>
                                <span>{item?.name}</span>
                            </Link>
                        </li>
                        ))
                    }
                  
                </ul>
            </aside>
            {/* Sidebar section end*/}
            <Outlet />
        </>
    )
}