interface TextFieldProps {
  label: string;
  required?: boolean;
  value: string;
  placeholder?: string;
  onChange?: (v: string) => void;
  readOnly?: boolean;
  onClick?: () => void;
}

export default function TextField({
  label,
  required,
  value,
  placeholder,
  onChange,
  readOnly = false,
  onClick,
}: TextFieldProps) {
  return (
    <div className="mb-[20px]">
      <div className="flex text-[18px] font-medium mb-[5px] gap-[3px]">
        <span>{label}</span>
        {required && <span className="text-[#E42938]">*</span>}
      </div>

      <input
        readOnly={readOnly}
        value={value}
        placeholder={placeholder}
        onClick={onClick}
        onChange={readOnly ? undefined : (e) => onChange?.(e.target.value)}
        className={`w-full border border-[#D1D5DC] rounded-[10px] px-3 py-2 outline-none
          ${readOnly ? "cursor-pointer bg-[#FAFAFA]" : ""}
        `}
      />
    </div>
  );
}
