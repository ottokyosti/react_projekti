import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";

export default function EditTask(props) {
    // useState holding task name passed from parent component as props
    const [activity, setActivity] = React.useState(props.toEdit.activity);
    // useRef holding context array passed from parent component as props
    // useRef is used here instead of useState because useState's asynchronicity caused problems
    const contexts = React.useRef(props.toEdit.context);
    // useState which holds the fecthed task data
    const [resData, setResData] = React.useState([]);

    // this useEffect will be called only on mount and will fetch task data from database and set it as state
    // to be used later
    React.useEffect(() => {
        axios.get("http://localhost:3010/contexts").then((response) => {
            setResData(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    // this function gets called when user selects values from context list and updates contexts state accordingly
    const handleContexts = (event) => {
        contexts.current = event.target.value;
        props.change({id: props.toEdit.id, activity: activity, context: contexts.current});
    }

    // this returns a task in card form where user can edit it's name and choose new or delete contexts freely
    return(
        <Card elevation={5} sx={{ minWidth: 200 }}>
            <CardContent>
                <b>ID:</b> {props.toEdit.id}
                <Divider sx={{ marginTop: 2, marginBottom: 2 }}/>
                <FormControl variant="standard" sx={{ width: 200 }}>
                    <InputLabel htmlFor="title">Edit title</InputLabel>
                    <Input id="title" value={activity} defaultValue={props.toEdit.activity} onChange={(event) => {
                        setActivity(event.target.value);
                        props.change({id: props.toEdit.id, activity: activity, context: contexts.current});
                    }} />
                </FormControl>
                <br/>
                <FormControl variant="standard" sx={{ width: 200, marginTop: 2 }}>
                    <InputLabel>Edit Contexts</InputLabel>
                    <Select
                        multiple
                        value={contexts.current}
                        onChange={handleContexts}
                        renderValue={(selected) => (selected.join(", "))}
                    >
                        {resData.map((item) => (
                            <MenuItem key={item.id} value={item.contextName}>
                                <Checkbox checked={contexts.current.indexOf(item.contextName) > -1} />
                                <ListItemText primary={item.contextName} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </CardContent>
        </Card>
    );
}