import React from "react";
import "./CodeLines.css"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function CodeLine(props) {

    const lengthOfIndent = props.code.search("\\S") // Finds number of leading whitespaces
    const trimmedText = props.code.trim()
    const lineSize = trimmedText.length


    const codeLineStyles = {
        width: `${lineSize}ch`,
        background: "transparent",
        display: "block",
        animation:
            `typing ${lineSize * 100}ms steps(${lineSize}, end), ` +
            `blink-caret .75s step-end infinite`
    }

    return (
        <div className={`line ${props.isActive ? "active" : ""}`}>
            <div className="line-declaration">{props.lineNumber}</div>
            <div className="line-gutter" style={{flexBasis:`${lengthOfIndent}ch`}}/>
            {/*<div className={`code-line ${props.isActive ? "typewriter" : ""}`} style={codeLineStyles}>{trimmedText}</div>*/}
            <SyntaxHighlighter
                language={props.language}
                style={codeStyle}
                customStyle={{
                    backgroundColor: "transparent",
                    overflow: "hidden",
                }}
                codeTagProps={{
                    className: `code-line ${props.isActive ? "typewriter" : ""}`,
                    style: codeLineStyles}}>

                {trimmedText}

            </SyntaxHighlighter>
        </div>
    )

}