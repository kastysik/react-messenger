import React from 'react';
import './App.css';
import ChatApp from './components/Chat/ChatApp';
import { Socket } from 'socket.io-client';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import GuardedRoute from './components/GuardedRoute';
import { useAppSelector } from './redux/store';
import { selectUsers } from './redux/slice';

// @ts-ignore
const socket = null as Socket;

function App() {
    const user = useAppSelector((state) =>
        selectUsers(state)
    );
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home socket={socket}/>} />
                <Route element={<GuardedRoute auth={!!user}/>}>
                    <Route path="/chat" element={<ChatApp socket={socket}/>} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
