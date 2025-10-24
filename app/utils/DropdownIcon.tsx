function DropdownIcon({ status, setStatus }: { status: boolean, setStatus: Function }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      onClick={() => setStatus(!status)}
      className={`size-10 transform transition-transform duration-300 ${
        status ? "rotate-90" : "rotate-0"
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

export default DropdownIcon;