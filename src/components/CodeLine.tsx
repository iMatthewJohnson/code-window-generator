import React from "react";
import "./CodeLines.css"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// ===Props===

type CodeLineProps = {
    code: string
    isActive: boolean
    typingSpeed: number
    language?: string
    lineNumber?: number
}


export default function CodeLine(props: CodeLineProps) {

    // ===Global variables===

    const lengthOfIndent = props.code.search("\\S") // Finds number of leading whitespaces
    const trimmedText = props.code.trim()
    const cursorBlinkSpeed = 0.75


    // ===Render logic===

    const codeLineStyles = {
        width: `${trimmedText.length}ch`,
        background: "transparent",
        display: "block",
        animation:
            `typing ${trimmedText.length / props.typingSpeed}s steps(${trimmedText.length}, end), ` +
            `blink-caret ${cursorBlinkSpeed}s step-end infinite`
    }

    const preElementStyles = {
        backgroundColor: "transparent",
        overflow: "hidden",
    }

    const lineGutterStyles = {
        flexBasis:`${lengthOfIndent}ch`
    }

    return (
        <div className={`line ${props.isActive ? "active" : ""}`}>
            <div className="line-declaration">{props.lineNumber}</div>
            <div className="line-gutter" style={lineGutterStyles}/>
            <SyntaxHighlighter
                language={props.language}
                style={codeStyle}
                customStyle={preElementStyles}
                codeTagProps={{
                    className: `code-line ${props.isActive ? "typewriter" : ""}`,
                    style: codeLineStyles
                }}>
                {trimmedText}
            </SyntaxHighlighter>
        </div>
    )
}