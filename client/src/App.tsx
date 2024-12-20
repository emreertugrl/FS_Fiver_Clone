import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
