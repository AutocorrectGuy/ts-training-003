import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
// import LoginPage from "./pages/login/LoginPage"
import RegisterPage from "./pages/register/RegisterPage"
import TestNav from "./pages/TestNav/TestNav"
import "./services/tailwindcss/output.css"

const App = () => {
  return (
    <BrowserRouter>
      <TestNav />
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App