"use client";

import AuthGate from "./(component)/AuthGate";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthGate>{children}</AuthGate>;
}
