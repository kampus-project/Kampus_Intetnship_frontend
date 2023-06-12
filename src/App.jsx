import './App.css'
import {Routes,Route} from "react-router-dom";
import PrivateRoute from "./Modules/PrivateRoute/index.jsx";

import LoginPage from "./Pages/LoginPage/index.jsx";
import MainPage from "./Pages/MainPage/index.jsx";
import Account from "./Pages/Accound/index.jsx";
import CompanyAccount from "./Pages/CompanyAccount/index.jsx";


function App() {
    return (
        <>
            <Routes>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="/" element={
                    <PrivateRoute>
                        <MainPage/>
                    </PrivateRoute>
                }/>
                <Route path="/Account" element={
                    <PrivateRoute>
                        <Account/>
                   </PrivateRoute>
                }/>
                <Route path="/CompanyAccount" element={
                    <PrivateRoute>
                        <CompanyAccount/>
                    </PrivateRoute>
                }/>
            </Routes>
        </>
    )
}

export default App
