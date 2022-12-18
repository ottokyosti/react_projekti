import * as React from 'react';
import DeleteContextForm from "./DeleteContextForm.js";
import AddTaskForm from "./AddTaskForm.js";
import DeleteTaskForm from "./DeleteTaskForm.js";
import EditTask from "./EditTask.js";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import axios from "axios";

function TaskControl(props) {
    // useState controlling the message that appears when interacting with buttons
    const [message, setMessage] = React.useState("");
    // these 6 useStates determine wheter their respective dialog windows are open or not
    const [openAddContext, setOpenAddContext] = React.useState(false);
    const [openDeleteContext, setOpenDeleteContext] = React.useState(false);
    const [openAddTask, setOpenAddTask] = React.useState(false);
    const [openDeleteTask, setOpenDeleteTask] = React.useState(false);
    const [openEditSelect, setOpenEditSelect] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    // this useState holds the value for new context name to be added
    const [textValue, setTextValue] = React.useState("");
    // this useState holds the name for the context to be deleted
    const [deleteSelection, setDeleteSelection] = React.useState("");
    // this useState holds the data for new task in array form (name, contexts, position)
    const [toAddTaskData, setToAddTaskData] = React.useState([]);
    // this useState holds the data for the task that will be deleted
    const [deleteTaskSelect, setDeleteTaskSelect] = React.useState({});
    // this useState holds the data for the task that will be edited
    const [editTarget, setEditTarget] = React.useState({});
    // this useState holds the data for the object that will be used for editing a task
    const [patchObject, setPatchObject] = React.useState({});

    // this function get called whenever a user presses one of the button in the Task Control page
    // depenging on the id, this function will open a correct dialog window
    const handleOpen = (id) => {
        switch (id) {
            case 1: 
                setOpenAddContext(true);
                break;
            case 2:
                setOpenDeleteContext(true);
                break;
            case 3:
                setOpenAddTask(true);
                break;
            case 4:
                setOpenDeleteTask(true);
                break;
            case 5:
                setOpenEditSelect(true);
                break;
            case 6:
                setOpenEdit(true);
                break;
            default: console.log("eslint oo hiljaa");
        }
    }

    // this function get called whenever a user presses a button that will close a dialog window
    // depenging on the id, this function will close a correct dialog window
    const handleClose = (id) => {
        switch (id) {
            case 1:
                setOpenAddContext(false);
                setMessage("");
                break;
            case 2:
                setOpenDeleteContext(false);
                setMessage("");
                break;
            case 3:
                setOpenAddTask(false);
                setMessage("");
                break;
            case 4:
                setOpenDeleteTask(false);
                setMessage("");
                break;
            case 5:
                setOpenEditSelect(false);
                setMessage("");
                break;
            case 6:
                setOpenEdit(false);
                setMessage("");
                break;
            default: console.log("eslint oo hiljaa");
        }
    }

    // this function on call will make a post call to the database and add a context with a name
    const handleAddSubmit = () => {
        if (textValue === "") {
            setOpenAddContext(false);
            setMessage("Failure! Reason: No title given!");
        } else {
            setOpenAddContext(false);
            axios.post("http://localhost:3010/contexts", {
                contextName: textValue               
            }).then((response) => {
                console.log(response);
                setMessage("Context add successful");
            }).catch((err) => {
                console.log(err);
                setMessage("Unexpected error ocurred!");
            });
        }
    }

    // this function on call will make a delete call to the database and will delete a context using id
    const handleDeleteConfirm = () => {
        if (deleteSelection !== undefined) {
            setOpenDeleteContext(false);
            axios.delete(`http://localhost:3010/contexts/${deleteSelection}`).then((response) => {
                console.log(response);
                setMessage("Context delete successful");
            }).catch((err) => {
                console.log(err);
                setMessage("Unexpected error ocurred!");
            });
        } else {
            setOpenDeleteContext(false);
            setMessage("Failure! Reason: None selected!");
        }
    }

    // this function on call will make a post call to the database and will add a task with name, context(s) and position
    const handleAddTaskSubmit = () => {
        if (toAddTaskData[0] !== "" && toAddTaskData[1].length !== 0) {
            setOpenAddTask(false);
            axios.post("http://localhost:3010/tasks", {
                activity: toAddTaskData[0],
                context: toAddTaskData[1],
                position: toAddTaskData[2]
            }).then((response) => {
                console.log(response);
                setMessage("Task add successful");
            }).catch((err) => {
                console.log(err);
                setMessage("Unexpected error ocurred!");
            });
        } else {
            setOpenAddTask(false);
            setMessage("Failure! Reason: No title given or context selected!");
        }
    }

    // this function on call will make a delete call to the database and will delete a task using id
    const handleDeleteTaskConfirm = () => {
        if (deleteTaskSelect.id !== undefined) {
            setOpenDeleteTask(false);
            axios.delete(`http://localhost:3010/tasks/${deleteTaskSelect.id}`).then((response) => {
                console.log(response);
                setMessage("Task delete successfull!");
            }).catch((err) => {
                console.log(err);
                setMessage("Unexpected error ocurred!");
            })
        } else {
            setOpenDeleteTask(false);
            setMessage("Failure! Reason: None selected!");
        }
    }

    // this function when called will open a dialog window where user can edit name and contexts
    // and close a dialog window where user chose the task to edit
    const handleOpenEditDialog = () => {
        if (editTarget.id !== undefined) {
            setOpenEditSelect(false);
            setOpenEdit(true);
        } else {
            setOpenEditSelect(false);
            setMessage("Failure! Reason: None selected!");
        }
    }

    // this function on call will make a patch call to the database and will edit a pre-existing task with another object
    const handleEditConfirm = () => {
        console.log(patchObject);
        if (patchObject.activity !== "" && patchObject.context.length !== 0) {
            setOpenEdit(false);
            axios.patch(`http://localhost:3010/tasks/${patchObject.id}`, patchObject).then((response) => {
                console.log(response);
                setMessage("Task updated successfully!");
            }).catch((err) => {
                console.log(err);
                setMessage("Unexpected error occured!");
            });
        } else {
            setOpenEdit(false);
            setMessage("Failure! Reason: Data insufficient!");
        }
    }

    // all the dialog components in this return are closed by default and will only render when their open argument changes
    // all other interactions are implemented as their own custom component, but adding a context is handled in the
    // return without it's own component as it is simplest of them all
    return(
        <div className="customize">
            <Button variant="outlined" sx={{ marginTop: 1, marginBottom: 1 }} onClick={() => handleOpen(1)}>Add context</Button>
            <Dialog open={openAddContext} onClose={() => handleClose(1)}>
                <DialogTitle>Add Context</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please write a title for your context and hit submit.
                    </DialogContentText>
                    <TextField
                        label=""
                        placeholder="Write a title"
                        variant="standard"
                        fullWidth
                        onChange={(newValue) => setTextValue(newValue.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(1)}>Cancel</Button>
                    <Button onClick={handleAddSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Button variant="outlined" sx={{ marginTop: 1, marginBottom: 1 }} onClick={() => handleOpen(2)}>Delete context</Button>
            <Dialog open={openDeleteContext} onClose={() => handleClose(2)}>
                <DialogTitle>Delete Context</DialogTitle>
                <DialogContent>
                    <DeleteContextForm change={setDeleteSelection} state={deleteSelection}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(2)}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <Button variant="outlined" sx={{ marginTop: 1, marginBottom: 1 }} onClick={() => handleOpen(3)}>Add task</Button>
            <Dialog open={openAddTask} onClose={() => handleClose(3)}>
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <AddTaskForm state={toAddTaskData} change={setToAddTaskData}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(3)}>Cancel</Button>
                    <Button onClick={handleAddTaskSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Button variant="outlined" sx={{ marginTop: 1, marginBottom: 1 }} onClick={() => handleOpen(4)}>Delete task</Button>
            <Dialog open={openDeleteTask} onClose={() => handleClose(4)}>
                <DialogTitle>Delete Task</DialogTitle>
                <DialogContent>
                    <DeleteTaskForm state={deleteTaskSelect} change={setDeleteTaskSelect} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(4)}>Cancel</Button>
                    <Button onClick={handleDeleteTaskConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <Button variant="outlined" sx={{ marginTop: 1, marginBottom: 1 }} onClick={() => handleOpen(5)}>Edit task</Button>
            <Dialog open={openEditSelect} onClose={() => handleClose(5)}>
                <DialogTitle>Select task to edit</DialogTitle>
                <DialogContent>
                    <DeleteTaskForm state={editTarget} change={setEditTarget} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(5)}>Cancel</Button>
                    <Button onClick={handleOpenEditDialog}>Edit</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEdit}>
                <DialogTitle>Edit task</DialogTitle>
                <DialogContent>
                    <EditTask toEdit={editTarget} patchObject={patchObject} change={setPatchObject} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(6)}>Cancel</Button>
                    <Button onClick={handleEditConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <p>{message}</p>
        </div>
    );
}

export default TaskControl;