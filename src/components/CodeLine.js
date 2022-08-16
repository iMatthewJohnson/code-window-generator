import React from "react";
import "./CodeLines.css"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function CodeLine(props) {

    const lengthOfIndent = props.text.search("\\S")
    const trimmedText = props.text.trim()
    const lineSize = trimmedText.length

    const lineStyles = {
        backgroundColor: props.isActive ? "#2F2F2F" : ""
    }

    const codeLineStyles = {
        width: `${lineSize}ch`,
        background: "transparent",
        display: "block",
        animation:
            `typing ${lineSize * 100}ms steps(${lineSize}, end), ` +
            `blink-caret .75s step-end infinite`
    }

    return (
        <div className="line" style={lineStyles}>
            <div className="line-declaration">{props.lineNumber}</div>
            <div className="line-gutter" style={{flexBasis:`${lengthOfIndent}ch`}}/>
            {/*<div className={`code-line ${props.isActive ? "typewriter" : ""}`} style={codeLineStyles}>{trimmedText}</div>*/}
            <SyntaxHighlighter
                language="Java"
                style={codeStyle}
                customStyle={{
                    backgroundColor: "transparent",
                    overflow: "hidden",
                }}
                codeTagProps={{className: props.isActive ? "typewriter" : "", style: codeLineStyles}}>
                {trimmedText}
            </SyntaxHighlighter>
        </div>
    )

}