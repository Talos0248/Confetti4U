import React from "react";
import FormField from "../FormField/FormField.jsx";
import {colorStrings} from "../../utils/colorStrings.jsx";

import "./Form.css";

export default function Form({isDark}) {

    const [formData, setFormData] = React.useState(
        {
            from: "",
            to: "",
            confettiType: "",
            soundEffect: "",
            textContent: "",
        }
    )

    function handleSubmit(event) {
        event.preventDefault();
    }

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
        console.log(formData)
    }

        return (
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="from-and-to">
                        <FormField name="from" label="From:" type="text" handleChange={handleChange} value={formData.from} placeholder="Me"/>
                        <FormField name="to" label="To:" type="text" handleChange={handleChange} placeholder="You"/>
                    </div>
                    <FormField name="confettiType" label="Confetti Type:" type="dropdown" handleChange={handleChange} value={formData.confettiType}
                               options={[
                        {value: "None", label: "None"},
                        {value: "confetti", label: "Confetti"},
                        {value: "hearts", label: "Hearts"},
                        {value: "stars", label: "Stars"},
                        {value: "bubbles", label: "Bubbles"},
                    ]}/>
                    <FormField name="soundEffect" label="Sound Effect:" type="dropdown" handleChange={handleChange} value={formData.soundEffect}
                               options={[
                        {value: "None", label: "None"},
                        {value: "kids-cheering", label: "Kids Cheering"},
                        {value: "applause", label: "Applause"},
                        {value: "cheering", label: "Cheering"},
                        {value: "bell", label: "Bell"},
                    ]}/>
                    <FormField name="textContent" label="Text Content:" type="textarea" handleChange={handleChange} value={formData.textContent}/>
                    <button type="submit" className="confettify"><span className="confettify-text">{isDark? colorStrings("Confettify!", isDark) : "Confettify!"}</span></button>
                </form>
            </div>
        )
}