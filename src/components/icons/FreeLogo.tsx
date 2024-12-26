interface FreeLogoProps {
  className?: string;
}

export const FreeLogo = ({ className = '' }: FreeLogoProps) => {
  return (
    <svg
      viewBox="0 0 87 87"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43.5 87C67.5244 87 87 67.5244 87 43.5C87 19.4756 67.5244 0 43.5 0C19.4756 0 0 19.4756 0 43.5C0 67.5244 19.4756 87 43.5 87ZM35.7857 19H51.2143C52.7509 19 54 20.2491 54 21.7857V37.2143C54 38.7509 52.7509 40 51.2143 40H35.7857C34.2491 40 33 38.7509 33 37.2143V21.7857C33 20.2491 34.2491 19 35.7857 19ZM51.2143 47H35.7857C34.2491 47 33 48.2491 33 49.7857V65.2143C33 66.7509 34.2491 68 35.7857 68H51.2143C52.7509 68 54 66.7509 54 65.2143V49.7857C54 48.2491 52.7509 47 51.2143 47Z"
        fill="currentColor"
      />
    </svg>
  );
};
