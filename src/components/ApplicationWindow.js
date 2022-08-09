import React, {useState} from "react";

import "./ApplicationWindow.css"
import CodeLine from "./CodeLine";
import Tab from "./Tab";

function ApplicationWindow(props) {

    const [lineTyping, setLineTyping] = useState(0)

    onanimationend = () => {
        if (lineTyping === props.text.length - 1) return
        setTimeout(() => {
            setLineTyping((prevLine) => {
                let newLine = prevLine + 1
                while (props.text[newLine] === "") {
                    newLine++
                }
                return newLine
            })
        }, 250)
    }

    const linesOfCode = props.text.map((code, index) => {
        const text = index <= lineTyping ? code : ""
        return (<CodeLine key={text + index} text={text} isActive={lineTyping === index} />)
    })

    return (
        <div className="app-window-wrapper">
            <div className="app-window" >
                <div className="editor-window">
                    {linesOfCode}
                </div>
                <Tab />
            </div>
        </div>
    )
}

export default ApplicationWindow;