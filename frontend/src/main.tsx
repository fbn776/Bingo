import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './global.css'
import './app.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./pages/home/Home.tsx";
import Game from "@/pages/game/Game.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import {AskForName} from "@/components/AskForName.tsx";

import {GameCtxProvider} from "@/lib/context/gameCtxProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Toaster richColors/>
        <GameCtxProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/game" element={<Game/>}/>
                </Routes>
            </BrowserRouter>
            <AskForName/>
        </GameCtxProvider>
    </StrictMode>,
)
