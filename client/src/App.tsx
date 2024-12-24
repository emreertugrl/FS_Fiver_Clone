import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import Footer from "./components/footer";
import Create from "./pages/create";
import Search from "./pages/search";
import Detail from "./pages/detail";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 p-5 max w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-gig" element={<Create />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
