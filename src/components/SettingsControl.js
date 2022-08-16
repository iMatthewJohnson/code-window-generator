import React from "react";
import "./SettingsControl.css"

export default function SettingsControl(props) {

    const [textAreaText, setTextAreaText] = React.useState("")

    function handleChange(event) {
        setTextAreaText(event.target.value)
    }

    return (
        <div className="settings-control">
            <textarea className="text-area" onChange={handleChange} cols="70" rows="20"/>
            <button onClick={() => props.handleClick(textAreaText)}>Replay</button>
        </div>
    )
}