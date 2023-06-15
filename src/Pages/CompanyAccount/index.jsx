import "./CompanyAccount.css";
import {internshipType, schedule, specialization} from "../../Components/MultiplySelect/const.js";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { withStyles } from '@mui/styles';
import AccountHeader from "../../Components/AccountHeader/index.jsx";
import {useState} from "react";
import {Navigate} from "react-router-dom";
import {useLocalState} from "../../Modules/useLocalStorage/index.js";
function CompanyAccount() {

    const [jwt, setJwt] = useLocalState('', 'jwt')
    const [role,setRole] = useLocalState('','role')
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [username,setUsername] = useLocalState('','username')


    const RedAutocomplete = withStyles({
        root: {
            '& label': {
                color: 'black',
                marginTop: '2px',
                fontSize:'16px'
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'gray',
            },
            "&.Mui-focused .MuiInputLabel-outlined": {
                color: "#F52D30",
            },
            "&.Mui-focused .MuiInputLabel-selected": {
                color: "#F52D30",
            },
        },
    })(Autocomplete);

    const [formData, setFormData] = useState({
        internshipTitle: '',
        organizationName: '',
        internshipShortDescription: '',
        internshipDescription: '',
        internshipSpecialization: '',
        internshipSchedule: '',
        internshipType: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSelectChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`${backendUrl}/api/v1/internship/createInternshipByUsername/${username}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + jwt
            },
            method: "post",
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("OK");
                    return response.blob();
                } else {
                    console.log(formData)
                    return Promise.reject("Ошибка");
                }
            })
        // Отправка данных formData на сервер
        setFormData({
            internshipTitle: '',
            organizationName: '',
            internshipShortDescription: '',
            internshipDescription: '',
            internshipSpecialization: '',
            internshipSchedule: '',
            internshipType: ''
        })
    };

    return (role==='STUDENT') ? (<Navigate to='/'/>) : (
        <div>
            <AccountHeader />
            <div className="account-wrapper">
                <div className="user-info-container">
                    <div className="job-creation-title">Новая вакансия</div>
                    <form className="job-creation-block" onSubmit={handleSubmit}>
                        <label>
                            Название вакансии
                            <input
                                className="job-input"
                                type="text"
                                name="internshipTitle"
                                value={formData.internshipTitle}
                                onChange={handleInputChange}
                                maxLength={100}
                            />
                        </label>
                        <label>
                            Название компании
                            <input
                                className="job-input"
                                type="text"
                                name="organizationName"
                                value={formData.organizationName}
                                onChange={handleInputChange}
                                maxLength={100}
                            />
                        </label>
                        <label>
                            Краткое описание вакансии
                            <input
                                className="job-input"
                                type="text"
                                name="internshipShortDescription"
                                value={formData.internshipShortDescription}
                                onChange={handleInputChange}
                                maxLength={100}
                            />
                        </label>
                        <label>
                            Описание вакансии
                            <textarea
                                name="internshipDescription"
                                value={formData.internshipDescription}
                                onChange={handleInputChange}
                            ></textarea>
                        </label>
                        <div className="select-block">
                            <RedAutocomplete
                                size='small'
                                id="tags-standard"
                                options={specialization}
                                value={formData.internshipSpecialization || null}
                                onChange={(event, value) => handleSelectChange("internshipSpecialization", value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Специализация"
                                        placeholder="..."
                                    />
                                )}
                            />
                            <RedAutocomplete
                                size='small'
                                id="tags-standard"
                                options={schedule}
                                value={formData.internshipSchedule || null}
                                onChange={(event, value) => handleSelectChange("internshipSchedule", value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="График стажировок"
                                        placeholder="..."
                                    />
                                )}
                            />
                            <RedAutocomplete
                                size='small'
                                id="tags-standard"
                                options={internshipType}
                                value={formData.internshipType || null}
                                onChange={(event, value) => handleSelectChange("internshipType", value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Вид стажировки"
                                        placeholder="..."
                                    />
                                )}
                            />
                        </div>
                        <button className="job-button" type="submit">Создать вакансию</button>
                    </form>
                </div>
                <div className="user-vacations-job">
                    <div className="job-creation-title">Ваши вакансии</div>
                </div>
            </div>
        </div>
    );
}

export default CompanyAccount;