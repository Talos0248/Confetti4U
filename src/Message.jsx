import React from 'react';
import './Message.css';
import {fetchMessageById} from '../firebase.js';
import {colorStrings} from './utils/colorStrings.jsx';
import {Loader} from './components/Loader/Loader.jsx';
import {
    RegularConfetti,
    SnowConfetti,
    HeartConfetti,
    StarConfetti,
    FireflyConfetti
} from './components/Confetti/Confetti.jsx';
import {DarkModeSwitch} from 'react-toggle-dark-mode';
import Lottie from 'lottie-react';
import openGiftAnimation from '../public/lottie/open-gift.json';

function Message() {
    // initializes the state of the dark mode switch to match the user's system preferences
    const [isDark, setIsDark] = React.useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
    const toggleDarkMode = () => {
        setIsDark(!isDark);
    };

    const [giftOpened, setGiftOpened] = React.useState(false);
    const openGiftAnimationRef = React.useRef();

    function showMessage() {
        setGiftOpened(true);
    }

    function openGift() {
        openGiftAnimationRef.current.play()
        if (message.sfx) {
            try {
                const audio = new Audio(`sfx/${message.sfx}.mp3`);
                audio.onended = () => {
                    // Code to execute after the audio has finished playing
                    if (message.music) {
                        const music = new Audio(`sfx/${message.music}.mp3`);
                        music.play();
                    }
                };
                audio.play();
            } catch (error) {
                console.error('Error playing sound effect:', error);
            }
        }
    }


    const [message, setMessage] = React.useState(null);
    const defaultMessage = {
        from: 'The Developer',
        to: 'You',
        confettiType: '',
        sfx: '',
        mainText: 'Oh no! The message could not be found!',
        additionalText:
            "Someone wanted to send you a message, but an error occurred!\nAt least it's the thought that counts, right?",
        music: ''
    };

    function splitToParagraphs(text, className = '') {
        return text.split('\n').map((paragraph, index) => {
            return <p key={index} className={className}
                      style={{'--animation-delay': `${8 + index * 4}s`}}>{paragraph}</p>;
        });
    }

    React.useEffect(() => {
        // const urlParams = new URLSearchParams(window.location.search);
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
        const id = urlParams.get('id');

        const fetchMessage = async () => {
            const messageData = await fetchMessageById('messages', id);
            setMessage(messageData ? messageData : defaultMessage);
        };

        fetchMessage();
    }, []);

    return (
        <div className={`message-background${+isDark ? ' dark' : ''}`}>
            <nav className="simple-nav">
                <DarkModeSwitch className="icon" size={36} sunColor="#ff9a61" checked={isDark}
                                onChange={toggleDarkMode}/>
            </nav>
            {!message ? (
                <Loader/>
            ) : !giftOpened ? (
                    <div className="gift-container">
                        <Lottie className="gift-icon" animationData={openGiftAnimation} lottieRef={openGiftAnimationRef}
                                autoplay={false}
                                loop={false} onComplete={showMessage} style={{width: "min(50em, 100%)"}}
                                onClick={openGift}/>
                        <h2 className="gift-text">{colorStrings("Someone has a message for you!", "regular", isDark)}</h2>
                        <p className="gift-description">Tap the Gift Box to Open!</p>
                    </div>
                )
                : (
                    <div className="main-message">
                        <div className="message">
                            {message.to &&
                                <p className="message-to">To: <span className="message-receipent">{message.to}</span>
                                </p>}
                            <h2 className="message-title">
                                {colorStrings(
                                    message.mainText,
                                    message.confettiType ? message.confettiType : 'regular',
                                    isDark
                                )}
                            </h2>
                            {splitToParagraphs(message.additionalText, 'message-text')}
                            {message.from &&
                                <p className="message-from">From: <span className="message-sender">{message.from}</span>
                                </p>}
                        </div>
                        <div>
                            <div className="message-homepage-redirect-container">
                                <a className="message-homepage-redirect" href={`${window.location.origin}/Confetti4U/`}>Make
                                    your own message! <img src={isDark ? "img/rocket-dark.svg" : "img/rocket-light.svg"}
                                                           alt="Go!" className="rocket-icon"/></a>
                            </div>
                        </div>
                        {message.confettiType === 'regular' && <RegularConfetti isDark={isDark}/>}
                        {message.confettiType === 'snowflakes' && <SnowConfetti isDark={isDark}/>}
                        {message.confettiType === 'hearts' && <HeartConfetti isDark={isDark}/>}
                        {message.confettiType === 'stars' && <StarConfetti isDark={isDark}/>}
                        {message.confettiType === 'fireflies' && <FireflyConfetti isDark={isDark}/>}
                    </div>
                )}
        </div>
    );
}

export default Message;
