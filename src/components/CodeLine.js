import React from "react";
import "./CodeLines.css"

export default function CodeLine(props) {

    const lengthOfIndent = props.text.search("\\S")
    const trimmedText = props.text.trim()
    const lineSize = props.text.length

    const lineStyles = {
        backgroundColor: props.isActive ? "#2F2F2F" : ""
    }

    const codeLineStyles = {
        width: `${lineSize}ch`,
        textIndent: `${lengthOfIndent}ch`,
        animation:
            `typing ${lineSize * 75}ms steps(${lineSize}, end), ` +
            `blink-caret .75s step-end infinite`
    }

    return (
        <div className="line" style={lineStyles}>
            <div className="line-declaration">{props.lineNumber}</div>
            <span className={`code-line ${props.isActive ? "typewriter" : ""}`} style={codeLineStyles}>{trimmedText}</span>
        </div>
    )

}