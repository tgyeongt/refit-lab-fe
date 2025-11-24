import Link from "next/link";

interface SectionProps {
  title: string;
  content: React.ReactNode;
  detailUrl: string;
}

export default function Section({ title, content, detailUrl }: SectionProps) {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mt-[50px] px-[15px]">
        <h2 className="text-[24px] font-semibold">{title}</h2>
        <Link href={detailUrl} className="text-[14px] text-[#9E9E9E]">
          더보기
        </Link>
      </div>

      <div className="mt-2">{content}</div>
    </section>
  );
}
