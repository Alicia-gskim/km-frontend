import axios from "axios";
import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from './components/layouts/dashboard';
import { GlobalData } from "./globalDataInfo";
import DashboardApp from "./pages/DashboardApp";
import Info from "./pages/Info";
import NotFound from './pages/Page404';
import Routes from "./pages/Routes";
import Services from "./pages/Services";
import ServicesBak from "./pages/Services_bak";

export default function Router() {
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
                // { path: 'services', element: <Services /> },
                { path: 'services_bak', element: <ServicesBak /> },
                { path: 'routes', element: <Routes /> },
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