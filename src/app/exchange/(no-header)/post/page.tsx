"use client";

import ExchangePostForm from "./(component)/ExchangePostForm";
import { useRouter } from "next/navigation";

export default function ExchangePostPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <ExchangePostForm
        onClose={() => router.back()}
        onSubmit={(form) => {
          console.log("등록 데이터", form);
          router.back();
        }}
      />
    </div>
  );
}
