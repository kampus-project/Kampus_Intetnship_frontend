import "./CompanyAccount.css";
import {internshipType, schedule, specialization} from "../../Components/MultiplySelect/const.js";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { withStyles } from '@mui/styles';
import AccountHeader from "../../Components/AccountHeader/index.jsx";
import {useState} from "react";
function CompanyAccount() {

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
        jobTitle: '',
        companyName: '',
        shortDescription: '',
        description: '',
        specialization: [],
        schedule: [],
        internshipType: []
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
        // Отправка данных formData на сервер
        console.log(formData);
        setFormData({
            jobTitle: '',
            companyName: '',
            shortDescription: '',
            description: '',
            specialization: [],
            schedule: [],
            internshipType: []
        })
    };

    return (
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
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleInputChange}
                                maxLength={100}
                            />
                        </label>
                        <label>
                            Название компании
                            <input
                                className="job-input"
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                maxLength={100}
                            />
                        </label>
                        <label>
                            Краткое описание вакансии
                            <input
                                className="job-input"
                                type="text"
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleInputChange}
                                maxLength={100}
                            />
                        </label>
                        <label>
                            Описание вакансии
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            ></textarea>
                        </label>
                        <div className="select-block">
                            <RedAutocomplete
                                size='small'
                                multiple
                                id="tags-standard"
                                options={specialization}
                                getOptionLabel={(option) => option.title}
                                value={formData.specialization}
                                onChange={(event, value) => handleSelectChange("specialization", value)}
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
                                multiple
                                id="tags-standard"
                                options={schedule}
                                getOptionLabel={(option) => option.title}
                                value={formData.schedule}
                                onChange={(event, value) => handleSelectChange("schedule", value)}
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
                                multiple
                                id="tags-standard"
                                options={internshipType}
                                getOptionLabel={(option) => option.title}
                                value={formData.internshipType}
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
                    Hello
                </div>
            </div>
        </div>
    );
}

export default CompanyAccount;