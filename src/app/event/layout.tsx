import Header from "@/shared/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="man-h-screen">{children}</main>
    </>
  );
}
