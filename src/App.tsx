import React, {ChangeEvent, useState} from 'react';

import './App.css';
import ApplicationWindow from "./components/ApplicationWindow";
import SettingsControl from "./components/SettingsControl";
import {v4 as uuidv4} from "uuid";

export type AppSettings = {
    codeText: string
    typingSpeed: number
    codeLanguage: string
    delayBetweenLines: number
    fontSize: number
}

function App() {

    // ===States===

    // Used to build a unique key for the lines of code. When the animation needs to be reset, we will set a new uuid
    // which will trigger the ApplicationWindow to reset the typing back to the beginning, regardless if the text
    // has changed
    const [uuid, setUuid] = useState(uuidv4())

    const [settingsControlValues, setSettingsControlValues] = useState(
    {codeText: "",
               typingSpeed: 12,
               codeLanguage: "Java",
               delayBetweenLines: 250,
               fontSize: 14
          })

    const [isRunning, setIsRunning] = useState(false)


    // ===Functions===

    function handleSettingsChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target
        setSettingsControlValues((prevSettings: AppSettings) => {
            return {...prevSettings,
                [name]: value }
        })
    }

    function handleClick() {
        setIsRunning(false)
    }


    return (
        <div className="App">
            <ApplicationWindow
                text={settingsControlValues.codeText}
                isRunning={isRunning}
                appSettings={settingsControlValues} />
            <SettingsControl handleClick={handleClick} handleSettingsChange={handleSettingsChange}/>
        </div>
  );
}

export default App;
