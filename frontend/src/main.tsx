import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './global.css'
import './app.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./pages/home/Home.tsx";
import Game from "@/pages/game/Game.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import {AppCtxProvider} from "@/lib/context/app/AppCtxProvider.tsx";
import {AskForName} from "@/components/AskForName.tsx";
import BoardsWindow from "@/components/board/BoardsWindow.tsx";
import {CurrentGameCtxProvider} from "@/lib/context/currentGame/CurrentGameCtxProvider.tsx";
import {CreateGame} from "@/pages/game/CreateGame.tsx";
import {JoinGame} from "@/pages/game/JoinGame.tsx";
import SocketCtxProvider from "@/lib/context/socket/SocketCtxProvider.tsx";
import {MainGame} from "@/pages/game/MainGame.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Toaster richColors theme="light"/>
        <AppCtxProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/game" element={<CurrentGameCtxProvider>
                        <SocketCtxProvider>
                            <Game/>
                        </SocketCtxProvider>
                    </CurrentGameCtxProvider>}>
                        <Route path="" index element={<MainGame/>}/>
                        <Route path="join/:code" element={<JoinGame/>}/>
                        <Route path="create" element={<CreateGame/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
            <AskForName/>
            <BoardsWindow/>
        </AppCtxProvider>
    </StrictMode>,
)
