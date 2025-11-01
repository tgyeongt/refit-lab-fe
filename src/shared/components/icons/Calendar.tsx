import { SVGProps } from "react";

export const Calendar = ({
  color = "currentColor",
  width = 17,
  height = 17,
  ...props
}: SVGProps<SVGSVGElement> & {
  color?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
      preserveAspectRatio="none"
      {...props}
    >
      <path
        d="M3.36458 6.31426H13.2812M4.64633 2.125V3.21798M11.8646 2.125V3.21785M13.9896 5.13035V12.9625C13.9896 14.0187 13.1439 14.875 12.1007 14.875H4.54514C3.50193 14.875 2.65625 14.0187 2.65625 12.9625V5.13035C2.65625 4.07411 3.50193 3.21785 4.54514 3.21785H12.1007C13.1439 3.21785 13.9896 4.07411 13.9896 5.13035Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
