interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

// 아이콘 컴포넌트
const Icon = ({
  size,
  width,
  height,
  color = "currentColor",
  icon: Component,
  className,
  ...props
}: IconProps) => {
  return (
    <Component
      width={width ?? size}
      height={height ?? size}
      color={color}
      className={className}
      {...props}
    />
  );
};

export default Icon;
