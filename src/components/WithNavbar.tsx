import  React  from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function WithNavbar() {
    
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}