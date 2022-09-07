import React from "react";
import "./SettingsControl.css"
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import {Autocomplete, Button, Stack} from "@mui/material";
import codingLanguagesOptions from "../codingLanguagesOptions";

export default function SettingsControl(props) {


    return (
        <Stack
            className="settings-control"
            spacing="2rem">
            <div className="dropdown">
                <Autocomplete
                    name="codeLanguage"
                    disablePortal
                    freeSolo
                    autoComplete
                    options={codingLanguagesOptions}
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
                    max={100}
                    value={props.settingsControlValues.typingSpeed}
                    valueLabelDisplay="auto"
                    onChange={(event) =>props.handleSettingsChange(event.name, event.value)}
                    />
            </div>

            <div className="slider">
            <FormatSizeIcon fontSize="small" />
            <Slider
                name="fontSize"
                min={8}
                max={32}
                value={props.settingsControlValues.fontSize}
                valueLabelDisplay="auto"
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
            <Button
                variant="contained"
                onClick={props.handleResetButtonClick}
            >
                {props.isRunning ? "Restart" : "Play"}
            </Button>
            {/*<button onClick={props.handleResetButtonClick}>Replay</button>*/}
        </Stack>
    )
}