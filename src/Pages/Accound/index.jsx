import './Accound.css';
import AccountHeader from "../../Components/AccountHeader/index.jsx";
import Avatar from "../../Components/Avatar/index.jsx";
import {useState} from "react";

function Account() {

    const [avatarData, setAvatarData] = useState('');

    const handleAvatarChange = (data) => {
        setAvatarData(data);
        // Выполните дополнительные действия с данными, например, отправьте их на сервер или сохраните локально
        // Ниже приведен пример, как можно сохранить данные в localStorage:
        localStorage.setItem('avatarData', data);
    };

    // Обработчик для кнопки "Сохранить" в родительском компоненте
    const handleSaveClick = () => {
        // Выполните дополнительные действия, связанные с сохранением аватарки
        // Например, отправьте данные на сервер или выполните другие необходимые действия
        console.log('Аватарка сохранена:', avatarData);
    };

    const [createSummary,setCreateSummary] = useState(false)
    const handleCreateSummary = () =>{
        setCreateSummary(!createSummary)
    }

    const [isEditable,setIsEditable] = useState(false)
    const handleChangeEditable = () => {
        setIsEditable(true);
    };

    const handleChangeUnEditable = () => {
        setIsEditable(false);
    };

    return (
        <div>
            <AccountHeader/>
            <div className="account-wrapper">
                <div className="user-info-container">
                    <div className="user-info">
                        <div className="avatar-container">
                            <Avatar
                                onAvatarChange={handleAvatarChange}
                            />
                            {avatarData && (
                                <button className="save-avatar" onClick={handleSaveClick}>Сохранить</button>
                            )}
                            <button className={createSummary ? 'add-vacation' : 'add-vacation-active'} onClick={handleCreateSummary}>{createSummary ? "Отменить создание" : "Создать резюме"}</button>
                        </div>
                        <div className="info-container">
                            <div className="title-info">Настройки учетной записи</div>
                            <form className="input-container">
                                <label>
                                    Фамилия
                                    <input type="text" disabled/>
                                </label>
                                <label>
                                    Имя
                                    <input type="text" disabled/>
                                </label>
                                <label>
                                    Отчество
                                    <input type="text" disabled/>
                                </label>
                                <label>
                                    Login
                                    <input type="text" disabled/>
                                </label>
                                <label>
                                    Номер телефона
                                    <input type="text" disabled={!isEditable}/>
                                </label>
                                <label>
                                    Почта
                                    <input type="text" disabled={!isEditable}/>
                                </label>
                                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                    {isEditable === false && <button style={{backgroundColor:"#F52D30"}} onClick={handleChangeEditable}>Редактировать</button>}
                                    {isEditable === true && <button style={{backgroundColor:"black"}} type='submit' onClick={handleChangeUnEditable}>Сохранить</button>}
                                </div>
                            </form>
                        </div>
                    </div>
                    {createSummary &&
                        <form className="new-summary">
                            <div className="title-info">Настройки учетной записи</div>
                            <div className="first-container-summary">
                                <label>
                                    Должность
                                    <input type="text" disabled/>
                                </label>
                                <label>
                                    Университет
                                   <input type="text" disabled/>
                                </label>
                                <label>
                                    Институт
                                   <input type="text" disabled/>
                                </label>
                                <label>
                                    Направление
                                   <input type="text" disabled/>
                                </label>
                                <label>
                                    Вид обучения
                                   <input type="text" disabled/>
                                </label>
                                <label>
                                    Форма обучения
                                   <input type="text" disabled/>
                                </label>
                                <label>
                                    Уровень образования
                                   <input type="text" disabled/>
                                </label>
                                <label>
                                    Курс
                                   <input type="text" disabled/>
                                </label>
                                <label>
                                    Ср.балл
                                   <input type="text" disabled/>
                                </label>
                            </div>
                            <div className="second-container-summary">
                                <label>
                                    О себе
                                   <textarea type="text"/>
                                </label>
                                <label>
                                    Мои навыки
                                   <textarea type="text"/>
                                </label>
                            </div>
                            <button type="submit"> Создать </button>
                    </form>}
                </div>
                <div className="user-vacations">
                    <div className="title-info">Ваши резюме</div>
                </div>
            </div>
        </div>
    );
}

export default Account;