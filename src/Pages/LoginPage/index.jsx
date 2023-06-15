import './LoginPage.css';
import {Navigate} from "react-router-dom";
import {useState} from "react";
import {useLocalState} from "../../Modules/useLocalStorage/index.js";

function LoginPage() {

    const [password, setPassword] = useState('');
    const [username,setUsername] = useLocalState('','username')
    const [jwt, setJwt] = useLocalState('', 'jwt')
    const [role,setRole] = useLocalState('','role')

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [usernameErr, setUsernameErr] = useState('')
    const [mainErr, setMainErr] = useState('')

    const handleMainSubmit = (event) => {
        event.preventDefault();

        // send survey data to server
        const surveyMainData = {
            username,
            password,
        };
        console.log(surveyMainData);

        fetch(`${backendUrl}/api/v1/auth/login`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(surveyMainData)
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("OK");
                    return Promise.all([response.json(), response.headers]);
                } else if (response.status === 401){
                    console.log("Неверное имя пользователя или пароль")
                    setMainErr('Неверное имя пользователя или пароль')
                } else {
                    return Promise.reject("Invalid login response attempt");
                }
            })
            .then((response) => {
                setJwt(response['0']['token']);
                setRole(response['0']['role']);
                setUsername(response['0']['username']);
                console.log(response)
            });
        // reset survey state
        setPassword('');
        setUsername('');
        setMainErr('');
        if (username === '') {
            setUsernameErr('Логин не может быть пустым')
        }
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    };
    return jwt?(
        <Navigate to="/"/>
    ): (
        <div>
            <div className="login-wrapper">
                <form className="login-form" onSubmit={handleMainSubmit}>
                    <div className="title-form"> Добро пожаловать!</div>
                    <div className="subtitle-form">Чтобы продолжить работу, пожалуйста, авторизуйтесь.</div>
                    <label className="label-form">
                        Логин:
                        <input type="text"
                               className="input-form"
                               placeholder="Введите логин..."
                               value={username}
                               onChange={handleChangeUsername}/>
                        {(username < 1) ? <div className="alert-form">{usernameErr}</div> : null}
                    </label>
                    <label className="label-form">
                        Пароль:
                        <input type="password"
                               className="input-form"
                               placeholder="Введите пароль..."
                               value={password}
                               onChange={handleChangePassword}/>
                    </label>
                    <button className="form-button" type="submit" disabled={ password.length < 5 }> Войти </button>
                    {(username < 1 && password < 1) ? <div className="alert-form" style={{marginTop:"10px"}}>{mainErr}</div> : null}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;