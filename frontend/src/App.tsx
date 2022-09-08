import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import AuthSucessfull from "./features/auth/transitions/authSuccesfull/AuthSucessfull"
import LogoutSuccessfull from "./features/auth/transitions/logoutSuccessFull/LogoutSuccessfull"
import AccountPage from "./pages/account/AccountPage"
import FeedPage from "./pages/feed/FeedPage"
import LoginPage from "./pages/login/LoginPage"
import RegisterPage from "./pages/register/RegisterPage"
import "./services/tailwindcss/output.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedPage hasNavBar />}/>
        <Route path="/login" element={<LoginPage hasNavBar />} />
        <Route path="/register" element={<RegisterPage hasNavBar />} />
        <Route path="/logout" element={<LogoutSuccessfull />} />
        <Route path="/auth-success" element={<AuthSucessfull />} />
        <Route path="/account" element={<AccountPage hasNavBar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App