import React, { useState, useEffect } from 'react'


// import assets
import MoonIcon from "../assets/icon-moon.svg"
import SunIcon from "../assets/icon-sun.svg"

const ToggleMode = () => {
    const [dark, setDark] = useState(
        () => localStorage.theme === "dark"
    )
    const toggleDarkMode = () => {
        setDark(!dark)
    }

    useEffect(() => {
        const html = window.document.documentElement;

        const prevTheme = dark ? 'light' : 'dark'
        html.classList.remove(prevTheme)

        const nextTheme = dark ? 'dark' : 'light'
        html.classList.add(nextTheme)

        localStorage.setItem("dark", nextTheme)
    }, [dark]);


    return (
        <div>
            <button onClick={toggleDarkMode} className='mr-3 text-xl hover:bg-red hover:text-white p-2 rounded-md'>
                {dark ? <img src={SunIcon} alt="" />
                    : <img src={MoonIcon} alt="" />
                }
            </button>
        </div>
    )
}

export default ToggleMode