import React from "react";
import "./SettingsControl.css"
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import FormatSizeIcon from '@mui/icons-material/FormatSize';

export default function SettingsControl(props) {

    return (
        <div className="settings-control">

            <div className="slider">
                <Slider
                    name="typingSpeed"
                    min={1}
                    max={100}
                    value={props.settingsControlValues.typingSpeed}
                    valueLabelDisplay="auto"
                    onChange={props.handleSettingsChange}
                    />
            </div>

            <div className="slider">
            <FormatSizeIcon fontSize="small" />
            <Slider
                name="fontSize"
                min={6}
                max={32}
                value={props.settingsControlValues.fontSize}
                valueLabelDisplay="auto"
                onChange={props.handleSettingsChange}/>
            <FormatSizeIcon fontSize="large" />
            </div>
            <TextField
                name="codeText"
                minRows={10}
                autoFocus
                fullWidth
                variant="outlined"
                multiline
                onChange={props.handleSettingsChange}
                value={props.settingsControlValues.codeText}
            />
            <button onClick={props.handleResetButtonClick}>Replay</button>
        </div>
    )
}