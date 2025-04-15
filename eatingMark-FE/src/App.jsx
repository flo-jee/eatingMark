// 라우팅 관련 컴포넌트 import
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 각 페이지 컴포넌트 import
import MainPage from "./pages/MainPage"; // 메인 페이지
import MyPlacePage from "./pages/MyPlacePage"; // 찜한 맛집 목록 페이지

// 공통 헤더 컴포넌트 import
import Header from "./components/Header";

function App() {
  return (
    // 전체 앱을 라우터로 감싸줌
    <BrowserRouter>
      {/* 모든 페이지에 공통으로 보여질 Header */}
      <Header />

      {/* 경로(path)에 따라 보여질 페이지 컴포넌트 설정 */}
      <Routes>
        {/* "/" 경로 → MainPage 컴포넌트 렌더링 */}
        <Route path="/" element={<MainPage />} />

        {/* "/my-places" 경로 → MyPlacePage 컴포넌트 렌더링 */}
        <Route path="/my-places" element={<MyPlacePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
