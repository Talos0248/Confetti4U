import React from 'react'
import './App.css'
import { fetchMessageById } from '../firebase.js'
import {colorStrings} from "./utils/colorStrings.jsx";
import {RegularConfetti, SnowConfetti, HeartConfetti, StarConfetti, FireflyConfetti} from "./components/Confetti/Confetti.jsx";

function Message() {
    //initializes the state of the dark mode switch to match the user's system preferences
    const [isDark, setIsDark] = React.useState(window.matchMedia("(prefers-color-scheme: dark)").matches);
    const [message, setMessage] = React.useState(null);
    const defaultMessage =         {
        from: "The Developer",
        to: "You",
        confettiType: "",
        sfx: "",
        mainText: "Oh no! The message could not be found!",
        additionalText: "Someone wanted to send you a message, but it got lost in the mail. Did they copy the full link?\nAt least it's the thought that counts, right?",
        music: ""

    }

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        const fetchMessage = async () => {
            const messageData = await fetchMessageById("messages", id);
            setMessage(messageData ? messageData : defaultMessage);
        };

        fetchMessage();
    }, []);


    return (
            <div className={`background${+ isDark? " dark" : ""}`}>
                <div className="giftbox">

                </div>
                {/* Render the message */}
                {message && (
                    <div>
                        <h2>Message Details</h2>
                        <p>ID: {message.mainText}</p>
                        <p>Content: {message.additionalText}</p>
                        {/* Add more fields as needed */}

                        {message.confettiType === "regular" && <RegularConfetti isDark={isDark}/>}
                        {message.confettiType === "snow" && <SnowConfetti isDark={isDark}/>}
                        {message.confettiType === "heart" && <HeartConfetti isDark={isDark}/>}
                        {message.confettiType === "star" && <StarConfetti isDark={isDark}/>}
                        {message.confettiType === "firefly" && <FireflyConfetti isDark={isDark}/>}
                    </div>
                )}
            </div>
    )
}

export default Message