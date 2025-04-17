import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import MainPage from "./pages/MainPage"; // 메인 페이지
import MyPlacePage from "./pages/MyPlacePage"; // 찜한 맛집 목록 페이지
import Header from "./components/Header"; // 공통 헤더 컴포넌트 import

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Header />
        <div className="pt-[64px] bg- text-black dark:bg-gray-900 dark:text-white transition-colors duration-500"></div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/my-places" element={<MyPlacePage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
