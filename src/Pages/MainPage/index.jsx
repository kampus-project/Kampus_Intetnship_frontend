import './MainPage.css';
import Header from "../../Components/Header/index.jsx";
import Card from "../../Components/Card/index.jsx";
import {useEffect, useState} from "react";
import Pagination from '@mui/material/Pagination';
import Modal from "../../Components/ModalWindow/index.jsx";
import {useLocalState} from "../../Modules/useLocalStorage/index.js";

function MainPage() {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [cardData,setCardData] = useState([]);
    const [jwt, setJwt] = useLocalState('', 'jwt')
    const [username,setUsername] = useLocalState('','username')


    useEffect(() => {
        fetch(`${backendUrl}/api/v1/internship/getAllInternships`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + jwt,
            },
            method: "get",
        })
            .then((response) => response.json())
            .then((data) => setCardData(data))
            .catch(error => console.error(error));
    }, [])
    console.log(cardData)

    const cardsPerPage = 5; // Количество карточек на странице
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    const [specializations, setSpecializations] = useState([]);
    const [internshipSchedules, setInternshipSchedules] = useState([]);
    const [internshipTypes, setInternshipTypes] = useState([]);

    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSpecializationChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSpecializations([...specializations, value]);
        } else {
            setSpecializations(specializations.filter((item) => item !== value));
        }
    };

    const handleInternshipScheduleChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setInternshipSchedules([...internshipSchedules, value]);
        } else {
            setInternshipSchedules(internshipSchedules.filter((item) => item !== value));
        }
    };

    const handleInternshipTypeChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setInternshipTypes([...internshipTypes, value]);
        } else {
            setInternshipTypes(internshipTypes.filter((item) => item !== value));
        }
    };

    // Фильтрация карточек по выбранным значениям фильтров
    const filteredCards = cardData.filter((card) => {
        if (specializations.length > 0 && !specializations.includes(card.specialization)) {
            return false;
        }
        if (internshipSchedules.length > 0 && !internshipSchedules.includes(card.internshipSchedule)) {
            return false;
        }
        if (internshipTypes.length > 0 && !internshipTypes.includes(card.internshipType)) {
            return false;
        }
        return true;
    });

    // Вычисление общего количества страниц
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

    // Вычисление индексов первой и последней карточек для текущей страницы
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;

    // Получение карточек для текущей страницы
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);


    const [selectedCard, setSelectedCard] = useState(null);
    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleModalClose = () => {
        setSelectedCard(null);
    };

    const handleSubmitInternship = () => {

        const submitInternship = {
            internshipID:selectedCard.id,
            studentUsername:username,
        };
        console.log(submitInternship);

        fetch(`${backendUrl}/api/v1/internship/replyInternship`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + jwt,
            },
            method: "post",
            body: JSON.stringify(submitInternship)
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("OK");
                } else {
                    console.log("лох")
                }
            })
        setSelectedCard(null);
    };

    let content;
    if (filteredCards.length === 0) {
        content = <p style={{fontSize:'20px'}}>По вашему запросу ничего не найдено</p>;
    } else {
        content = (
            <div className="card-list">
                {currentCards.map((card) => (
                    <Card key={card.id}
                          title={card.internshipTitle}
                          shortDescription={card.internshipShortDescription}
                          subtitle={card.organizationName}
                          onClick={() => handleCardClick(card)}/>
                ))}
            </div>
        );
    }

    return (
        <>
            <Header/>
            <div className="main-wrapper">
                <div className="main-content">
                    <h1>Стажировки</h1>
                    {content}
                    <div className="pagination">
                        <Pagination
                            count={totalPages}
                            variant="outlined"
                            shape="rounded"
                            page={currentPage}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
                <div className="filter-set">
                    <div className="filter">
                        <h3>Специализация:</h3>
                        <label>
                            <input
                                type="checkbox"
                                value="Наука и образование"
                                checked={specializations.includes('Наука и образование')}
                                onChange={handleSpecializationChange}
                            />
                            Наука и образование
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Рабочий персонал"
                                checked={specializations.includes('Рабочий персонал')}
                                onChange={handleSpecializationChange}
                            />
                            Рабочий персонал
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Финансы и бухгалтерия"
                                checked={specializations.includes('Финансы и бухгалтерия')}
                                onChange={handleSpecializationChange}
                            />
                            Финансы и бухгалтерия
                        </label>
                    </div>

                    <div className="filter">
                        <h3>График стажировок:</h3>
                        <label>
                            <input
                                type="checkbox"
                                value="Полный рабочий день"
                                checked={internshipSchedules.includes('Полный рабочий день')}
                                onChange={handleInternshipScheduleChange}
                            />
                            Полный рабочий день
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Временная подработка"
                                checked={internshipSchedules.includes('Временная подработка')}
                                onChange={handleInternshipScheduleChange}
                            />
                            Временная подработка
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Неполный рабочий день"
                                checked={internshipSchedules.includes('Неполный рабочий день')}
                                onChange={handleInternshipScheduleChange}
                            />
                            Неполный рабочий день
                        </label>
                    </div>

                    <div className="filter">
                        <h3>Вид стажировки:</h3>
                        <label>
                            <input
                                type="checkbox"
                                value="Удаленная работа"
                                checked={internshipTypes.includes('Удаленная работа')}
                                onChange={handleInternshipTypeChange}
                            />
                            Удаленная работа
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Работа в офисе"
                                checked={internshipTypes.includes('Работа в офисе')}
                                onChange={handleInternshipTypeChange}
                            />
                            Работа в офисе
                        </label>
                    </div>
                </div>
            </div>
            {selectedCard && (
                <Modal
                    open={Boolean(selectedCard)}
                    onClose={handleModalClose}
                    title={selectedCard.internshipTitle}
                    subtitle={selectedCard.organizationName}
                    description={selectedCard.internshipDescription}
                    specialization={selectedCard.internshipSpecialization}
                    internshipSchedule={selectedCard.internshipSchedule}
                    internshipType={selectedCard.internshipType}
                    onSubmit={handleSubmitInternship}
                    // Дополнительная информация о карточке
                    // ...
                />
            )}
        </>
    );
}

export default MainPage;