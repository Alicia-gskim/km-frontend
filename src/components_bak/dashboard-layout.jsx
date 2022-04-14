import { styled } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import DashboardNavbar from "./dashboard-navbar";
import DashboardSidebar from "./sidebar/dashboard-sidebar";

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

export default function DashboardLayout() {
    const [open, setOpen] = useState(true);

    // axios.get("http://192.168.1.102:8000/test3").then( (res) => {console.log('---------> ', res.json()); } );
    
    // axios.get("http://192.168.1.118:10080/api/routes").then( (res) => { alert(res.json()) } );

    return (
        <RootStyle>
            <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
            <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        </RootStyle>
    );
};