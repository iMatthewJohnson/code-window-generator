import React, {AnimationEventHandler, useEffect} from "react";
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
    handleAnimationEnd?: AnimationEventHandler<HTMLElement> | undefined
}


export default function CodeLine(props: CodeLineProps) {

    // ===Global variables===

    const lengthOfIndent = props.code.search("\\S") // Finds number of leading whitespaces. This will be used to
                                                           // "indent" the line of code
    const code = props.code.trimStart() // Trimming off white space at beginning so animation doesn't type a bunch
                                        // of white spaces
    const cursorBlinkSpeed = 0.75

    // ==Effects===

    // When this line of code changes, notify the ApplicationWindow that this line number has changed (used to
    // update the "active" line)
    useEffect(() => {
        if (!props.isRunning) props.handleTextChange(props.lineNumber)
    }, [props.code])

    // ===Render logic===

    // The props and styles will be passed down to the SyntaxHighlighter component, which has a <code> element
    // wrapped inside a <pre> element. These are the styles (and class names) for those elements.
    // This is mostly for computed properties (so the animations can work properly no matter the size of line of
    // code), but also some computed styles and styles that need to be sent to the <pre> and <code> tag in order to
    // look proper.

    const codeLineStyles = {
        width: `${code.length}ch`,
        animation:
            `typing ${code.length / props.typingSpeed}s steps(${code.length}, end), ` +
            `blink-caret ${cursorBlinkSpeed}s step-end infinite`,
    }

    // Used to add conditional class names and the codeLineStyles defined above
    const codeLineProps = {
        className:
            `code-line 
            ${props.isActive && props.isRunning? "typewriter" : ""}
            ${!props.isRunning ? "remove-animation" : ""}`,
        style: codeLineStyles,
        onAnimationEnd: props.handleAnimationEnd
    }

    const preElementStyles = {
        backgroundColor: "transparent",
        overflow: "hidden",
    }

    // Causes line to be indented based on the number of leading white spaces in the original props.code.
    const lineGutterStyles = {
        flexBasis:`${lengthOfIndent}ch`
    }

    return (
        <div className={`line ${props.isActive ? "active" : ""}`}>
            <div className="line-declaration"></div>
            <div className="line-gutter" style={lineGutterStyles}/>
            <SyntaxHighlighter
                language={props.language?.toLowerCase()}
                style={codeStyle}
                customStyle={preElementStyles}
                codeTagProps={codeLineProps}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}