import  React  from "react";
import { Outlet } from "react-router-dom";

export default function WithoutNavbar() {
    
    return (
        <Outlet />
    )
}