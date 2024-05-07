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
    toggleLabel, // Label for the toggle switch
    required// Default value for required
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
                required={required}
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
        <label className="toggle-label">
            {toggleLabel}
            <Switch onChange={toggleHandler} checked={toggleChecked} onColor={"#42ccaa"} offColor={"#FF6F61"}
                    height={15} width={30} handleDiameter={17}/>
        </label>
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
