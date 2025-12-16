"use client";

import CloseIcon from "@/assets/icon/close.svg";
import ImageUploader from "./ImageUploader";
import TextField from "./TextField";
import BottomSheet from "./BottomSheet";
import { useRouter } from "next/navigation";
import useLocationStore from "@/shared/stores/locationStore";
import { useExchangePostStore } from "@/shared/stores/exchangePostStore";
import { useSheetSelect } from "../(hook)/useSheetSelect";
import { createExchangePost } from "@/app/exchange/(api)/createExchangePost";
import { useMyPage } from "@/app/my/(hook)/query/useMyPage";

interface ExchangePostFormProps {
  onClose?: () => void;
  onSubmit?: (form: any) => void;
}

export default function ExchangePostForm({
  onClose,
  onSubmit,
}: ExchangePostFormProps) {
  const { data: myUser, isLoading, isError } = useMyPage();
  const router = useRouter();
  const location = useLocationStore((s) => s.location);

  const CATEGORY_MAP: Record<string, string> = {
    상의: "SHIRTS",
    하의: "PANTS",
    아우터: "OUTER",
    신발: "SHOES",
    액세서리: "ACCESSORY",
  };

  const STATUS_MAP: Record<string, string> = {
    상: "GOOD",
    중: "FAIR",
    하: "BAD",
  };

  const SIZE_MAP: Record<string, string> = {
    Free: "FREE",
    "2XS": "XS2",
    XS: "XS",
    S: "S",
    M: "M",
    L: "L",
    XL: "XL",
    "2XL": "XL2",
    "3XL": "XL3",
  };

  const {
    photo,
    title,
    category,
    condition,
    size,
    wantCategory,
    description,
    letter,
    update,
  } = useExchangePostStore();

  const { openSheet, open, tempValue, setTempValue, confirm, close, disabled } =
    useSheetSelect((sheet, value) => {
      if (sheet === "category") update("category", value);
      if (sheet === "condition") update("condition", value);
      if (sheet === "size") update("size", value);
      if (sheet === "wantCategory") update("wantCategory", value);
    });

  const isValid =
    photo.length > 0 &&
    title.trim() !== "" &&
    category !== "" &&
    condition !== "" &&
    size !== "" &&
    wantCategory !== "" &&
    location !== null;

  const handleSubmit = async () => {
    if (!location) return;
    if (!myUser) return;

    try {
      const request = {
        title,
        exchangeCategory: CATEGORY_MAP[category],
        clothStatus: STATUS_MAP[condition],
        clothSize: SIZE_MAP[size],
        description,
        preferCategoryList: [CATEGORY_MAP[wantCategory]],
        exchangeSpot: location.placeName ?? "",
        spotLatitude: location.lat,
        spotLongitude: location.lng,
        letter,
      };

      const res = await createExchangePost(request, photo);

      router.back();
    } catch (error: any) {
      console.error(error?.response?.data);
    }
  };

  return (
    <div className="bg-white py-[20px]">
      {/* 헤더 */}
      <div className="relative flex items-center mb-[25px] pb-[20px] px-[15px]">
        {onClose && (
          <button onClick={onClose} className="z-10">
            <CloseIcon width={18} height={18} color="#9E9E9E" />
          </button>
        )}
        <span className="absolute left-1/2 -translate-x-1/2 text-[16px] font-medium">
          교환글 작성
        </span>
      </div>

      <div className="px-[18px]">
        <ImageUploader
          files={photo}
          onChange={(files) => update("photo", files)}
        />

        <TextField
          label="제목"
          required
          value={title}
          placeholder="예) 오버핏 흰색 셔츠"
          onChange={(v) => update("title", v)}
        />

        <TextField
          label="카테고리"
          required
          value={category}
          placeholder="선택해주세요"
          readOnly
          onClick={() => open("category")}
        />

        <TextField
          label="상태"
          required
          value={condition}
          placeholder="선택해주세요"
          readOnly
          onClick={() => open("condition")}
        />

        <TextField
          label="사이즈"
          required
          value={size}
          placeholder="선택해주세요"
          readOnly
          onClick={() => open("size")}
        />

        {/* 상품 설명 */}
        <div className="mb-[20px]">
          <div className="flex text-[18px] font-medium mb-[5px] gap-[3px]">
            <span>설명</span>
            <span className="text-[#E42938]">*</span>
          </div>
          <textarea
            value={description}
            placeholder="아이템에 대한 상세 설명을 작성해주세요"
            onChange={(e) => update("description", e.target.value)}
            className="
              w-full min-h-[100px]
              border border-[#D1D5DC]
              rounded-[10px]
              px-3 py-2
              outline-none
              resize-none
            "
          />
        </div>

        {/* 받는 사람에게 보내는 쪽지 */}
        <div className="mb-[20px]">
          <div className="flex text-[18px] font-medium mb-[5px] gap-[3px]">
            <span>받을 사람에게 보내는 쪽지</span>
            <span className="text-[#E42938]">*</span>
          </div>
          <textarea
            value={letter}
            placeholder="교환할 상대방에게 전달할 메시지를 작성해주세요"
            onChange={(e) => update("letter", e.target.value)}
            className="
              w-full min-h-[100px]
              border border-[#D1D5DC]
              rounded-[10px]
              px-3 py-2
              outline-none
              resize-none
            "
          />
        </div>
      </div>

      <div className="border-t-[10px] border-[#EEEEEE]" />

      {/* 교환 희망 아이템 */}
      <div className="px-[18px]">
        <p className="text-[18px] font-medium py-[30px]">교환 희망 아이템</p>
        <TextField
          label="카테고리"
          required
          value={wantCategory}
          placeholder="선택해주세요"
          readOnly
          onClick={() => open("wantCategory")}
        />
        <TextField
          label="교환 스팟"
          required
          value={location?.placeName ?? ""}
          placeholder="선택해주세요"
          readOnly
          onClick={() => router.push("/exchange/map")}
        />
      </div>

      <div className="px-[18px] mt-[80px]">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full p-[14px] rounded-[10px] ${
            isValid ? "bg-[#642C8D]" : "bg-[#BDBDBD]"
          } text-white`}
        >
          등록하기
        </button>
      </div>

      {/* BottomSheets */}
      <BottomSheet
        open={openSheet === "category"}
        title="카테고리"
        disabled={disabled}
        onClose={close}
        onConfirm={confirm}
      >
        <div className="flex flex-col gap-[12px]">
          {["상의", "하의", "아우터", "신발", "액세서리"].map((c) => (
            <button
              key={c}
              onClick={() => setTempValue(c)}
              className={`py-[12px] rounded-[8px] ${
                tempValue === c ? "bg-[#F5EDFB]" : ""
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet
        open={openSheet === "condition"}
        title="상태"
        disabled={disabled}
        onClose={close}
        onConfirm={confirm}
      >
        <div className="flex flex-col gap-[12px]">
          {[
            {
              label: "상",
              desc: "적게 입었으며 눈에 띄는 흔적이나 얼룩이 없음",
            },
            { label: "중", desc: "눈에 띄는 흔적이나 얼룩이 약간 있음" },
            { label: "하", desc: "수선이 필요함" },
          ].map(({ label, desc }) => {
            const selected = tempValue === label;
            return (
              <button
                key={label}
                onClick={() => setTempValue(label)}
                className={`w-full px-[16px] py-[12px] rounded-[8px] text-left transition ${
                  selected ? "border-[#642C8D] bg-[#F5EDFB]" : ""
                }`}
              >
                <p className="text-[16px] font-medium">{label}</p>
                <p className="text-[13px] text-[#9E9E9E] mt-[1px]">{desc}</p>
              </button>
            );
          })}
        </div>
      </BottomSheet>

      <BottomSheet
        open={openSheet === "size"}
        title="사이즈"
        disabled={disabled}
        onClose={close}
        onConfirm={confirm}
      >
        <p className="font-medium text-[16px] mb-[25px]">공용 사이즈</p>
        <div className="grid grid-cols-3 gap-[10px]">
          {["Free", "2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL"].map((s) => (
            <button
              key={s}
              onClick={() => setTempValue(s)}
              className={`py-[12px] border rounded-[4px] text-[14px] ${
                tempValue === s
                  ? "border-[#642C8D] bg-[#642C8D] text-white"
                  : "border-[#E0E0E0]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet
        open={openSheet === "wantCategory"}
        title="교환 희망 카테고리"
        disabled={disabled}
        onClose={close}
        onConfirm={confirm}
      >
        <div className="flex flex-col gap-[12px]">
          {["상의", "하의", "아우터", "신발", "액세서리"].map((c) => (
            <button
              key={c}
              onClick={() => setTempValue(c)}
              className={`py-[12px] rounded-[8px] ${
                tempValue === c ? "bg-[#F5EDFB]" : ""
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
