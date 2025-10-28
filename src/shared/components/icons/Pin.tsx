import { SVGProps } from "react";

export const Pin = ({
  color = "currentColor",
  width = 16,
  height = 16,
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
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        d="M14 7.69985C14 9.28777 13.1995 10.7256 12.2039 11.8999C11.1332 13.1626 9.83675 14.1205 9.0673 14.6326C8.66022 14.9034 8.13982 14.9034 7.73273 14.6326C6.96328 14.1205 5.66686 13.1626 4.59615 11.8999C3.60049 10.7256 2.80002 9.28777 2.80002 7.69985C2.80002 4.60706 5.30722 2.09985 8.40002 2.09985C11.4928 2.09985 14 4.60706 14 7.69985Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M10.5 7.69985C10.5 8.85965 9.55982 9.79985 8.40002 9.79985C7.24022 9.79985 6.30002 8.85965 6.30002 7.69985C6.30002 6.54006 7.24022 5.59985 8.40002 5.59985C9.55982 5.59985 10.5 6.54006 10.5 7.69985Z"
        stroke={color}
        strokeWidth="1.4"
      />
    </svg>
  );
};
