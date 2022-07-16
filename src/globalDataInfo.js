import { Box } from "@mui/material";
import axios from "axios";
import { createContext, useMemo, useState } from "react";
import AxiosModule from "./components/AxiosModule";


const InitialData = () => {
    const [services, setServices] = useState();
    const [routes, setRoutes] = useState();
    const value = useMemo( () => ({setServices, setRoutes}), []);
    const requestOne = AxiosModule.get("/services");
    const requestTwo = AxiosModule.get("/routes");

    axios.all([requestOne, requestTwo]).then(
        axios.spread( (...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];

            console.log(responseOne, responseTwo);
            // GlobalData.services = responseOne.data;
            // GlobalData.routes = responseTwo.data;
            setServices(responseOne.data);
            setRoutes(responseTwo.data);
        })
    )
    .catch( errors => {
        console.log(errors);
    })

    return createContext({value})
}

export default InitialData;