import React from "react";
import FormField from "../FormField/FormField.jsx";
import {colorStrings} from "../../utils/colorStrings.jsx";
import {RegularConfetti, SnowConfetti, HeartConfetti, StarConfetti, FireflyConfetti} from "../Confetti/Confetti.jsx";
import {submitToFirebase} from "../../../firebase.js";
import {CopyLinkButton} from "../CopyLinkButton/CopyLinkButton.jsx";
import Lottie from "lottie-react";
import successAnimation from "../../../public/lottie/success.json";

import "./Form.css";

export default function Form({isDark}) {

    const [formData, setFormData] = React.useState(
        {
            from: "",
            to: "",
            confettiType: "",
            sfx: "",
            mainText: "",
            additionalText: "",
            music: ""

        }
    )

    const [playSound, setPlaySound] = React.useState(false)
    const [playConfetti, setPlayConfetti] = React.useState(false)
    const [currentAudio, setCurrentAudio] = React.useState(null);
    const [myUrl, setMyUrl] = React.useState("");

    function togglePlayConfetti() {
        setPlayConfetti(!playConfetti)
    }

    function playSoundEffect(sfx) {
        if (currentAudio && currentAudio.src.endsWith(`${sfx}.mp3`) && !currentAudio.paused) {
            currentAudio.pause();
            return;
        }

        if (currentAudio) {
            currentAudio.pause()
            currentAudio.currentTime = 0
        }

        setPlaySound(!playSound)
        const audio = new Audio(`sfx/${sfx}.mp3`)
        setCurrentAudio(audio)
        audio.play()
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

    const [isSending, setIsSending] = React.useState(false);

    const [sentSuccess, setSentSuccess] = React.useState(false)
    const successAnimationRef = React.useRef();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setIsSending(true); // Update your UI here to show sending state
        const docId = await submitToFirebase(formData);
        if (docId) {
            // Update your UI here to show success
            setIsSending(false);
            setSentSuccess(true);
            successAnimationRef.current.play();
            setMyUrl(`${window.location.href}/#/message?id=${docId}`)
        } else {
            // Update your UI here to show error
            alert("Failed to send message.");
            setIsSending(false);
        }
    };

    const buttonText = isSending ? "Sending..." : "Confettify!";


    return (
        <div className="form">
            <form onSubmit={handleSubmit} className={sentSuccess ? "hidden" : ""}>
                <div className="from-and-to">
                    <FormField name="from" label="From:" type="text" handleChange={handleChange} value={formData.from}
                               placeholder="Me"/>
                    <FormField name="to" label="To:" type="text" handleChange={handleChange} placeholder="You"/>
                </div>
                <FormField name="mainText" label="Main Text:" type="text" handleChange={handleChange}
                           placeholder="Happy Birthday!" value={formData.mainText} required={true}/>

                <FormField name="additionalText" label="Text Content:" type="textarea" handleChange={handleChange}
                           placeholder="Enter your message here!" value={formData.additionalText}/>

                <FormField name="confettiType" label="Confetti Type:" type="dropdown" handleChange={handleChange}
                           value={formData.confettiType}
                           options={[
                               {value: "", label: "None"},
                               {value: "regular", label: "Confetti"},
                               {value: "hearts", label: "Hearts"},
                               {value: "stars", label: "Stars"},
                               {value: "snowflakes", label: "Snowflakes"},
                               {value: "fireflies", label: "Fireflies"},
                           ]}
                           toggleSwitch={true} toggleChecked={playConfetti} toggleHandler={togglePlayConfetti}
                           toggleLabel="Preview"
                />
                <FormField name="sfx" label="Sound Effect:" type="dropdown" handleChange={handleChange}
                           value={formData.sfx}
                           actionButtonImage={isDark ? "img/sound-dark.png" : "img/sound-light.png"}
                           actionButtonImageAlt="Play Sound"
                           actionButtonHandler={() => playSoundEffect(formData.sfx)}
                           options={[
                               {value: "", label: "None"},
                               {value: "kids-cheering", label: "Kids Cheering"},
                               {value: "item-get", label: "Item Get!"},
                               {value: "medieval-fanfare", label: "Medieval Fanfare"},
                           ]}/>
                <FormField name="music" label="Music:" type="dropdown" handleChange={handleChange}
                           value={formData.music}
                           actionButtonImage={isDark ? "img/sound-dark.png" : "img/sound-light.png"}
                           actionButtonImageAlt="Play Sound"
                           actionButtonHandler={() => playSoundEffect(formData.music)}
                           options={[
                               {value: "", label: "None"},
                               {value: "happy-birthday", label: "Happy Birthday"},
                               {value: "merry-christmas", label: "Merry Christmas"},
                               {value: "sentimental-music", label: "Sentimental Music"},
                               {value: "mii-theme", label: "Mii Theme"},
                               {value: "clair-de-lune", label: "Clair de Lune"}
                           ]}/>
                <button type="submit" className="confettify" disabled={isSending} onSubmit={handleSubmit}>
                    <span
                        className="confettify-text">{isDark ? colorStrings(buttonText, "regular", isDark) : buttonText}</span>
                </button>

                {/*Normal Confetti*/}
                {playConfetti && formData.confettiType === "regular" && <RegularConfetti isDark={isDark}/>}

                {/*Snow Confetti*/}
                {playConfetti && formData.confettiType === "snowflakes" && <SnowConfetti isDark={isDark}/>}

                {/*Heart Confetti*/}
                {playConfetti && formData.confettiType === "hearts" && <HeartConfetti isDark={isDark}/>}

                {/*Star Confetti*/}
                {playConfetti && formData.confettiType === "stars" && <StarConfetti isDark={isDark}/>}

                {/*Firefly Confetti*/}
                {playConfetti && formData.confettiType === "fireflies" && <FireflyConfetti isDark={isDark}/>}

            </form>
            <div className={`success-message${sentSuccess ? "" : " hidden"}`}>
                <Lottie animationData={successAnimation} lottieRef={successAnimationRef} autoplay={false} loop={false}
                        style={{width: 'min(300px,90%)', height: 'min(300px,30%)', margin: 'auto'}}/>
                <h2 className="success-title">Message Sent!</h2>
                <p className="success-description">Find your message at:</p>
                <a className="success-link" href={myUrl}>{myUrl}</a>
                <div className="success-buttons-container">
                    <CopyLinkButton className="copy-button" myUrl={myUrl}/>
                    <button className="resend-button" onClick={() => window.location.reload()}>Send Another</button>
                </div>
            </div>
        </div>
    )
}