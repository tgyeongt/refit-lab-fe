import { z } from "zod";

// 행사 폼 Zod 스키마
export const partyFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "행사명을 입력해주세요!")
      .min(2, "행사명은 2자 이상으로 입력해주세요!")
      .max(50, "행사명은 50자 이하로 입력해주세요!"),

    startDate: z.string().min(1, "시작 날짜를 선택해주세요!"),

    endDate: z.string().min(1, "종료 날짜를 선택해주세요!"),

    location: z
      .string()
      .min(1, "장소를 입력해주세요!")
      .min(2, "장소는 2자 이상으로 입력해주세요!")
      .max(100, "장소는 100자 이하로 입력해주세요!"),

    capacity: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          const num = parseInt(val, 10);
          return !isNaN(num) && num > 0 && num <= 10000;
        },
        {
          message: "정원은 1명 이상 10000명 이하로 입력해주세요!",
        }
      ),

    showCapacity: z.boolean(),

    url: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val || val === "") return true;
          try {
            new URL(val);
            return true;
          } catch {
            return false;
          }
        },
        {
          message: "올바른 URL 형식이 아닙니다!",
        }
      ),

    description: z
      .string()
      .min(1, "설명을 입력해주세요!")
      .min(10, "설명은 10자 이상으로 입력해주세요!")
      .max(500, "설명은 500자 이하로 입력해주세요!"),

    thumbnailFile: z.any().optional(),

    status: z.enum(["scheduled", "ongoing", "completed"]),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "종료 날짜는 시작 날짜보다 이후여야 합니다!",
    path: ["endDate"],
  });

// zod가 partyFormSchema의 타입을 자동으로 추론
export type PartyFormData = z.infer<typeof partyFormSchema>;
