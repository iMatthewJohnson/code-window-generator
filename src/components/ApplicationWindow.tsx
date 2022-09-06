import React, {useEffect, useState} from "react";

import "./ApplicationWindow.css";
import CodeLine from "./CodeLine";
import Tab from "./Tab";
import {AppSettings} from "../App";

// ===Props===

type ApplicationWindowProps = {
    settingsControlValues: AppSettings
    sessionId: string
    isRunning: boolean
    handleAnimationEnd: Function
}

function ApplicationWindow(props: ApplicationWindowProps) {

    // ===States===

    const [lineTyping, setLineTyping] = useState(0)


    // ===Effects===

    // When the sessionId changes, reset the line typing back to the beginning
    useEffect(() => {
        setLineTyping(0)
    }, [props.sessionId])


    // ===Global variables===

    const linesOfCode = props.settingsControlValues.codeText.split("\n")


    // ===Functions===

    // Runs when the typing of each line ends
    onanimationend = () => {

        // Animation can sometimes fire when not supposed to. This ensures that if isRunning is false, then it won't
        // continue to run, which will mess up the lineTyping property (causing the "active" line to not be the line
        // that is supposed to be active.
        if (!props.isRunning) return

        // If we have no more lines to type, end execution
        if (lineTyping >= linesOfCode.length - 1) {
            props.handleAnimationEnd()
            return
        }

        // Add pause between typing each line
        setTimeout(() => {
            setLineTyping((prevLine) => {
                let newLine = prevLine + 1
                // While there are blank lines, just skip over them
                while (linesOfCode[newLine] === "") {
                    newLine++
                }
                return newLine
            })
        }, props.settingsControlValues.delayBetweenLines)
    }


    // ===Render logic===

    // Creates all the <CodeLine> components that are not blank (they have text)
    const codeLines = linesOfCode.map((textLine: string, index: number) => {
        // Only show text if the line <= the current line typing.
        // Ensures that lines that haven't been "typed" have no visible text
        const code = (index <= lineTyping || !props.isRunning) ? textLine : ""
        return (<CodeLine
                    key={`${props.sessionId}-${index}-${code}`}
                    code={code}
                    isActive={lineTyping === index}
                    language={props.settingsControlValues.codeLanguage}
                    typingSpeed={props.settingsControlValues.typingSpeed}
                    isRunning={props.isRunning}
                    handleTextChange={setLineTyping}
                    lineNumber={index}
                />)
    })

    // Create blank lines for the lines that proceed the lines with code
    const totalNumberOfLines = 25 // Arbitrary number to cover possible height of window
    for (let index = linesOfCode.length; index < totalNumberOfLines; index++) {
        codeLines.push(<CodeLine
                            key={`${props.sessionId}-${index}`}
                            code=""
                            isActive={lineTyping === index}
                            typingSpeed={props.settingsControlValues.typingSpeed}
                            isRunning={props.isRunning}
                            handleTextChange={setLineTyping}
                            />)
    }

    const appWindowWrapperStyle = {
        fontSize: `${props.settingsControlValues.fontSize / 16}rem`
    }
    return (
        <div className="app-window-wrapper" style={appWindowWrapperStyle}>
            <div className="app-window">
                <Tab/>
                <div className="editor-window">
                    {codeLines}
                </div>
            </div>
        </div>
    )
}

export default ApplicationWindow;