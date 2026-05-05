export default function Logo() {
  return (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="512" height="512" rx="100" fill="#0F172A" />

      <path
        d="M120 380L160 220H352L392 380H120Z"
        stroke="#38BDF8"
        stroke-width="20"
        stroke-linejoin="round"
      />

      <circle cx="256" cy="140" r="25" fill="#38BDF8" />
      <circle cx="170" cy="180" r="15" fill="#0EA5E9" />
      <circle cx="342" cy="180" r="15" fill="#0EA5E9" />

      <line
        x1="256"
        y1="140"
        x2="170"
        y2="180"
        stroke="#38BDF8"
        stroke-width="4"
        opacity="0.6"
      />
      <line
        x1="256"
        y1="140"
        x2="342"
        y2="180"
        stroke="#38BDF8"
        stroke-width="4"
        opacity="0.6"
      />
      <line
        x1="170"
        y1="180"
        x2="210"
        y2="220"
        stroke="#38BDF8"
        stroke-width="4"
        opacity="0.6"
      />
      <line
        x1="342"
        y1="180"
        x2="302"
        y2="220"
        stroke="#38BDF8"
        stroke-width="4"
        opacity="0.6"
      />
      <line
        x1="256"
        y1="140"
        x2="256"
        y2="220"
        stroke="#38BDF8"
        stroke-width="4"
        opacity="0.6"
      />

      <text
        x="50%"
        y="330"
        text-anchor="middle"
        fill="white"
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: "800",
          fontSize: "72px",
          letterSpacing: "4px",
        }}

>
        DNC
      </text>

      <defs>
        <linearGradient
          id="paint0_linear"
          x1="256"
          y1="0"
          x2="256"
          y2="512"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#38BDF8" />
          <stop offset="1" stop-color="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
