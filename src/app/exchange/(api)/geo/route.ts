import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const x = searchParams.get("x");
  const y = searchParams.get("y");

  if (!x || !y) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
        },
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Kakao API request failed" },
      { status: 500 }
    );
  }
}
