import React from "react";

export default function SettingsControl(props) {

    const [textAreaText, setTextAreaText] = React.useState("")

    function handleChange(event) {
        setTextAreaText(event.target.value)
    }

    return (
        <div className="settings-control">
            <textarea className="text-area" onChange={handleChange}/>
            <button onClick={() => props.handleClick(textAreaText)}>Click</button>
        </div>
    )
}