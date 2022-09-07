import React from "react";
import "./SettingsControl.css"
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import {Autocomplete, Button, createTheme, Stack, ThemeProvider} from "@mui/material";
import codingLanguagesOptions from "../codingLanguagesOptions";
import {PlayCircle, ReplayCircleFilled, StopCircle} from "@mui/icons-material";
import {indigo, green} from "@mui/material/colors";

export default function SettingsControl(props) {

    const theme = createTheme({
        palette: {
            primary: {
                // Purple and green play nicely together.
                main: indigo[500],
            },
            secondary: {
                // This is green.A700 as hex.
                main: green[500]
            },
        },
    });

    const fontSizeMarks = [
        {
            value: 1,
            label: "x-small"
        },
        {
            value: 2,
            label: "small"
        },
        {
            value: 3,
            label: "medium"
        },
        {
            value: 4,
            label: "large"
        },
        {
            value: 5,
            label: "x-large"
        },
    ]

    const typingSpeedMarks = [
        {
            value: 1,
            label: "very slow",
        },
        {
            value: 2,
            label: "slow",
        },
        {
            value: 3,
            label: "normal",
        },
        {
            value: 4,
            label: "fast",
        },
        {
            value: 5,
            label: "very fast",
        },
    ]
    return (
        <ThemeProvider theme={theme}>
        <Stack
            className="settings-control"
            spacing="2rem">
            <div className="dropdown">
                <Autocomplete
                    name="codeLanguage"
                    disablePortal
                    freeSolo
                    autoComplete
                    options={Object.keys(codingLanguagesOptions)}
                    sx={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label="Coding Language" />}
                    value={props.settingsControlValues.codeLanguage}
                    onChange={(event, newValue)  => props.handleSettingsChange("codeLanguage", newValue)}
                />
            </div>
            <div className="slider">
                <Slider
                    name="typingSpeed"
                    min={1}
                    max={5}
                    step={1}
                    track={false}
                    marks={typingSpeedMarks}
                    value={props.settingsControlValues.typingSpeed}
                    valueLabelDisplay="off"
                    onChange={(event) =>props.handleSettingsChange("typingSpeed", event.target.value)}
                    />
            </div>
            <div className="slider">
            <FormatSizeIcon fontSize="small" />
            <Slider
                aria-label="Font Size"
                name="fontSize"
                min={1}
                max={5}
                step={1}
                track={false}
                marks={fontSizeMarks}
                value={props.settingsControlValues.fontSize}
                valueLabelDisplay="off"
                onChange={(event, newValue) => props.handleSettingsChange("fontSize", newValue)}/>
            <FormatSizeIcon fontSize="large" />
            </div>
            <TextField
                name="codeText"
                minRows={10}
                autoFocus
                fullWidth
                variant="outlined"
                multiline
                onChange={(event) => props.handleSettingsChange("codeText", event.target.value)}
                value={props.settingsControlValues.codeText}
            />
                <Stack
                    spacing="2rem"
                    direction="row"
                    alignItems="center"
                    justifyContent="center">
                    <Button
                        variant="contained"
                        onClick={props.handleResetButtonClick}
                        startIcon={!props.isRunning ? <PlayCircle /> : <ReplayCircleFilled />}
                        size="large"
                        disabled={props.settingsControlValues.codeText === ""}
                        color="secondary"
                    >
                        {props.isRunning ? "Restart" : "Play"}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={props.handleStopButtonClick}
                        startIcon={<StopCircle />}
                        size="large"
                        disabled={!props.isRunning}
                        color="error"
                    >
                        Stop
                    </Button>
                </Stack>
        </Stack>
        </ThemeProvider>
    )
}