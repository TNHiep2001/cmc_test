import * as React from "react";
import PropTypes from "prop-types";

const Close = ({ size = 16, color = "#007422" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.53809 5.04743C4.74358 4.84194 5.07675 4.84194 5.28224 5.04743L12.2822 12.0474C12.4877 12.2529 12.4877 12.5861 12.2822 12.7916C12.0767 12.9971 11.7436 12.9971 11.5381 12.7916L4.53809 5.79157C4.3326 5.58608 4.3326 5.25292 4.53809 5.04743Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2822 5.04743C12.4877 5.25292 12.4877 5.58608 12.2822 5.79157L5.28224 12.7916C5.07675 12.9971 4.74358 12.9971 4.53809 12.7916C4.3326 12.5861 4.3326 12.2529 4.53809 12.0474L11.5381 5.04743C11.7436 4.84194 12.0767 4.84194 12.2822 5.04743Z"
        fill={color}
      />
    </svg>
  );
};

Close.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default Close;
