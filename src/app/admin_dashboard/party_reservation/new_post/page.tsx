"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clsx } from "clsx";
import {
  partyFormSchema,
  type PartyFormData,
} from "./(schema)/partyFormSchema";
import { DatePicker } from "./(component)/DatePicker";
import { FileUploader } from "./(component)/FileUploader";

// 신규 행사 등록 페이지 (CSR)
export default function NewPostPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<PartyFormData>({
    resolver: zodResolver(partyFormSchema),
    defaultValues: {
      name: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      capacity: "",
      showCapacity: true,
      url: "",
      status: "ongoing",
    },
  });

  // react-hook-form으로 통합된 상태 감시
  const showCapacity = watch("showCapacity");
  const selectedStatus = watch("status");

  const onSubmit = (data: PartyFormData) => {
    console.log("제출 데이터:", data);
    // TODO: API 호출하여 서버에 데이터 전송
    alert("행사가 등록되었습니다!");
    router.push("/admin_dashboard/party_reservation");
  };

  const handleTempSave = () => {
    const currentData = getValues();
    console.log("임시 저장 데이터:", currentData);
    // TODO: 로컬 스토리지나 서버에 임시 저장
    localStorage.setItem("partyFormDraft", JSON.stringify(currentData));
    alert("임시 저장되었습니다!");
  };

  const statusOptions = [
    { key: "scheduled", label: "예정", bgColor: "#E0E0E0" },
    {
      key: "ongoing",
      label: "진행중",
      bgColor: "#A772CD",
      textColor: "#FFFFFF",
    },
    { key: "completed", label: "완료", bgColor: "#E0E0E0" },
  ] as const;

  return (
    <div className="w-full h-screen fixed top-0 left-0 pt-20 pl-[219px]">
      <div className="h-full flex flex-col">
        <div className="flex gap-0 flex-1 pl-19 pt-6 overflow-hidden">
          {/* 왼쪽: 폼 영역 (스크롤 가능) */}
          <div className="flex-1 overflow-y-auto pr-18">
            {/* 페이지 제목 */}
            <h1 className="text-xl font-medium text-purple mb-9 mt-4">
              행사글 작성
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 pb-8">
              {/* 상태 */}
              <div>
                <div className="flex gap-5">
                  {statusOptions.map((option) => {
                    const isSelected = selectedStatus === option.key;

                    return (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() =>
                          setValue("status", option.key, {
                            shouldValidate: true,
                          })
                        }
                        className={clsx(
                          "px-3 py-1.5 rounded text-base font-medium cursor-pointer transition-colors",
                          {
                            "bg-[#A772CD] text-white": isSelected,
                            "bg-[#E0E0E0] text-gray-5A": !isSelected,
                          }
                        )}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* 행사명 */}
              <div>
                <label className="block text-base font-medium mb-2">
                  행사명
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="예시) 21% 파티 수원"
                  className={clsx(
                    "w-full h-[45px] px-5 border rounded text-base transition-colors bg-white",
                    {
                      "border-red focus:border-red": errors.name,
                      "border-gray-6 focus:border-purple": !errors.name,
                    }
                  )}
                />
                {errors.name && (
                  <p className="text-red text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* 장소 */}
              <div>
                <label className="block text-base font-medium mb-2">장소</label>
                <input
                  {...register("location")}
                  type="text"
                  placeholder="예시) 경기도 수원시"
                  className={clsx(
                    "w-full h-[45px] px-5 border rounded text-base transition-colors bg-white",
                    {
                      "border-red focus:border-red": errors.location,
                      "border-gray-6 focus:border-purple": !errors.location,
                    }
                  )}
                />
                {errors.location && (
                  <p className="text-red text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* 시작 날짜 / 종료 날짜 */}
              <div className="flex gap-5">
                <div className="flex-1">
                  <label className="block text-base font-medium mb-2">
                    시작 날짜
                  </label>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="2025-08-11"
                      />
                    )}
                  />
                  {errors.startDate && (
                    <p className="text-red text-sm mt-1">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>

                <div className="flex-1">
                  <label className="block text-base font-medium mb-2">
                    종료 날짜
                  </label>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="2025-08-11"
                      />
                    )}
                  />
                  {errors.endDate && (
                    <p className="text-red text-sm mt-1">
                      {errors.endDate.message}
                    </p>
                  )}
                </div>
              </div>

              {/* 정원 */}
              <div>
                <div className="flex items-center gap-14 mb-2">
                  <label className="text-base font-medium">정원</label>
                  <div className="flex gap-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="true"
                        checked={showCapacity === true}
                        onChange={() =>
                          setValue("showCapacity", true, {
                            shouldValidate: true,
                          })
                        }
                        className="appearance-none w-3.5 h-3.5 border border-gray-6 checked:bg-purple checked:border-purple cursor-pointer"
                      />
                      <span className="text-base">표기</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="false"
                        checked={showCapacity === false}
                        onChange={() =>
                          setValue("showCapacity", false, {
                            shouldValidate: true,
                          })
                        }
                        className="appearance-none w-3.5 h-3.5 border border-gray-6 checked:bg-purple checked:border-purple cursor-pointer"
                      />
                      <span className="text-base">미표기</span>
                    </label>
                  </div>
                </div>

                <div
                  className={clsx("flex items-center gap-2 transition-all", {
                    "opacity-100 visible": showCapacity,
                    "opacity-0 invisible h-0": !showCapacity,
                  })}
                >
                  <input
                    {...register("capacity")}
                    type="number"
                    placeholder="111"
                    className={clsx(
                      "w-[153px] h-[45px] px-5 border rounded text-base transition-colors bg-white",
                      {
                        "border-red focus:border-red": errors.capacity,
                        "border-gray-6 focus:border-purple": !errors.capacity,
                      }
                    )}
                  />
                  <span className="text-base font-medium">명</span>
                </div>
                {errors.capacity && showCapacity && (
                  <p className="text-red text-sm mt-1">
                    {errors.capacity.message}
                  </p>
                )}
              </div>

              {/* 세부 링크 (URL) */}
              <div>
                <label className="block text-base font-medium mb-2">
                  세부 링크 (URL)
                </label>
                <input
                  {...register("url")}
                  type="text"
                  placeholder="urllink"
                  className={clsx(
                    "w-full h-[45px] px-5 border rounded text-base transition-colors bg-white",
                    {
                      "border-red focus:border-red": errors.url,
                      "border-gray-6 focus:border-purple": !errors.url,
                    }
                  )}
                />
                {errors.url && (
                  <p className="text-red text-sm mt-1">{errors.url.message}</p>
                )}
              </div>

              {/* 설명 */}
              <div>
                <label className="block text-base font-medium mb-2">설명</label>
                <textarea
                  {...register("description")}
                  placeholder="간단한 설명이 이렇게 들어갑니다."
                  className={clsx(
                    "w-full h-[147px] px-6 py-4 border rounded text-base resize-none transition-colors bg-white",
                    {
                      "border-red focus:border-red": errors.description,
                      "border-gray-6 focus:border-purple": !errors.description,
                    }
                  )}
                />
                {errors.description && (
                  <p className="text-red text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* 대표 사진 (썸네일) */}
              <div>
                <label className="block text-base font-medium mb-2">
                  대표 사진 (썸네일)
                </label>
                <Controller
                  name="thumbnailFile"
                  control={control}
                  render={({ field }) => (
                    <FileUploader onChange={field.onChange} />
                  )}
                />
              </div>
            </form>
          </div>

          {/* 오른쪽: 버튼 영역 (하단 고정) */}
          <div className="w-[420px] border-l bg-white border-gray-5 flex flex-col shrink-0">
            <div className="flex-1"></div>
            <div className="p-7.5 border-t border-gray-5">
              <div className="flex gap-6">
                <button
                  type="button"
                  onClick={handleTempSave}
                  className="flex-1 h-10 bg-[#E0E0E0] text-gray-5A rounded text-base font-medium cursor-pointer hover:bg-gray-5 transition-colors"
                >
                  임시 저장
                </button>
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="flex-1 h-10 bg-purple text-white rounded text-base font-medium cursor-pointer hover:bg-purple/90 transition-colors"
                >
                  올리기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
