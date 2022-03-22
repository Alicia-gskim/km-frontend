import axios from "axios";
import { Navigate, useRoutes } from "react-router-dom";
import Hello from "./api/hello";
import DashboardLayout from './components/layouts/dashboard';
import DashboardApp from "./pages/DashboardApp";
import LogoOnlyLayout from './components/layouts/LogoOnlyLayout';
import Info from "./pages/Info";
import NotFound from './pages/Page404';

// const routerList = 

export default function Router() {
    // const [routerList, setRouterList] = useRoutes([]);
    // const fetchRouter = async () => {
    //     const response = await axios.get('/common/navidt');
    //     setRouterList(response.data);
    // }

    // console.log(routerList);


    return useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                { path: 'app', element: <DashboardApp /> }
            ]
        },
        {
            path: '/',
            element: <DashboardLayout />,
            children: [
                { path: '/', element: <Navigate to="/dashboard/app" /> },
                { path: 'info', element: <Info /> },
                { path: '404', element: <NotFound /> },
                { path: '*', element: <Navigate to="/404" /> }
            ]
        },
        { path: '*', element: <Navigate to="/404" replace /> }
        // {
        //     path: '/',
        //     element: <Navigate to='/dashboard/app' />,
        //     children: [
        //         { path: '*', element: <Navigate to='/404' /> },
        //         {
        //             path: '/api-gateway',
        //             children: [
        //                 { path: 'info', element: <Info /> },
        //                 { path: 'services', element: <Hello /> },
        //                 { path: 'routes', element: <Hello /> },
        //                 { path: 'consumers', element: <Hello /> },
        //                 { path: 'plugins', element: <Hello /> },
        //                 { path: 'upstreams', element: <Hello /> },
        //                 { path: 'certificates', element: <Hello /> }
        //             ]
        //         }
        //     ]
        // },
        // { path: '/info', element: <Info /> },
        // { path: '/services', element: <Hello /> },
        // { path: '/routes', element: <Hello /> },
        // { path: '/consumers', element: <Hello /> },
        // { path: '/plugins', element: <Hello /> },
        // { path: '/upstreams', element: <Hello /> },
        // { path: '/certificates', element: <Hello /> },
        // { path: '/connections', element: <Hello /> },
        // { path: '/snapshots', element: <Hello /> },
        // { path: '/settings', element: <Hello /> }
    ]);
}