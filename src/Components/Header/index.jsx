import './Header.css';
import {useLocalState} from "../../Modules/useLocalStorage/index.js";
import {useState} from "react";
import {Link} from "react-router-dom";

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';

function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const [jwt, setJwt] = useLocalState('', 'jwt')
    const [role,setRole] = useLocalState('','role')
    const [username,setUsername] = useLocalState('','username')


    const StyledBadge = styled(Badge)(() => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid white`,
            padding: '0 4px',
            color: "#ffffff",
            background:"#F52D30"
        },
    }));


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const LogOut = () => {
        setJwt(null)
        window.location.href = "login"
    }


    const handleOptionClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="header-wrapper">
                <a href="/"><img src="/logo_black.svg" alt="logo" className="logo"/></a>
                <div className="nav">
                    <div className="notification">
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={4} color="secondary">
                                <MailIcon />
                            </StyledBadge>
                        </IconButton>
                    </div>
                    <div className="dropdown">
                        <button onClick={toggleDropdown} className="dropdown-toggle">
                            {username}
                        </button>
                        {isOpen && (
                            <div className="dropdown-menu" onClick={() => handleOptionClick()}>
                                <div onClick={toggleDropdown}>
                                    {role === 'STUDENT' && <Link className="dropdown-item" to ="/Account">Личный кабинет</Link> }
                                    {role === 'HR' && <Link className="dropdown-item" to ="/CompanyAccount">Личный кабинет</Link> }
                                    <Link className="dropdown-item" onClick={LogOut}>Выход</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;