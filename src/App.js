import React, {useState} from 'react';

import './App.css';
import ApplicationWindow from "./components/ApplicationWindow";
import SettingsControl from "./components/SettingsControl";

function App() {

    const [text, setText] = useState([""])

    function handleClick(text) {
        setText(text.split("\n"))
    }

  return (
    <div className="App">
        <ApplicationWindow text={text} />
        <SettingsControl handleClick={handleClick}/>
    </div>
  );
}

export default App;
