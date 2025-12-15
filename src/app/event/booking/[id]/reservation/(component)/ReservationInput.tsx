"use client";

import { UseFormRegisterReturn } from "react-hook-form";

interface ReservationInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  register: UseFormRegisterReturn;
  error?: string;
  className?: string;
}

export const ReservationInput = ({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  register,
  error,
  className,
}: ReservationInputProps) => {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={id}
        className="text-[18px] font-semibold leading-[1.111] tracking-[-0.027em] text-[#141414]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register}
        className={`h-[60px] rounded-lg border px-4 text-[16px] font-normal leading-normal tracking-[-0.025em] text-[#141414] placeholder:text-[#BDBDBD] focus:outline-none ${
          error ? "border-red focus:border-red" : "border-[#E0E0E0] bg-white focus:border-[#642C8D]"
        } ${className || ""}`}
      />
      {error && <p className="text-red text-sm">{error}</p>}
    </div>
  );
};

