import {Navigate} from "react-router-dom";
import {useLocalState} from "../useLocalStorage/index.js";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const [jwt,setJwt] = useLocalState("","jwt");
    return jwt ? children : <Navigate to="/login"/>
}

export default PrivateRoute;

