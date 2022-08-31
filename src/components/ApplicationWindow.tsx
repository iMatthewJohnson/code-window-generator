import React, {useState} from "react";

import "./ApplicationWindow.css";
import CodeLine from "./CodeLine";
import Tab from "./Tab";
import {v4 as uuidv4} from "uuid";
import {AppSettings} from "../App";

// ===Props===

type ApplicationWindowProps = {
    text: string
    appSettings: AppSettings
    isRunning: boolean
}

function ApplicationWindow(props: ApplicationWindowProps) {

    // ===States===

    // When lineTyping = -1, that means the animation shouldn't run and all lines will be visible without typing
    // animation
    const [lineTyping, setLineTyping] = useState(0)
    // Using both prop and internal state so that we can check when props.appSettings.uuid changes
    // When props.appSettings.uuid changes, this indicates that the typing animation should be reset, so lineTyping needs to be
    // reset to 0 (this is done in "render logic" section)
    const [uuid, setUuid] = useState(uuidv4())
    const [isEditing, setIsEditing] = useState(props.isRunning)


    // ===Global variables===

    const splitText = props.text.split("\n")
    console.log(splitText)
    // ===Functions===

    // Runs when the typing of each line ends
    onanimationend = () => {
        // If we have no more lines to type, end execution
        if (lineTyping >= splitText.length - 1) return

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
        }, props.appSettings.delayBetweenLines)
    }


    // ===Render logic===

    // If props.isEditing is different from internal state's isEditing, change the internal state to match
    // props.isEditing
    if (props.isRunning !== isEditing) {
        // If the current state (before we change it below) of isEditing is true (meaning we are NOT typing), and
        // it's about to be flipped to false ('typing' mode), then reset the UUID so the unique keys of the
        // <CodeLine> get change forcing all lines to be re-rendered new, and reset the typing line to line 0
        if (isEditing) {
            setUuid(uuidv4())
            setLineTyping(0);
        }
        setIsEditing(props.isRunning)
    }


    const linesOfCode = splitText.map((textLine: string, index: number) => {
        // Only show text if the line <= the current line typing.
        // Ensures that lines that haven't been "typed" have no visible text
        const code = (index <= lineTyping || isEditing) ? textLine : ""
        return (<CodeLine
                    key={`${index}-${uuid}`}
                    code={code}
                    isActive={lineTyping === index || (lineTyping === -1 && index === splitText.length - 1)}
                    language={props.appSettings.codeLanguage}
                    typingSpeed={props.appSettings.typingSpeed}
                />)
    })

    // Create blank lines for the lines that proceed the lines with code
    const totalNumberOfLines = 25 // Arbitrary number to cover possible height of window
    for (let index = splitText.length; index < totalNumberOfLines; index++) {
        linesOfCode.push(<CodeLine
                            key={`${index}-${uuid}`}
                            code=""
                            isActive={lineTyping === index}
                            typingSpeed={props.appSettings.typingSpeed}
                            />)
    }

    const appWindowWrapperStyle = {
        fontSize: `${props.appSettings.fontSize / 16}rem`
    }
    return (
        <div className="app-window-wrapper" style={appWindowWrapperStyle}>
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