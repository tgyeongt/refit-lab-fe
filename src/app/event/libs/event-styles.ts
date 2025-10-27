import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const styles = {
  /** Typography */
  text: {
    heroTitle: cn(
      "text-[32px]",
      "font-medium",
      "leading-[0.625]",
      "tracking-[-0.015625em]"
    ),
    sectionTitle: cn(
      "text-xl",
      "font-semibold",
      "leading-none",
      "tracking-[-0.025em]"
    ),
    cardTitleMedium: cn(
      "text-lg",
      "font-medium",
      "leading-[1.277]",
      "tracking-[-0.027em]"
    ),
    absoluteInset: cn("absolute", "inset-0"),
    absoluteBottom: cn("absolute", "bottom-0", "left-0", "right-0"),
    bodySm: cn(
      "text-sm",
      "font-normal",
      "leading-[1.428]",
      "tracking-[-0.035em]"
    ),
    bodySmMedium: cn(
      "text-sm",
      "font-medium",
      "leading-[1.428]",
      "tracking-[-0.035em]"
    ),
    bodyXs: cn(
      "text-xs",
      "font-normal",
      "leading-[1.666]",
      "tracking-[-0.041em]"
    ),
    bodyXsMedium: cn(
      "text-xs",
      "font-medium",
      "leading-[1.666]",
      "tracking-[-0.041em]"
    ),
    badge: cn("text-[10px]", "leading-[1.6]", "tracking-[-0.04em]"),
    description: cn("text-[14px]", "leading-[1.428]", "tracking-[-0.02em]"),
    button: cn(
      "text-lg",
      "font-semibold",
      "leading-[1.277]",
      "tracking-[-0.027em]"
    ),
  },

  /** Colors */
  color: {
    white: cn("text-white"),
    black: cn("text-black"),
    gray400: cn("text-[#9E9E9E]"),
    gray600: cn("text-[#424242]"),
    bgWhite: cn("bg-white"),
    bgCard: cn("bg-[#F5F5F7]"),
    bgPurple: cn("bg-[#642C8D]"),
    bgRed: cn("bg-[#E42938]"),
    gradientOverlay: cn("bg-linear-to-b", "from-transparent", "to-black/70"),
  },

  /** Layout */
  layout: {
    absoluteInset: cn("absolute", "inset-0"),
    absoluteBottom: cn("absolute", "bottom-0", "left-0", "right-0"),
    flexBetween: cn("flex", "items-center", "justify-between"),
    flexCenter: cn("flex", "items-center", "justify-center"),
    px4: cn("px-4"),
    px7: cn("px-7"),
    py3: cn("py-[3px]"),
    p7: cn("p-7"),
    mb2: cn("mb-2"),
    mb3: cn("mb-3"),
    mb4: cn("mb-4"),
    mb5: cn("mb-5"),
    mb8: cn("mb-8"),
    gap1: cn("gap-1"),
    gap2: cn("gap-2"),
    gap4: cn("gap-4"),
    gap5: cn("gap-5"),
    shadowMd: cn("shadow-md"),
  },

  /** Components */
  component: {
    card: cn("relative", "w-full", "rounded-lg", "overflow-hidden"),
    cardSmall: cn("relative", "w-full", "h-[150px]", "overflow-hidden"),
    button: cn("transition-colors"),
    buttonCTA: cn(
      "h-[59px]",
      "flex",
      "items-center",
      "justify-center",
      "rounded-b-lg"
    ),
    badge: cn(
      "inline-flex",
      "items-center",
      "justify-center",
      "px-[12px]",
      "py-[2px]",
      "rounded"
    ),
    thumbnailSmall: cn(
      "absolute",
      "left-2",
      "top-2",
      "w-[137px]",
      "h-[137px]",
      "rounded-xl",
      "overflow-hidden"
    ),
    iconGroup: cn("flex", "items-center", "gap-1.5"),
    iconGroupSmall: cn("flex", "items-center", "gap-1"),
    lineClamp2: cn("line-clamp-2"),
  },

  /** Position */
  position: {
    heroBackButton: cn("absolute", "top-[229px]", "right-[100px]", "z-10"),
    heroContent: cn("pb-[91px]", "absolute", "bottom-0", "left-0", "right-0"),
    cardArrow: cn("absolute", "right-5", "top-6.5"),
    cardContent: cn("absolute", "left-[166px]", "right-6", "top-6"),
  },
} as const;
