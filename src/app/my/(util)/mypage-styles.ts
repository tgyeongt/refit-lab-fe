import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mypageStyles = {
  // Layout
  layout: {
    container: cn(
      "w-full",
      "max-w-[393px]",
      "bg-[#FCFCFC]",
      "flex",
      "flex-col",
      "items-center"
    ),
  },

  // Profile Section
  profile: {
    header: cn(
      "flex",
      "w-full",
      "h-[160px]",
      "bg-white",
      "rounded-b-lg",
      "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]",
      "relative"
    ),
    content: cn(
      "flex",
      "items-center",
      "justify-between",
      "px-[35px]",
      "w-full",
      "h-20",
      "pt-4"
    ),
    userNameContainer: cn("flex", "items-center", "gap-2", "relative"),
    userName: cn(
      "text-[20px]",
      "font-semibold",
      "leading-[1.193359375em]",
      "tracking-[-0.005em]",
      "text-[#141414]"
    ),
    editButton: cn("flex", "items-center", "justify-center"),
  },

  // Badges Section
  badges: {
    container: cn(
      "z-10",
      "w-full",
      "max-w-[393px]",
      "px-[17px]",
      "mt-[-56px]",
      "mb-10",
      "flex",
      "items-center"
    ),
    wrapper: cn(
      "flex",
      "items-center",
      "w-full",
      "gap-2",
      "border-[1.5px]",
      "border-[#642C8D]",
      "rounded-lg",
      "justify-between",
      "px-9",
      "py-2"
    ),
    membership: cn("flex", "items-center", "gap-3"),
    membershipText: cn(
      "text-[15px]",
      "font-semibold",
      "leading-[1.3333333333333333em]",
      "tracking-[-0.006666666666666667em]",
      "text-[#642C8D]",
      "text-center",
      "pr-2"
    ),
    divider: cn("w-0", "h-[11px]", "border-l", "border-[#642C8D]"),
    ticket: cn("flex", "items-center", "gap-3", "translate-x-[-8px]"),
    ticketText: cn(
      "text-[15px]",
      "font-semibold",
      "leading-[1.3333333333333333em]",
      "tracking-[-0.005em]",
      "text-[#642C8D]",
      "text-center"
    ),
  },

  // Stats Card
  stats: {
    container: cn("w-full", "max-w-[393px]", "px-[17px]", "mb-6"),
    card: cn(
      "w-full",
      "max-w-[360px]",
      "h-[186px]",
      "[background:var(--stats-card-bg)]",
      "rounded-lg",
      "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]",
      "py-[19px]",
      "px-[29px]",
      "relative",
      "overflow-hidden",
      "outline-none",
      "focus:outline-none"
    ),
    chart: cn(
      "absolute",
      "top-[26px]",
      "left-[13px]",
      "right-[13px]",
      "bottom-[44px]",
      "outline-none",
      "focus:outline-none"
    ),
    title: cn(
      "text-[20px]",
      "font-semibold",
      "leading-[1.25em]",
      "tracking-[-0.005em]",
      "text-[#141414]"
    ),
    carbonValue: cn(
      "absolute",
      "bottom-[20px]",
      "right-[20px]",
      "text-[40px]",
      "font-semibold",
      "leading-[1.193359375em]",
      "tracking-[-0.005em]",
      "text-[#642C8D]",
      "text-right"
    ),
    exchangeCount: cn(
      "absolute",
      "bottom-[20px]",
      "left-[29px]",
      "flex",
      "items-center",
      "gap-2"
    ),
    exchangeCountLabel: cn(
      "text-[14px]",
      "font-medium",
      "leading-[1.193359375em]",
      "tracking-[-0.005em]",
      "text-[#757575]"
    ),
    exchangeCountValue: cn(
      "text-[14px]",
      "font-semibold",
      "leading-[1.193359375em]",
      "tracking-[-0.005em]",
      "text-[#757575]"
    ),
  },

  // Menu Section
  menu: {
    container: cn("w-full", "max-w-[393px]", "px-[17px]", "mb-6"),
    section: cn(
      "w-full",
      "max-w-[360px]",
      "bg-white",
      "rounded-lg",
      "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]",
      "px-[29px]",
      "py-[15px]"
    ),
    title: cn(
      "text-[20px]",
      "font-semibold",
      "leading-[1.25em]",
      "tracking-[-0.025em]",
      "text-[#141414]",
      "mb-[15px]"
    ),
    item: cn("flex", "items-center", "justify-between", "py-2", "w-full"),
    itemText: cn(
      "text-[16px]",
      "font-medium",
      "leading-[1.75em]",
      "tracking-[-0.03125em]",
      "text-[#141414]"
    ),
  },
} as const;
