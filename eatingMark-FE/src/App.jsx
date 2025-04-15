import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyPlacePage from "./pages/MyPlacePage"; // 추가
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/my-places" element={<MyPlacePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
