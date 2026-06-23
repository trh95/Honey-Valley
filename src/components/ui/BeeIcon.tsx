interface BeeIconProps {
  className?: string;
}

export default function BeeIcon({ className = "h-6 w-6" }: BeeIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="8" y="7" width="8" height="10" rx="4" />
      <path d="M8 10h8" />
      <path d="M8 13h8" />
      
      <circle cx="12" cy="4" r="2" />
      
      <path d="M12 17v4l-1 1" />
      
      <path d="M16 9c2.5-1.5 5-1.5 5 1s-2.5 3.5-5 2" />
      <path d="M8 9C5.5 7.5 3 7.5 3 10s2.5 3.5 5 2" />
      
      <path d="M11 2c-.5-1-1.5-1-2 0" />
      <path d="M13 2c.5-1 1.5-1 2 0" />
    </svg>
  );
}
