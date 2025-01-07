import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}
