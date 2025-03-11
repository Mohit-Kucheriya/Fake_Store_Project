import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import CardDetail from "./components/CardDetail";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div className="font-poppins flex h-screen w-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<AddProduct />} />
        <Route path="/detail/:id" element={<CardDetail />} />
        <Route path="/edit/:id" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
