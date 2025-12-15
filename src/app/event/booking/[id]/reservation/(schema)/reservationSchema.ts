import { z } from "zod";

// 예약 폼 Zod 스키마
export const reservationSchema = z.object({
  name: z
    .string()
    .min(1, "이름을 입력해주세요!")
    .min(2, "이름은 2자 이상으로 입력해주세요!")
    .max(20, "이름은 20자 이하로 입력해주세요!"),

  contact: z
    .string()
    .min(1, "연락처를 입력해주세요!")
    .regex(
      /^010-\d{4}-\d{4}$/,
      "연락처는 010-0000-0000 형식으로 입력해주세요!"
    ),

  email: z
    .string()
    .min(1, "이메일을 입력해주세요!")
    .email({ message: "올바른 이메일 형식이 아닙니다!" }),

  clothesCount: z
    .number({
      required_error: "옷 수량을 입력해주세요!",
      invalid_type_error: "옷 수량은 숫자여야 합니다!",
    })
    .min(0, "옷 수량은 0개 이상이어야 합니다!")
    .max(10, "옷 수량은 최대 10개까지 입니다!"),

  clothImageList: z.array(z.instanceof(File)).optional(),

  isEmailConsent: z.boolean(),
});

// zod가 reservationSchema의 타입을 자동으로 추론
export type ReservationFormData = z.infer<typeof reservationSchema>;
