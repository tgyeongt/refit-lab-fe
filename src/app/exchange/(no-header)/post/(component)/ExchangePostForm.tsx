"use client";

import CloseIcon from "@/assets/icon/close.svg";
import { usePostForm } from "../(hook)/usePostForm";
import { useSheetSelect } from "../(hook)/useSheetSelect";
import ImageUploader from "./ImageUploader";
import TextField from "./TextField";
import BottomSheet from "./BottomSheet";
import { useRouter } from "next/navigation";
import useLocationStore from "@/shared/stores/locationStore";

interface ExchangePostFormProps {
  onClose?: () => void;
  onSubmit?: (form: any) => void;
}

export default function ExchangePostForm({
  onClose,
  onSubmit,
}: ExchangePostFormProps) {
  const router = useRouter();
  const { form, update, submit } = usePostForm(onSubmit);
  const { location } = useLocationStore();

  const { openSheet, open, tempValue, setTempValue, confirm, close, disabled } =
    useSheetSelect((sheet, value) => {
      if (sheet === "category") update("category", value);
      if (sheet === "condition") update("condition", value);
      if (sheet === "size") update("size", value);
      if (sheet === "wantCategory") update("wantCategory", value);
    });

  const isValid =
    form.photo.length > 0 &&
    form.title.trim() !== "" &&
    form.category !== "" &&
    form.condition !== "" &&
    form.size !== "" &&
    form.wantCategory !== "" &&
    location !== null;

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
          files={form.photo}
          onChange={(files) => update("photo", files)}
        />

        <TextField
          label="제목"
          required
          value={form.title}
          placeholder="예) 오버핏 흰색 셔츠"
          onChange={(v) => update("title", v)}
        />

        <TextField
          label="카테고리"
          required
          value={form.category}
          placeholder="선택해주세요"
          readOnly
          onClick={() => open("category")}
        />

        <TextField
          label="상태"
          required
          value={form.condition}
          placeholder="선택해주세요"
          readOnly
          onClick={() => open("condition")}
        />

        <TextField
          label="사이즈"
          required
          value={form.size}
          placeholder="선택해주세요"
          readOnly
          onClick={() => open("size")}
        />

        <div className="mb-[20px]">
          <div className="flex text-[18px] font-medium mb-[5px] gap-[3px]">
            <span>설명</span>
            <span>(선택)</span>
          </div>

          <textarea
            value={form.description}
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
      </div>

      <div className="border-t-[10px] border-[#EEEEEE]" />

      <div className="px-[18px]">
        <p className="text-[18px] font-medium py-[30px]">교환 희망 아이템</p>

        <TextField
          label="카테고리"
          required
          value={form.wantCategory}
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

      <div className="flex gap-[12px] mt-[80px] px-[18px]">
        <button
          type="button"
          onClick={submit}
          disabled={!isValid}
          className={`
    flex-1 text-[18px] p-[14px] rounded-[10px]
    transition
    ${
      isValid
        ? "bg-[#642C8D] text-white"
        : "bg-[#BDBDBD] text-white cursor-not-allowed"
    }
  `}
        >
          등록하기
        </button>
      </div>

      {/* 카테고리 */}
      <BottomSheet
        open={openSheet === "category"}
        title="카테고리"
        disabled={disabled}
        onClose={close}
        onConfirm={confirm}
      >
        <div className="flex flex-col gap-[12px]">
          {["상의", "하의", "아우터", "신발", "기타"].map((c) => (
            <button
              key={c}
              onClick={() => setTempValue(c)}
              className={`py-[12px] rounded-[8px]
          ${tempValue === c ? "bg-[#F5EDFB] " : ""}
        `}
            >
              {c}
            </button>
          ))}
        </div>
      </BottomSheet>

      {/* 상태 */}
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
            { label: "하", desc: " 수선이 필요함" },
          ].map(({ label, desc }) => {
            const selected = tempValue === label;

            return (
              <button
                key={label}
                onClick={() => setTempValue(label)}
                className={`
            w-full px-[16px] py-[12px]
             rounded-[8px]
            text-left
            transition
            ${selected ? "border-[#642C8D] bg-[#F5EDFB]" : ""}
          `}
              >
                <p className={"text-[16px] font-medium "}>{label}</p>
                <p className="text-[13px] text-[#9E9E9E] mt-[1px]">{desc}</p>
              </button>
            );
          })}
        </div>
      </BottomSheet>

      {/* 사이즈 */}
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
              className={`py-[12px] border rounded-[4px] text-[14px]
          ${
            tempValue === s
              ? "border-[#642C8D] bg-[#642C8D] text-white"
              : "border-[#E0E0E0]"
          }
        `}
            >
              {s}
            </button>
          ))}
        </div>
      </BottomSheet>

      {/* 교환 희망 카테고리 */}
      <BottomSheet
        open={openSheet === "wantCategory"}
        title="교환 희망 카테고리"
        disabled={disabled}
        onClose={close}
        onConfirm={confirm}
      >
        <div className="flex flex-col gap-[12px]">
          {["상의", "하의", "아우터", "신발", "기타"].map((c) => (
            <button
              key={c}
              onClick={() => setTempValue(c)}
              className={`py-[12px] rounded-[8px]
          ${tempValue === c ? "bg-[#F5EDFB] " : ""}
        `}
            >
              {c}
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
