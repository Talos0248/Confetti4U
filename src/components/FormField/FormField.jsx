import React from 'react';
import './FormField.css';
import Switch from "react-switch";

// Component for a single form field
export default function FormField({
                                      type = 'text', // Default value for type
                                      handleChange,
                                      name,
                                      value,
                                      options,
                                      label,
                                      placeholder,
                                      actionButtonImage,
                                      actionButtonHandler,
                                      actionButtonImageAlt,
                                      toggleSwitch, // A boolean indicating whether a toggle should be shown
                                      toggleChecked, // A boolean indicating whether the toggle is checked
                                      toggleHandler, // Function to handle toggle switch action
    toggleCheckedIcon,
    toggleUncheckedIcon
                                  }) {
    const id = React.useId();

    let inputElement;

    switch (type) {
        case 'text':
            inputElement = <input
                type="text"
                onChange={handleChange}
                name={name}
                value={value}
                id={`${id}-${name}`}
                className="text-input"
                placeholder={placeholder}
            />;
            break;
        case 'dropdown':
            inputElement = <select
                onChange={handleChange}
                name={name}
                value={value}
                id={`${id}-${name}`}
                className="dropdown"
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>;
            break;
        case 'textarea':
            inputElement = <textarea
                onChange={handleChange}
                name={name}
                value={value}
                id={`${id}-${name}`}
                className="textarea"
                placeholder={placeholder}
                rows={5}
            />;
            break;
        default:
            inputElement = null;
    }

    const buttonElement = actionButtonImage ? (
        <button onClick={actionButtonHandler} className="action-button">
            <img src={actionButtonImage} alt={actionButtonImageAlt} className="action-button-image"/>
        </button>
    ) : toggleSwitch ? (
        <Switch onChange={toggleHandler} checked={toggleChecked} checkedIcon={toggleCheckedIcon} uncheckedIcon={toggleUncheckedIcon}/>
    ) : null;

    return (
        <div className="form-field">
            <div className="label-and-action-button">
                <label className="label" htmlFor={`${id}-${name}`}>{label}</label>
                {buttonElement}
            </div>
            {inputElement}
        </div>
    );
}
