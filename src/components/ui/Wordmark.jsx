export default function Wordmark({ href = '#top' }) {
  return (
    <a className="wordmark" href={href} aria-label="GAUSSIX">
      <svg className="mark" viewBox="0 0 100 72" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="wmg" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B2CF6" /><stop offset="1" stopColor="#F86606" />
          </linearGradient>
        </defs>
        <line x1="6" y1="60" x2="94" y2="60" stroke="rgba(255,255,255,.18)" strokeWidth="1" />
        <g stroke="url(#wmg)" strokeWidth="1.4" opacity=".55">
          <line x1="30" y1="60" x2="30" y2="40" /><line x1="38" y1="60" x2="38" y2="28" />
          <line x1="46" y1="60" x2="46" y2="18" /><line x1="54" y1="60" x2="54" y2="18" />
          <line x1="62" y1="60" x2="62" y2="28" /><line x1="70" y1="60" x2="70" y2="40" />
        </g>
        <path d="M6 60 C26 60 34 14 50 12 C66 14 74 60 94 60" stroke="url(#wmg)" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="6" cy="60" r="3.4" fill="#8B2CF6" />
        <circle cx="94" cy="60" r="3.4" fill="#F86606" />
        <circle cx="50" cy="12" r="4.2" fill="#fff" />
      </svg>
      <span className="wm-text">
        <span className="wm-name">GAUSSI<span className="x">X</span></span>
        <span className="wm-sub">
          <span className="ai">AI</span> · DATA · <span className="an">SYSTEMS</span>
        </span>
      </span>
    </a>
  );
}
