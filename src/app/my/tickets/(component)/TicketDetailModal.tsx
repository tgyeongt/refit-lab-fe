"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Icon from "@/shared/components/Icon";
import CalendarIcon from "@/assets/icon/calendar.svg";
import XIcon from "@/assets/icon/X.svg";
import { useModalActions, useModalInfo } from "@/shared/stores/useModalStore";
import { MOCK_TICKETS } from "../(dummy)/ticketData";
import { Ticket } from "../(types)/ticket";

// 티켓 상태 라벨
const STATUS_LABELS = {
  upcoming: "사용 가능",
  used: "사용 완료",
  expired: "기간 만료",
};

// 티켓 상세 모달
export const TicketDetailModal = () => {
  const { isOpen, type, modalData } = useModalInfo();
  const { closeModal } = useModalActions();
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    if (isOpen && type === "ticket-detail" && modalData?.ticketId) {
      const foundTicket = MOCK_TICKETS.find((t) => t.id === modalData.ticketId);
      setTicket(foundTicket || null);
    }
  }, [isOpen, type, modalData]);

  if (!isOpen || type !== "ticket-detail" || !ticket) {
    return null;
  }

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={closeModal}
      />

      {/* 모달 컨테이너 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[361px] bg-white rounded-lg overflow-hidden">
          {/* 헤더 (보라색) */}
          <div className="relative bg-purple h-[67px] flex items-center justify-between px-4">
            <h2 className="text-xl font-semibold text-white">티켓 상세</h2>
            <button
              onClick={closeModal}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              aria-label="닫기"
            >
              <Icon icon={XIcon} width={12} height={12} color="#FFFFFF" />
            </button>
          </div>

          {/* 콘텐츠 */}
          <div className="px-6 pt-[26px] pb-6">
            {/* 행사명 & 장소 */}
            <div className="text-center mb-[43px]">
              <h3 className="text-xl font-semibold text-purple mb-[5px]">
                {ticket.eventName}
              </h3>
              <p className="text-base font-light text-gray-5A">
                {ticket.location}
              </p>
            </div>

            {/* QR 코드 */}
            <div className="flex flex-col items-center mb-4">
              <div
                className="p-[17.6px] bg-white border border-gray-6 rounded-[14px] mb-4"
                style={{ boxShadow: "0px 1px 2px -1px rgba(0, 0, 0, 0.1)" }}
              >
                <QRCodeSVG
                  value={ticket.qrCode}
                  size={192}
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>

            {/* 상태 */}
            <div className="flex items-center justify-between px-3 h-12 bg-gray-1 rounded-lg mb-[9px]">
              <span className="text-sm text-gray-5A">상태</span>
              <span className="text-base font-medium text-gray-5A">
                {STATUS_LABELS[ticket.status]}
              </span>
            </div>

            {/* 유효기간 */}
            <div className="flex items-center justify-between px-3 h-11 bg-gray-1 rounded-lg">
              <span className="text-sm text-gray-5A">유효기간</span>
              <div className="flex items-center gap-1.5">
                <Icon
                  icon={CalendarIcon}
                  width={12}
                  height={13}
                  color="#642C8D"
                />
                <span className="text-sm font-medium text-black">
                  {ticket.eventDate}
                </span>
              </div>
            </div>
          </div>
          {/* QR 안내 문구 */}
          <p className="text-xs text-gray-6 text-center px-6 pb-8">
            현장에서 위 QR코드를 스태프에게 제시해주세요.
          </p>
        </div>
      </div>
    </>
  );
};
