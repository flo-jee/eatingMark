// React Router의 Link 컴포넌트를 불러옴 (페이지 새로고침 없이 이동)
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="p-4 bg-gray-100 flex items-center justify-between shadow">
      {/* 타이틀을 클릭하면 홈("/")으로 이동 */}
      <Link
        to="/"
        className="text-lg font-bold text-blue-600 hover:text-blue-800 transition"
      >
        🍽 EatingMark 🏠
      </Link>

      {/* 오른쪽 네비게이션 - 내 찜 목록으로 이동 */}
      <nav className="flex gap-4">
        <Link
          to="/my-places"
          className="font-medium text-pink-600 hover:text-pink-800 hover:underline transition"
        >
          💖
        </Link>
      </nav>
    </header>
  );
}

export default Header;
