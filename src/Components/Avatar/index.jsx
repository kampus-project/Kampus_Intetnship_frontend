import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Avatar = ({ onAvatarChange }) => {
    const [avatar, setAvatar] = useState('');

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setAvatar(reader.result);
            onAvatarChange(reader.result); // Передаем результат загрузки в родительский компонент
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };



    const handleEditClick = () => {
        // Клик по кнопке "Изменить" вызывает клик по input'у типа file
        document.getElementById('avatar-input').click();
    };

    return (
        <div className="avatar">
            {avatar ? (
                <img src={avatar} className="user-avatar" />
            ) : (
                <img src='/images.jpg' className="user-avatar"/>
            )}
            <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }} // Скрытый input
            />
            {avatar ? null: <button onClick={handleEditClick}>Изменить</button>}
        </div>
    );
};

export default Avatar;