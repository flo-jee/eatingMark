import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyPlacePage from "./pages/MyPlacePage"; // 추가

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/my-places" element={<MyPlacePage />} />
      </Routes>
    </BrowserRouter>
  );
}
