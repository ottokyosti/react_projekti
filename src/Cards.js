import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import axios from "axios";

const Cards = (props) => {
    // useState which holds the fecthed task data
    const [taskData, setTaskData] = React.useState([]);

    // this useEffect will be called on mount and whenever props.pos(changePosition in MainPage.js) will change,
    // prompting re-render
    React.useEffect(() => {
        axios.get("http://localhost:3010/tasks").then((response) => {
            setTaskData(response.data);
        })
    }, [props.pos]);

    // this function will patch two tasks in the database and thus swithing their position
    // and prompting a re-render by changing props.pos
    const handleRight = (obj) => {
        let index = taskData.indexOf(obj);
        axios.patch(`http://localhost:3010/tasks/${obj.id}`, {
            position: obj.position + 1
        }).then((response) => {
            axios.patch(`http://localhost:3010/tasks/${taskData[index + 1].id}`, {
                position: obj.position
            }).then((result) => {
                props.changePos(props.pos + 1);
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    // this function will patch two tasks in the database and thus swithing their position
    // and prompting a re-render by changing props.pos
    const handleLeft = (obj) => {
        let index = taskData.indexOf(obj);
        axios.patch(`http://localhost:3010/tasks/${obj.id}`, {
            position: obj.position - 1
        }).then((response) => {
            axios.patch(`http://localhost:3010/tasks/${taskData[index - 1].id}`, {
                position: obj.position
            }).then((result) => {
                props.changePos(props.pos + 1);
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    // this function will return from three options depending if array index is first or last:
    // if it's first, the function will return two buttons, where the button to the left is hidden
    // if it's last, the function will return two buttons, where the button to the right is hidden
    // if it's something between, both button will be visible and usable
    // this function acts as an error handler and will prevent user from changing cards position to unintended values
    const firstOrLast = (item, index) => {
        if (index === 0) {
            return (
                <CardActions sx={{ display: "flex", justifyContent: "space-around"}}>
                    <IconButton aria-label="forward" onClick={() => handleLeft(item)} sx={{ visibility: "hidden" }}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton aria-label="back" onClick={() => handleRight(item)}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </CardActions>
            );
        } else if (index === taskData.length - 1) {
            return (
                <CardActions sx={{ display: "flex", justifyContent: "space-around"}}>
                    <IconButton aria-label="forward" onClick={() => handleLeft(item)}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton aria-label="back" onClick={() => handleRight(item)} sx={{ visibility: "hidden" }}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </CardActions>
            );
        } else {
            return (
                <CardActions sx={{ display: "flex", justifyContent: "space-around"}}>
                    <IconButton aria-label="forward" onClick={() => handleLeft(item)}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton aria-label="back" onClick={() => handleRight(item)}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </CardActions>
            );
        }
    }

    let array;
    if (!(props.allCards)) {
        array = taskData.map((item, index) => {
            if (checkName(taskData[index].context, props.name)) {
                return (
                    <Card key={item.id} sx={{ m: 1, minWidth: 250 }} elevation={5}>
                        <CardContent>
                            <b>ID:</b> {item.id}
                            <Divider sx={{ marginY: 1 }} />
                            <b>Acticity:</b> {item.activity}
                        </CardContent>
                    </Card>
                );
            } else {
                return <div key={item.id}></div>
            }
        });
    } else {
        let sortedArray = taskData.sort((a, b) => a.position - b.position);
        array = sortedArray.map((item, index) => {
            return (
                <Card key={item.id} sx={{ m: 1, minWidth: 225, maxWidth: 225 }} elevation={5}>
                    <CardContent>
                        <b>Position:</b> {item.position}
                        <Divider sx={{ marginY: 1 }} />
                        <b>ID:</b> {item.id}
                        <Divider sx={{ marginY: 1 }} />
                        <b>Acticity:</b> {item.activity}
                    </CardContent>
                    {firstOrLast(item, index)}
                </Card>
            );
        });
    }
    return array;
}

// this function will return true if it finds a link between task and a context (through context name)
function checkName(responseName, contextName) {
    for (let i in responseName) {
        if (responseName[i] === contextName) {
            return true;
        }
    }
    return false;
}

export default Cards;