import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    if (token) {
        return children;
    } 

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => { 
        navigate('/login') 
    }, [navigate])
};

export default PrivateRoute;