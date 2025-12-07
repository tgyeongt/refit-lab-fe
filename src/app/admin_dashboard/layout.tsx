import { AdminHeader } from "./(component)/AdminHeader";
import { AdminSidebar } from "./(component)/AdminSidebar";

// 관리자 페이지 레이아웃
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-1">
      {/* 헤더 */}
      <AdminHeader />

      {/* 사이드바 */}
      <AdminSidebar />

      {/* 메인 콘텐츠 */}
      <main className="ml-[219px] mt-20 p-14">{children}</main>
    </div>
  );
}
