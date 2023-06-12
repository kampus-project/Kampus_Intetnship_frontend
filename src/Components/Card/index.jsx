
import './Card.css'
// eslint-disable-next-line react/prop-types
const Card = ({ title, shortDescription, subtitle, onClick}) => {
    return (
        <div className="card">
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <p>{shortDescription}</p>
            <button onClick={onClick}> Подробнее </button>
        </div>
    );
};

export default Card;