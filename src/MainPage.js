import * as React from "react";
import axios from "axios";
import Cards from "./Cards.js";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

function MainPage(props) {
    // useState for the database and what you see in main page
    const [stateOfThisMess, setDatabase] = React.useState([]);
    // useState for contexts fetched from database
    const [contextData, setContextData] = React.useState([]);
    // useState controlling whether you see only one context with tasks, all contexts with tasks
    // or only tasks
    const [sortString, setSortString] = React.useState({string: "", whatToSee: "contexts"});
    // useState controlling message that appears in a button used to show only tasks
    const [buttonMessage, setButtonMessage] = React.useState("Only tasks");
    // useState disabling sorting choices when viewing only tasks
    const [isDisabled, setIsDisabled] = React.useState(false);
    // useState causing re-render in Cards.js when position is changed
    const [changePosition, setChangePosition] = React.useState(0);
    
    // this useEffect gets called on mount and whenever sortString state changes
    // it will fetch contexts from database (while Cards.js fetches tasks)
    // and saves an array to a state which will then render in MainPage return
    React.useEffect(() => {
        axios.get("http://localhost:3010/contexts").then((contextRes) => { 
            setContextData(contextRes.data);  
            if (sortString.string === "" && sortString.whatToSee === "contexts") {
                let array = contextRes.data.map((item) => {
                    return (
                        <Paper sx={{ p: 1, width: 1000 }} key={item.id} elevation={5}>
                            <h3>{item.contextName}</h3>
                            <div style={{ overflow: "scroll", maxWidth: 1000, display: "flex", flexDirection: "row", paddingBottom: 10 }}>
                                <Cards allCards={false} name={item.contextName} />
                            </div>
                        </Paper>
                    );
                });
                setDatabase(array);
            } else if (sortString.whatToSee === "tasks") {
                setDatabase([
                    <div style={{display: "flex", flexWrap: "wrap", width: 1015}}>
                        <Cards allCards={true} name={""} pos={changePosition} changePos={setChangePosition} />
                    </div>
                ])
            } else {
                setDatabase([<Paper sx={{ p: 1, width: 1000 }} elevation={5}>
                                <h3>{sortString.string}</h3>
                                <div style={{ overflow: "scroll", maxWidth: 1000, display: "flex", flexDirection: "row", paddingBottom: 10 }}>
                                    <Cards allCards={false} name={sortString.string} />
                                </div>
                            </Paper>])
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [sortString, changePosition]);

    // clickHandler gets called when user clicks "Only tasks"-button. Depending what the button says,
    // it will modify sortString state so that only tasks or tasks with contexts will be shown
    const clickHandler = () => {
        if (buttonMessage === "Only tasks") {
            setSortString({string: "", whatToSee: "tasks"});
            setButtonMessage("With categories");
            setIsDisabled(true);
        } else {
            setSortString({string: "", whatToSee: "contexts"});
            setButtonMessage("Only tasks");
            setIsDisabled(false);
        }
    }

    return (
        <div className="categories">
            <Stack
                sx={{m: 2}}
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={1}
            >
                {stateOfThisMess}
            </Stack>
            <FormControl variant="standard" sx={{ marginTop: 2, display: "flex", flexDirection: "column" }}>
                <RadioGroup
                    value={sortString.string}
                    onChange={(event) => {setSortString({string: event.target.value, whatToSee: "contexts"})}}
                >
                    <FormControlLabel value="" disabled={isDisabled} control={<Radio />} label={"Kaikki"} />
                    {contextData.map((item) => {
                        return (<FormControlLabel key={item.id} value={item.contextName} disabled={isDisabled} control={<Radio />} label={item.contextName} />)
                    })}
                </RadioGroup>
                <Button sx={{ marginTop: 2 }} variant="contained" onClick={clickHandler}>{buttonMessage}</Button>
            </FormControl>
        </div>  
    );
}

export default MainPage;