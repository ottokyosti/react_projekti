import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";

export default function DeleteTaskForm(props) {
    // useState holding fetched task data
    const [resData, setResData] = React.useState([]);

    // this useEffect will be called only on mount and it fetches tasks from database
    React.useEffect(() => {
        axios.get("http://localhost:3010/tasks").then((response) => {
            setResData(response.data);
        })
    }, []);

    // this function gets called when user selects one option from tasks and sets it as a task to be deleted in TaskControl.js
    const handleChange = (event) => {
        props.change(event.target.value);
    }

    // returns a form where user can select from all tasks (shown by name) one which user wishes to delete
    return(
        <FormControl variant="standard" sx={{ minWidth: 200 }}>
            <InputLabel>Task</InputLabel>
            <Select
                value={props.state}
                label="Task"
                onChange={handleChange}
            >
                <MenuItem value=""><em>None</em></MenuItem>
                {resData.map((item) => (
                    <MenuItem key={item.id} value={item}>
                        {item.activity}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>Please select a task to delete</FormHelperText>
        </FormControl>
    );
}