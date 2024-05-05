import React from "react";
import FormField from "../FormField/FormField.jsx";
import {colorStrings} from "../../utils/colorStrings.jsx";
import {RegularConfetti, SnowConfetti, HeartConfetti, StarConfetti} from "../Confetti/Confetti.jsx";
import {
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    setDoc
} from "firebase/firestore"

import "./Form.css";

export default function Form({isDark}) {

    const [formData, setFormData] = React.useState(
        {
            from: "",
            to: "",
            confettiType: "",
            soundEffect: "",
            mainText: "",
            additionalText: "",
        }
    )

    const [playSound, setPlaySound] = React.useState(false)
    const [playConfetti, setPlayConfetti] = React.useState(false)

    function togglePlayConfetti() {
        setPlayConfetti(!playConfetti)
    }

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
                    <FormField name="from" label="From:" type="text" handleChange={handleChange} value={formData.from}
                               placeholder="Me"/>
                    <FormField name="to" label="To:" type="text" handleChange={handleChange} placeholder="You"/>
                </div>
                <FormField name="mainText" label="Main Text:" type="text" handleChange={handleChange}
                           placeholder="Happy Birthday!" value={formData.mainText}/>
                <FormField name="additionalText" label="Text Content:" type="textarea" handleChange={handleChange}
                           placeholder="Enter your message here!" value={formData.additionalText}/>

                <FormField name="confettiType" label="Confetti Type:" type="dropdown" handleChange={handleChange}
                           value={formData.confettiType}
                           options={[
                               {value: "None", label: "None"},
                               {value: "confetti", label: "Confetti"},
                               {value: "hearts", label: "Hearts"},
                               {value: "stars", label: "Stars"},
                               {value: "snowflakes", label: "Snowflakes"},
                           ]}
                           toggleSwitch={true} toggleChecked={playConfetti} toggleHandler={togglePlayConfetti}
                />
                <FormField name="soundEffect" label="Sound Effect:" type="dropdown" handleChange={handleChange}
                           value={formData.soundEffect}
                           actionButtonImage={isDark ? "sound-dark.png" : "sound-light.png"}
                           actionButtonImageAlt="Play Sound"
                           options={[
                               {value: "None", label: "None"},
                               {value: "kids-cheering", label: "Kids Cheering"},
                               {value: "applause", label: "Applause"},
                               {value: "cheering", label: "Cheering"},
                               {value: "bell", label: "Bell"},
                           ]}/>
                <button type="submit" className="confettify"><span
                    className="confettify-text">{isDark ? colorStrings("Confettify!", isDark) : "Confettify!"}</span>
                </button>

                {/*Normal Confetti*/}
                {playConfetti && formData.confettiType === "confetti" && <RegularConfetti isDark={isDark}/>}

                {/*Snow Confetti*/}
                {playConfetti && formData.confettiType === "snowflakes" && <SnowConfetti isDark={isDark}/>}

                {/*Heart Confetti*/}
                {playConfetti && formData.confettiType === "hearts" && <HeartConfetti isDark={isDark}/>}

                {/*Star Confetti*/}
                {playConfetti && formData.confettiType === "stars" && <StarConfetti isDark={isDark}/>}

            </form>
        </div>
    )
}