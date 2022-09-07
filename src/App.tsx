import React, {ChangeEvent, useEffect, useState} from 'react';

import './App.css';
import ApplicationWindow from "./components/ApplicationWindow";
import SettingsControl from "./components/SettingsControl";
import { nanoid } from 'nanoid'


export type AppSettings = {
    codeText: string
    typingSpeed: number
    codeLanguage: string
    delayBetweenLines: number
    fontSize: number
}

function App() {

    // ===States===

    // Used to build a unique key for the lines of code. When the animation needs to be reset, we will set a new sessionId
    // which will trigger the ApplicationWindow to reset the typing back to the beginning, regardless if the text
    // has changed
    const [sessionId, setSessionId] = useState(nanoid())
    const [isRunning, setIsRunning] = useState(false)

    // Property object that holds all the values of each of the controls on the SettingsControl component.
    const [settingsControlValues, setSettingsControlValues] = useState(() => {

        const defaultValues = {
            codeText: "",
            typingSpeed: 3,
            codeLanguage: null,
            delayBetweenLines: 250,
            fontSize: 3
        }

        // Try and get sessionStorage. If it doesn't exist, apply default values.
        // default values are stringified and placed in the JSON.parse() function because the parse function must
        // accept a string. Because sessionStorage.getItem can cause an exception, TypeScript throws a compile
        // exception. The method below allows it to be checked for null, and if it IS then parse a stringified
        // version of defaultValues
        return JSON.parse(sessionStorage.getItem("settings") || JSON.stringify(defaultValues))
    })


    // ===Effects===

    // Saves the state of all the controls in sessionStorage
    useEffect(() => {
        sessionStorage.setItem("settings", JSON.stringify(settingsControlValues))
    }, [settingsControlValues])

    // Turns off animation if user starts to modify the text mid-animation
    useEffect(() => {
        setIsRunning(false)
    }, [settingsControlValues.codeText])


    // ===Functions===

    function handleSettingsChange(name: string, value: string | number) {

        setSettingsControlValues((prevSettings: AppSettings) => {
            return {...prevSettings,
                [name]: value }
        })
    }

    function handleAnimationEnd() {
        setIsRunning(false)
    }

    function resetAnimation() {
        setSessionId(nanoid())
        setIsRunning(true)
    }

    function stopAnimation() {
        setIsRunning(false)
    }

    return (
        <div className="App">
            <ApplicationWindow
                settingsControlValues={settingsControlValues}
                sessionId={sessionId}
                isRunning={isRunning}
                handleAnimationEnd={handleAnimationEnd}
            />
            <SettingsControl
                handleResetButtonClick={resetAnimation}
                handleStopButtonClick={stopAnimation}
                handleSettingsChange={handleSettingsChange}
                settingsControlValues={settingsControlValues}
                isRunning={isRunning}
            />
        </div>
  );
}

export default App;
