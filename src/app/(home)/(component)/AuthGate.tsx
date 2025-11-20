"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import LoginScreen from "./LoginScreen";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setTimeout(() => setHasToken(!!token), 0);

    const timer = setTimeout(() => setFadeOut(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (hasToken === null) return null;

  return (
    <div className="relative w-full min-h-screen">
      {showSplash && (
        <div
          className={`absolute inset-0 transition-opacity duration-200 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
          onTransitionEnd={() => setShowSplash(false)}
        >
          <SplashScreen />
        </div>
      )}
      {!showSplash && !hasToken && (
        <LoginScreen onLogin={() => setHasToken(true)} />
      )}
      {!showSplash && hasToken && <>{children}</>}
    </div>
  );
}
