"use client";

import { FormEvent, useMemo, useState } from "react";

import { cn } from "@/app/event/(util)/event-styles";
import mockEventDetail from "@/app/event/booking/(util)/mock-event-detail.json";
import useHeader from "@/shared/hooks/useHeader";

import { EventDetail } from "../(util)/event-detail";
import { CameraIcon } from "@/shared/components/icons/Camera";

interface ReservationPageProps {
  eventDetail?: EventDetail;
}

const MAX_CLOTHES_COUNT = 10;

export default function ReservationPage({ eventDetail }: ReservationPageProps) {
  useHeader({ title: "행사 예약", showBack: true, showMenu: false });

  const detail: EventDetail = useMemo(() => {
    if (eventDetail) return eventDetail;
    return mockEventDetail as EventDetail;
  }, [eventDetail]);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [clothesCount, setClothesCount] = useState(0);
  const [isEmailConsent, setIsEmailConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSubmitDisabled =
    !name.trim() || !contact.trim() || !email.trim() || isSubmitting;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setClothesCount(Number(value));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitDisabled) return;

    setIsSubmitting(true);
    // TODO: 예약 API 연동 시 여기에서 실제 요청을 호출하세요.
    window.setTimeout(() => {
      setIsSubmitting(false);
    }, 600);
  };
  console.log(isSubmitting);

  return (
    <main className="flex w-full justify-center bg-[#FCFCFC]">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[393px] flex-col gap-8 px-5 pb-[19px] pt-6"
      >
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="reservation-name"
              className="text-[18px] font-semibold leading-[1.111] tracking-[-0.027em] text-[#141414]"
            >
              이름
            </label>
            <input
              id="reservation-name"
              name="name"
              type="text"
              placeholder="이름을 입력해주세요."
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-[60px] rounded-lg border border-[#E0E0E0] bg-white px-4 text-[16px] font-normal leading-normal tracking-[-0.025em] text-[#141414] placeholder:text-[#BDBDBD] focus:border-[#642C8D] focus:outline-none"
            />
          </div>

          {/* 연락처 */}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="reservation-contact"
              className="text-[18px] font-semibold leading-[1.111] tracking-[-0.027em] text-[#141414]"
            >
              연락처
            </label>
            <input
              id="reservation-contact"
              name="contact"
              type="tel"
              placeholder="연락처를 입력해주세요."
              autoComplete="tel"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              className="h-[60px] rounded-lg border border-[#E0E0E0] bg-white px-4 text-[16px] font-normal leading-normal tracking-[-0.025em] text-[#141414] placeholder:text-[#BDBDBD] focus:border-[#642C8D] focus:outline-none"
            />
          </div>

          {/* 이메일 */}
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="reservation-email"
              className="text-[18px] font-semibold leading-[1.111] tracking-[-0.027em] text-[#141414]"
            >
              이메일
            </label>
            <input
              id="reservation-email"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-[60px] rounded-lg border border-[#E0E0E0] bg-white px-4 text-[16px] font-normal leading-normal tracking-[-0.025em] text-[#141414] placeholder:text-[#BDBDBD] focus:border-[#642C8D] focus:outline-none"
            />
          </div>
        </section>

        {/* 옷 수량 */}
        <section className="flex flex-col gap-3">
          <p className="text-[18px] font-semibold leading-[1.111] tracking-[-0.027em] text-[#141414]">
            옷 수량
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-[60px] w-[165px] items-center justify-between rounded-lg border border-[#E0E0E0] bg-white px-4">
              <input
                type="number"
                inputMode="numeric"
                placeholder="개수"
                onChange={handleInputChange}
                className="w-full bg-transparent text-[14px] font-medium text-[#141414] placeholder:text-[#BDBDBD] focus:outline-none"
              />
              <span className="ml-2 text-[18px] font-semibold text-[#141414]">
                개
              </span>
            </div>
          </div>
        </section>

        {/* 파티에 가져갈 옷을 골라주세요 */}
        <section className="flex flex-col gap-3">
          <p className="text-[18px] font-semibold leading-[1.111] tracking-[-0.027em] text-[#141414]">
            파티에 가져갈 옷을 골라주세요.
          </p>
          <div className="flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-[#EEE] bg-[#EEE]">
            <CameraIcon color="#757575" width={33} height={33} />
            <span className="text-[14px] font-medium leading-[1.193] tracking-[-0.036em] text-[#757575]">
              {clothesCount}/{MAX_CLOTHES_COUNT}
            </span>
          </div>
        </section>

        {/* 수신 동의 */}
        <section>
          <span className="text-[18px] font-semibold tracking-[-0.027em]">
            수신 동의
          </span>

          <label
            htmlFor="reservation-email-consent"
            className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-[#E0E0E0] bg-white px-5 py-4 mt-2.5"
          >
            <input
              id="reservation-email-consent"
              name="emailConsent"
              type="checkbox"
              checked={isEmailConsent}
              onChange={(event) => setIsEmailConsent(event.target.checked)}
              className="sr-only"
            />

            {/* 체크박스 */}
            <div
              className={cn(
                "flex h-4.5 w-4.5 items-center justify-center rounded-full transition-colors",
                isEmailConsent ? "bg-[#08B0B7]" : "bg-[#E0E0E0]"
              )}
            />

            {/* 텍스트 */}
            <span
              className={cn(
                "flex flex-col gap-1 text-[16px] font-medium leading-normal tracking-[-0.031em]",
                isEmailConsent ? "text-[#141414]" : "text-[#9E9E9E]"
              )}
            >
              이메일로 파티 관련 소식을 듣겠습니다.
            </span>
          </label>
        </section>

        {/* 예약하기 */}
        <button
          type="submit"
          disabled={isSubmitDisabled || isSubmitting}
          className={cn(
            "mt-4.5 h-[60px] rounded-lg text-[18px] font-semibold leading-[1.111] tracking-[-0.027em] transition-colors",
            isSubmitDisabled
              ? "bg-[#BDBDBD] text-white"
              : "bg-[#642C8D] text-white hover:bg-[#54257D]"
          )}
        >
          {isSubmitting ? "예약 중..." : "예약하기"}
        </button>
      </form>
    </main>
  );
}
