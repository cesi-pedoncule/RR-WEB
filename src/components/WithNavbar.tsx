import  React  from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Client } from "rr-apilib";

interface Props {
    client: Client;
}
export default function WithNavbar({ client }: Props) {
    
    return (
        <div>
            <Navbar client={client} />
            <Outlet />
        </div>
    )
}