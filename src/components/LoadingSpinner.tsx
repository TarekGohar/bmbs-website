interface LoadingSpinnerProps {
  color?: string;
}

export default function LoadingSpinner({
  color = "#FFFFFF",
}: LoadingSpinnerProps) {
  return (
    <div className="rounded-full animate-spinClockwise w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 16 16"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transformOrigin: "50% 50%", // Center the transform origin
          transform: "scale(1)", // Ensure scaling works smoothly across browsers
        }}
      >
        <g fill={color} fillRule="evenodd" clipRule="evenodd">
          <path
            d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
            opacity=".2"
          />
          <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z" />
        </g>
      </svg>
    </div>
  );
}
