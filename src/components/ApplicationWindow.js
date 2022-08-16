import React, {useState} from "react";

import "./ApplicationWindow.css";
import CodeLine from "./CodeLine";
import Tab from "./Tab";

function ApplicationWindow(props) {

    // ===States===

    const [lineTyping, setLineTyping] = useState(0)
    // Using both prop and internal state so that we can check when props.uuid changes
    // When props.uuid changes, this indicates that the typing animation should be reset, so lineTyping needs to be
    // reset to 0 (this is done in "render logic" section)
    const [uuid, setUuid] = useState(props.uuid)


    // ===Global variables===

    const splitText = props.text.split("\n")


    // ===Functions===

    // Runs when the typing of each line ends
    onanimationend = () => {
        // If we have no more lines to type, end execution
        if (lineTyping === splitText.length - 1) return

        // Add pause between typing each line
        setTimeout(() => {
            setLineTyping((prevLine) => {
                let newLine = prevLine + 1
                // While there are blank lines, just skip over them
                while (splitText[newLine] === "") {
                    newLine++
                }
                return newLine
            })
        }, props.delayBetweenLines)
    }


    // ===Render logic===

    // If props.uuid is different from internal state's uuid, then reset the line typing back to 0
    if (uuid !== props.uuid) setUuid(() => {
        setLineTyping(0)
        return props.uuid
    })
    const linesOfCode = splitText.map((textLine, index) => {
        // Only show text if the line <= the current line typing.
        // Ensures that lines that haven't been "typed" have no visible text
        const code = index <= lineTyping ? textLine : ""
        return (<CodeLine
                    key={`${code}-${index}-${uuid}`}
                    code={code}
                    isActive={lineTyping === index}
                    language={props.codeLanguage}
                />)
    })

    // Create blank lines for the lines that proceed the lines with code
    const totalNumberOfLines = 20 // Arbitrary number to cover possible height of window
    for (let index = splitText.length; index < totalNumberOfLines; index++) {
        linesOfCode.push(<CodeLine
                            key={`${index}-${uuid}`}
                            code=""
                            isActive={lineTyping === index}
                            />)
    }

    return (
        <div className="app-window-wrapper">
            <div className="app-window">
                <Tab/>
                <div className="editor-window">
                    {linesOfCode}
                </div>
            </div>
        </div>
    )
}

export default ApplicationWindow;