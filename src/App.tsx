import React, {useState} from 'react';

import './App.css';
import ApplicationWindow from "./components/ApplicationWindow";
import SettingsControl from "./components/SettingsControl";
import {v4 as uuidv4} from "uuid";

function App() {

    // ===States===

    const [text, setText] = useState("")
    // Used to build a unique key for the lines of code. When the animation needs to be reset, we will set a new uuid
    // which will trigger the ApplicationWindow to reset the typing back to the beginning, regardless if the text
    // has changed
    const [uuid, setUuid] = useState(uuidv4())


    // ===Functions===

    function handleClick(text: string) {
        setText(text)
        setUuid(uuidv4())
    }

  return (
    <div className="App">
        <ApplicationWindow
            text={text}
            codeLanguage={"Java"}
            delayBetweenLines={250}
            uuid={uuid}
            typingSpeed={12}/>
        <SettingsControl handleClick={handleClick}/>
    </div>
  );
}

export default App;
