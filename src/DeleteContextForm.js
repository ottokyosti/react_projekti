import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";

export default function DeleteContextForm(props) {
    // useState for contexts fetched from database as FormControlLabel components
    const [array, setArray] = React.useState([]);

    // this useEffect will be called only on mount and maps data to usable component
    React.useEffect(() => {
        axios.get("http://localhost:3010/contexts").then((response) => {
            let tmp = response.data.map((item) => {
                return(
                    <FormControlLabel value={item.id} control={<Radio />} label={item.contextName} />
                );
            });
            setArray(tmp);
        });
    }, []);

    // will return a selection of contexts to choose from, no need to write a context name to be deleted
    return(
        <FormControl>
            <RadioGroup
                value={props.state}
                onChange={(event) => props.change(event.target.value)}
            >
                {array}
            </RadioGroup>
        </FormControl>
    )
}