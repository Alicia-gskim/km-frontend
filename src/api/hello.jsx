import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Hello() {
    return (
        <Box>
            <h2>Hello</h2>
            <ul>
                <li><Link to="/">Main</Link></li>
                <li><Link to="/hello">Hello</Link></li>
            </ul>
        </Box>
    )
}