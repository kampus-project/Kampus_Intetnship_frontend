import "./AccountHeader.css"
import {useLocalState} from "../../Modules/useLocalStorage/index.js";
import {Link} from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
function AccountHeader() {

    const [role,setRole] = useLocalState('','role')
    const [jwt, setJwt] = useLocalState('', 'jwt')

    const LogOut = () => {
        setJwt(null)
        window.location.href = "login"
    }

    return (
        <div>
            <div className="header-wrapper">
                <a href="/"><img src="/logo_black.svg" alt="logo" className="logo"/></a>
                <div className="navigation">
                    {role === 'STUDENT' ? <Link className="nav-item">Ваши отклики</Link> : <Link className="nav-item">Приглашения</Link>}
                    {role === 'STUDENT' ? <Link className="nav-item">Приглашения</Link> : <Link className="nav-item">Входящие заявки</Link>}
                    <Link className="nav-item" onClick={LogOut}>Выход</Link>
                </div>
            </div>
            <div className="header-wrapper">
                <Link className="home-arrow" to="/"><KeyboardBackspaceIcon/> Назад</Link>
            </div>
        </div>
    );
}

export default AccountHeader;