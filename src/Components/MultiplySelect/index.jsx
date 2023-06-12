import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const AutocompleteComponent = ({ options, onChange }) => {
    const [selectedValues, setSelectedValues] = useState([]);

    const handleChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedValues(selectedOptions);
        onChange(selectedOptions);
    };

    return (
        <select multiple value={selectedValues} onChange={handleChange}>
            {/* eslint-disable-next-line react/prop-types */}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default AutocompleteComponent;