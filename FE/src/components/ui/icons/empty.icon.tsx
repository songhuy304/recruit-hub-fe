import { Icon, IconProps } from "@tabler/icons-react";

export const IconNoData: Icon = ({
  size = 64,
  color = "currentColor",
  stroke = 2,
  ...props
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      {...props}
      viewBox="0 0 64 41"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>No data</title>
      <g transform="translate(0 1)" fill="none" fillRule="evenodd">
        <ellipse fill="#272727" cx="32" cy="33" rx="32" ry="7"></ellipse>
        <g fillRule="nonzero" stroke="#3e3e3e">
          <path d="M55 12.8 44.9 1.3Q44 0 42.9 0H21.1q-1.2 0-2 1.3L9 12.8V22h46z"></path>
          <path
            d="M41.6 16c0-1.7 1-3 2.2-3H55v18.1c0 2.2-1.3 3.9-3 3.9H12c-1.7 0-3-1.7-3-3.9V13h11.2c1.2 0 2.2 1.3 2.2 3s1 2.9 2.2 2.9h14.8c1.2 0 2.2-1.4 2.2-3"
            fill="#1d1d1d"
          ></path>
        </g>
      </g>
    </svg>
  );
};
