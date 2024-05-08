import React from 'react';
import './Message.css';
import { fetchMessageById } from '../firebase.js';
import { colorStrings } from './utils/colorStrings.jsx';
import { Loader } from './components/Loader/Loader.jsx';
import {
    RegularConfetti,
    SnowConfetti,
    HeartConfetti,
    StarConfetti,
    FireflyConfetti
} from './components/Confetti/Confetti.jsx';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
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

    function splitToParagraphs(text) {
        return text.split('\n').map((paragraph, index) => {
            return <p key={index}>{paragraph}</p>;
        });
    }

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
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
                <DarkModeSwitch className="icon" size={36} sunColor="#ff9a61" checked={isDark} onChange={toggleDarkMode} />
            </nav>
            {!message ? (
                <Loader />
            ) : !giftOpened ? (
                <Lottie animationData={openGiftAnimation} lottieRef={openGiftAnimationRef} autoplay={false} loop={false} onComplete={showMessage}/>
                )
                : (
                <div className="main-message">
                    <div className="message">
                        <h2>
                            {colorStrings(
                                message.mainText,
                                message.confettiType ? message.confettiType : 'regular',
                                isDark
                            )}
                        </h2>
                        {splitToParagraphs(message.additionalText)}
                    </div>

                    {message.confettiType === 'regular' && <RegularConfetti isDark={isDark} />}
                    {message.confettiType === 'snow' && <SnowConfetti isDark={isDark} />}
                    {message.confettiType === 'heart' && <HeartConfetti isDark={isDark} />}
                    {message.confettiType === 'star' && <StarConfetti isDark={isDark} />}
                    {message.confettiType === 'firefly' && <FireflyConfetti isDark={isDark} />}
                </div>
            )}
        </div>
    );
}

export default Message;
