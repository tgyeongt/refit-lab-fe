"use client";

import Header from "@/shared/components/Header";
import AuthGate from "./(component)/AuthGate";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <Header />
      {children}
    </AuthGate>
  );
}
