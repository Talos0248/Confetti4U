import "./Navbar.css";
import {colorStrings} from "../../utils/colorStrings.jsx";
import {DarkModeSwitch} from 'react-toggle-dark-mode';

export default function Navbar(props) {

    const toggleDarkMode = () => {
        props.setIsDark(!props.isDark);
    }

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="logo-and-description">
                    <h2 className="logo">{colorStrings("Confetti4U", "regular", props.isDark)}</h2>
                    <div className="description">
                        <h3>•</h3>
                        <h3>Confetti for Every Occasion</h3>
                    </div>
                </div>

                <ul className="nav-icons">
                    <li>
                        <DarkModeSwitch className="icon" size={36} sunColor ="#ff9a61" checked={props.isDark} onChange={toggleDarkMode}/>
                    </li>
                    <li>
                        <a href="https://github.com/Talos0248/Confetti4U" target="_blank">
                            <img className="icon" src={props.isDark? "img/github-dark.svg" : "img/github-light.svg"} alt=""/>
                        </a>
                    </li>
                    <li>
                        <a href="https://ko-fi.com/talos0248" target="_blank">
                            <img className="icon" src={"img/ko-fi.svg"} alt="Support the dev through Ko-fi!"/>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}