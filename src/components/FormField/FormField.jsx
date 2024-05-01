import React from 'react';
import './FormField.css';

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
                                      actionButtonImageAlt
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

    return (
        <div className="form-field">
            <div className="label-and-action-button">
                <label className="label" htmlFor={`${id}-${name}`}>{label}</label>
                {actionButtonImage && (
                    <button onClick={actionButtonHandler} className="action-button">
                        <img src={actionButtonImage} alt={actionButtonImageAlt} className="action-button-image"/>
                    </button>
                )}
            </div>
            {inputElement}
        </div>
    );
}
