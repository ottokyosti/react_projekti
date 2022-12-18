import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";

export default function AddTaskForm(props) {
    // useState that holds a task name which user has typed into the inputfield
    const [name, setName] = React.useState("");
    // useState for contexts fetched from database
    const [contextData, setContextData] = React.useState([]);
    // useState which holds the fecthed task data
    const [taskData, setTaskData] = React.useState([]);
    // useRef which gets updated as user selects contexts from a selection
    // useRef is used instead of useState, because useState's asynchronicity caused problems
    const contexts = React.useRef([]);

    // this useEffect will be called only on mount and fetches both contexts and tasks
    React.useEffect(() => {
        axios.get("http://localhost:3010/contexts").then((response) => {
            setContextData(response.data);
        });
        axios.get("http://localhost:3010/tasks").then((response) => {
            setTaskData(response.data);
        })
    }, []);

    // this function gets called when user selects values from context list and updates contexts state accordingly
    const handleContexts = (event) => {
        contexts.current = event.target.value;
        props.change([name, contexts.current, taskData.length + 1]);
    };

    // returns a form where user can write a title for a task and select contexts from a pre-existing list of contexts
    return(
        <React.Fragment>
            <FormControl variant="standard" sx={{ width: 200}}>
                <InputLabel htmlFor="title">Give a title</InputLabel>
                <Input id="title" value={name} onChange={(event) => {
                    setName(event.target.value);
                    props.change([name, contexts.current, taskData.length + 1])
                }} />
            </FormControl>
            <br/>
            <FormControl variant="standard" sx={{ width: 200, marginTop: 2 }}>
                <InputLabel>Select Contexts</InputLabel>
                <Select
                    multiple
                    value={contexts.current}
                    onChange={handleContexts}
                    renderValue={(selected) => (selected.join(", "))}
                >
                    {contextData.map((item) => (
                        <MenuItem key={item.id} value={item.contextName}>
                            <Checkbox checked={contexts.current.indexOf(item.contextName) > -1} />
                            <ListItemText primary={item.contextName} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </React.Fragment>
    );
}
