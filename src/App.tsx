import React from 'react';
import './App.css';
import ChatApp from './components/Chat/ChatApp';
import { io } from "socket.io-client";
import config from "./config/config";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import GuardedRoute from "./components/GuardedRoute";
import { useAppSelector } from "./redux/store";
import { selectUsers } from "./redux/slice";

const socket = io(config.api);

function App() {
    const user = useAppSelector((state) =>
        selectUsers(state)
    );
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Home socket={socket}/>} />
                    <Route element={<GuardedRoute auth={!!user}/>}>
                        <Route path="/chat" element={<ChatApp socket={socket}/>} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
