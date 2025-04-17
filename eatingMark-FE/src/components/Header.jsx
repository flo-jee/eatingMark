import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/30 dark:bg-black/30 backdrop-blur border-b border-white/20 shadow-md">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-3xl font-semibold text-[#D34E5C] hover:opacity-80 hover:scale-105 transition"
          aria-label="홈으로 이동"
        >
          <img
            src="/eatingMarks.png" // public 폴더 기준 경로
            alt="EatingMark 로고"
            className="w-auto h-12 object-contain shrink-0"
          />
        </Link>

        <nav
          className="flex items-center gap-4 flex-nowrap"
          aria-label="주요 내비게이션"
        >
          <DarkModeToggle />
          <Link
            to="/my-places"
            className="text-2xl hover:scale-110 transition transform"
            title="찜한 맛집으로 이동"
            aria-label="찜한 맛집 페이지로 이동"
          >
            <img
              src="/eatingMark_like.png"
              alt="like button"
              className="w-auto h-6 object-contain shrink-0"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
