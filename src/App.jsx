import React from 'react'
import './App.css'
import Navbar from "./components/Navbar/Navbar.jsx"
import Form from "./components/Form/Form.jsx"



function App() {
    //initializes the state of the dark mode switch to match the user's system preferences
    const [isDark, setIsDark] = React.useState(window.matchMedia("(prefers-color-scheme: dark)").matches);


    return (
            <div className={`background${+ isDark? " dark" : ""}`}>
                <Navbar isDark = {isDark} setIsDark = {setIsDark} />
                <main className="main-grid">
                    <Form className = "form" isDark = {isDark}/>
                </main>

            </div>
    )
}

export default App
