import { useEffect, useState } from "react";

// 시스템 설정 기준으로 다크모드 상태를 관리하는 커스텀 훅
export function useDarkMode() {
  // 초기 다크모드 상태 설정
  const [isDark, setIsDark] = useState(() => {
    // 서버 사이드 렌더링 환경 보호
    if (typeof window === "undefined") return false;

    // 1. 로컬스토리지에 저장된 테마가 있으면 그것을 사용
    const saved = localStorage.getItem("theme");

    // 2. 없다면 사용자의 시스템 설정에 따라 다크모드 여부 결정
    return saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // 다크모드 상태가 바뀔 때마다 HTML 문서에 클래스 적용
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement.classList;

    if (isDark) {
      root.add("dark"); // Tailwind의 다크모드 클래스 적용
      localStorage.setItem("theme", "dark"); // 로컬스토리지에 저장
    } else {
      root.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark((prev) => !prev); // 토글 함수: 다크모드 상태를 반전

  return { isDark, toggleDarkMode }; // 현재 다크모드 상태와 토글 함수 반환
}
