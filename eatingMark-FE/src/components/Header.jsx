import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="p-4 bg-gray-100 flex items-center justify-between shadow">
      {/* 왼쪽: 로고 또는 메인 링크 */}
      <Link
        to="/"
        className="font-semibold text-blue-600 hover:underline hover:text-blue-800 transition text-lg"
      >
        🏠 나만의 맛집 🍴
      </Link>

      {/* 오른쪽: 메뉴 */}
      <nav className="flex gap-4">
        <Link
          to="/my-places"
          className="text-pink-600 hover:underline hover:text-pink-800 transition"
        >
          💖 찜한 맛집
        </Link>
      </nav>
    </header>
  );
}

export default Header;
