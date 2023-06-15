import './Modal.css';
import {useEffect} from "react";
import {useLocalState} from "../../Modules/useLocalStorage/index.js";
// eslint-disable-next-line react/prop-types
const Modal = ({ open, onClose,onSubmit, title, description, subtitle,specialization,internshipSchedule, internshipType }) => {

    useEffect(() => {
        const handleBodyScroll = () => {
            document.body.classList.remove('modal-open');
        };

        if (open) {
            document.body.classList.add('modal-open');
            document.addEventListener('scroll', handleBodyScroll, { passive: true });
        }

        return () => {
            document.body.classList.remove('modal-open');
            document.removeEventListener('scroll', handleBodyScroll);
        };
    }, [open]);

    const [role,setRole] = useLocalState('','role')

    return (
        <div className={`modal ${open ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>{title}</h2>
                <h3>{subtitle}</h3>
                <p> <span>Описание вакансии:</span>
                    <br/>{description}
                </p>
                <p className="params"><span>Специализация:</span> {specialization}</p>
                <p className="params"><span>График стажировки:</span> {internshipSchedule}</p>
                <p className="params"><span>Вид стажировки:</span> {internshipType}</p>
                    <div className="modal-buttons">
                    <button style={{backgroundColor:"#000000", color:"white"}} onClick={onClose}>Закрыть</button>
                    <button onClick={onSubmit} disabled={role === 'HR' ? true : false}>Откликнуться</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;