import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/shared/providers";
import Head from "next/head";

export const metadata: Metadata = {
  title: "다시입다연구소",
  description: "당신이 다시 입을 때까지 연구합니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
