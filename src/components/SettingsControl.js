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
                    defaultValue={50}
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
                defaultValue={14}
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
            />
            {/*<textarea cols={70} rows={10} onChange={props.handleSettingsChange} name={"code-input"}/>*/}
            {/*TODO: Replay button doesnt work when unless the text is changed somehow*/}
            <button onClick={props.handleClick}>Replay</button>
        </div>
    )
}