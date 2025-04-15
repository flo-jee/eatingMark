import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="p-4 bg-gray-100 flex items-center justify-between shadow">
      {/* 타이틀 클릭 → 홈 이동 */}
      <Link
        to="/"
        className="text-lg font-bold text-blue-600 hover:text-blue-800 transition"
      >
        🍽 EatingMark 🏠
      </Link>

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
