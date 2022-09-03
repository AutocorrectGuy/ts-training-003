import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import AuthSucessfull from "./features/auth/partials/authSuccesfull/AuthSucessfull"
import FeedPage from "./pages/feed/FeedPage"
import LoginPage from "./pages/login/LoginPage"
import RegisterPage from "./pages/register/RegisterPage"
import Secret from "./pages/secret/Secret"
import "./services/tailwindcss/output.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedPage hasNavBar />}/>
        <Route path="/login" element={<LoginPage hasNavBar />} />
        <Route path="/register" element={<RegisterPage hasNavBar />} />
        <Route path="/secret" element={<Secret hasNavBar />} />
        <Route path="/auth-success" element={<AuthSucessfull />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App