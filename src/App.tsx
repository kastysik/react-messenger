import React from 'react';
import './App.css';
import ChatApp from './components/Chat/ChatApp';
import { io } from 'socket.io-client';
import { apiConfig } from './config/config';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import GuardedRoute from './components/GuardedRoute';
import { useAppSelector } from './redux/store';
import { selectUsers } from './redux/slice';

const socket = io(apiConfig.api);

function App() {
    const user = useAppSelector((state) =>
        selectUsers(state)
    );
    return (
        <HashRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Home socket={socket}/>} />
                    <Route element={<GuardedRoute auth={!!user}/>}>
                        <Route path="/chat" element={<ChatApp socket={socket}/>} />
                    </Route>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
