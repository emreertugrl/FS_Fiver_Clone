import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import Footer from "./components/footer";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1 p-5 max-w-[1440px] mx-auto w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
