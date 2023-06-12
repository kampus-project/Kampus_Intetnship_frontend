import './MainPage.css';
import Header from "../../Components/Header/index.jsx";
import Card from "../../Components/Card/index.jsx";
import {useState} from "react";
import Pagination from '@mui/material/Pagination';
import Modal from "../../Components/ModalWindow/index.jsx";

function MainPage() {

    const cardData = [
        { id: 1, title: 'Вакансия стажировки',subtitle: 'Название компании', shortDescription: 'Краткое описание вакансии (1 предложение)',description: 'Основная информация о вакансии, чем предстоит заниматься, какой стек технологий, обязанности и т.д.', specialization: 'Наука и образование', internshipSchedule:'Полный рабочий день',internshipType:'Удаленная работа'},
        { id: 2, title: 'Вакансия стажировки',subtitle: 'Название компании', shortDescription: 'Краткое описание вакансии (1 предложение)',description: 'Основная информация о вакансии, чем предстоит заниматься, какой стек технологий, обязанности и т.д.', specialization: 'Рабочий персонал', internshipSchedule:'Временная подработка',internshipType:'Работа в офисе'},
        { id: 3, title: 'Вакансия стажировки',subtitle: 'Название компании', shortDescription: 'Краткое описание вакансии (1 предложение)',description: 'Основная информация о вакансии, чем предстоит заниматься, какой стек технологий, обязанности и т.д.', specialization: 'Финансы и бухгалтерия', internshipSchedule:'Полный рабочий день',internshipType:'Удаленная работа'},
        { id: 4, title: 'Вакансия стажировки',subtitle: 'Название компании', shortDescription: 'Краткое описание вакансии (1 предложение)',description: 'Основная информация о вакансии, чем предстоит заниматься, какой стек технологий, обязанности и т.д.', specialization: 'Наука и образование', internshipSchedule:'Временная подработка',internshipType:'Работа в офисе'},
        { id: 5, title: 'Вакансия стажировки',subtitle: 'Название компании', shortDescription: 'Краткое описание вакансии (1 предложение)',description: 'Основная информация о вакансии, чем предстоит заниматься, какой стек технологий, обязанности и т.д.', specialization: 'Рабочий персонал', internshipSchedule:'Временная подработка',internshipType:'Удаленная работа'},
        { id: 6, title: 'Вакансия стажировки',subtitle: 'Название компании', shortDescription: 'Краткое описание вакансии (1 предложение)',description: 'Основная информация о вакансии, чем предстоит заниматься, какой стек технологий, обязанности и т.д.', specialization: 'Наука и образование', internshipSchedule:'Полный рабочий день',internshipType:'Работа в офисе'},
        { id: 7, title: 'Вакансия стажировки',subtitle: 'Название компании', shortDescription: 'Краткое описание вакансии (1 предложение)',description: 'Основная информация о вакансии, чем предстоит заниматься, какой стек технологий, обязанности и т.д.', specialization: 'Рабочий персонал', internshipSchedule:'Временная подработка',internshipType:'Работа в офисе'},
        { id: 8, title: 'Вакансия стажировки',subtitle: 'Название компании', shortDescription: 'Краткое описание вакансии (1 предложение)',description: 'Основная информация о вакансии, чем предстоит заниматься, какой стек технологий, обязанности и т.д.', specialization: 'Рабочий персонал', internshipSchedule:'Неполный рабочий день',internshipType:'Удаленная работа'},
        { id: 9, title: 'Вакансия стажировки',subtitle: 'Название компании', shortDescription: 'Краткое описание вакансии (1 предложение)',description: 'Основная информация о вакансии, чем предстоит заниматься, какой стек технологий, обязанности и т.д.', specialization: 'Наука и образование', internshipSchedule:'Неполный рабочий день',internshipType:'Работа в офисе'},
        { id: 10, title: 'Вакансия стажировки',subtitle: 'Название компании', shortDescription: 'Краткое описание вакансии (1 предложение)',description: 'Основная информация о вакансии, чем предстоит заниматься, какой стек технологий, обязанности и т.д.', specialization: 'Финансы и бухгалтерия', internshipSchedule:'Полный рабочий день',internshipType:'Работа в офисе'},
        { id: 11, title: 'Вакансия стажировки',subtitle: 'Название компании', shortDescription: 'Краткое описание вакансии (1 предложение)',description: 'Основная информация о вакансии, чем предстоит заниматься, какой стек технологий, обязанности и т.д.', specialization: 'Финансы и бухгалтерия', internshipSchedule:'Неполный рабочий день',internshipType:'Удаленная работа'},
        { id: 12, title: 'Вакансия стажировки',subtitle: 'Название компании', shortDescription: 'Краткое описание вакансии (1 предложение)',description: 'Основная информация о вакансии, чем предстоит заниматься, какой стек технологий, обязанности и т.д.', specialization: 'Финансы и бухгалтерия', internshipSchedule:'Неполный рабочий день',internshipType:'Работа в офисе'},
    ];

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

    let content;
    if (filteredCards.length === 0) {
        content = <p style={{fontSize:'20px'}}>По вашему запросу ничего не найдено</p>;
    } else {
        content = (
            <div className="card-list">
                {currentCards.map((card) => (
                    <Card key={card.id}
                          title={card.title}
                          shortDescription={card.shortDescription}
                          subtitle={card.subtitle}
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
                    title={selectedCard.title}
                    subtitle={selectedCard.subtitle}
                    description={selectedCard.description}
                    specialization={selectedCard.specialization}
                    internshipSchedule={selectedCard.internshipSchedule}
                    internshipType={selectedCard.internshipType}
                    // Дополнительная информация о карточке
                    // ...
                />
            )}
        </>
    );
}

export default MainPage;