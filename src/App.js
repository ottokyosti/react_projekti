import { BrowserRouter, Route, Routes } from "react-router-dom";
import Button from "@mui/material/Button";
import TaskControl from "./TaskControl.js";
import Information from "./Information.js";
import MainPage from "./MainPage";
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="nav">
                <nav>
                    <Button id="nav-item" href="/" variant="contained">
                        Main Page
                    </Button>
                    <Button id="nav-item" href="/taskcontrol" variant="contained">
                        Task Control
                    </Button>
                    <Button id="nav-item" href="/information" variant="contained">
                        Information
                    </Button>
                </nav>
            </div>
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="taskcontrol/*" element={<TaskControl />}/>
                <Route path="Information/*" element={<Information />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
