import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './global.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./pages/Home.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
