import React, {useEffect} from "react";
import "./CodeLines.css"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// ===Props===

type CodeLineProps = {
    code: string
    isActive: boolean
    isRunning: boolean
    typingSpeed: number
    handleTextChange: Function
    language?: string
    lineNumber?: number
}


export default function CodeLine(props: CodeLineProps) {

    // ===Global variables===

    const lengthOfIndent = props.code.search("\\S") // Finds number of leading whitespaces
    const trimmedText = props.code.trimStart()
    const cursorBlinkSpeed = 0.75

    // ==Effects===

    useEffect(() => {
        if (!props.isRunning) props.handleTextChange(props.lineNumber)
    }, [props.code])

    // ===Render logic===

    const codeLineStyles = {
        width: `${trimmedText.length}ch`,
        animation:
            `typing ${trimmedText.length / props.typingSpeed}s steps(${trimmedText.length}, end), ` +
            `blink-caret ${cursorBlinkSpeed}s step-end infinite`,
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
                    className:
                        `code-line 
                        ${props.isActive && props.isRunning? "typewriter" : ""}
                        ${!props.isRunning ? "remove-animation" : ""}`,
                    style: codeLineStyles
                }}>
                {trimmedText}
            </SyntaxHighlighter>
        </div>
    )
}