import React from 'react'
import './App.css'
import Navbar from "./components/Navbar/Navbar.jsx"

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';


function App() {
    //initializes the state of the dark mode switch to match the user's system preferences
    const [isDark, setIsDark] = React.useState(window.matchMedia("(prefers-color-scheme: dark)").matches);


    return (
        <MantineProvider>
            <div className={`background + ${isDark? " dark" : ""}`}>
                <Navbar isDark = {isDark} setIsDark = {setIsDark} />
            </div>
        </MantineProvider>
    )
}

export default App
