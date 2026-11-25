/**
 * src/components/AuthBrandPanel.jsx — Right-side cream panel with testimonial & illustration.
 *
 * Inspired by the Dribbble reference:
 * - Warm ivory cream (#FAF9F2) background
 * - Testimonial quote framed by tangerine-orange quotation marks
 * - Minimalist geometric architectural line-art SVG with soft pastel fills
 */
export function WowelseLogo() {
  return (
    <div className="brand-logo">
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M14 2L24 7.5V18.5L14 26L4 18.5V7.5L14 2Z"
          fill="#1F5137"
        />
        <rect x="10" y="9" width="3" height="3" rx="0.6" fill="#FAF9F2" />
        <rect x="15" y="9" width="3" height="3" rx="0.6" fill="#FAF9F2" />
        <rect x="10" y="14" width="3" height="3" rx="0.6" fill="#FAF9F2" />
        <rect x="15" y="14" width="3" height="3" rx="0.6" fill="#FAF9F2" />
      </svg>
      <span>Wowelse</span>
    </div>
  );
}

export default function AuthBrandPanel({
  quote = 'Seamless authentication experience! Signing in takes seconds with Google or my password, and everything stays secure and effortless.',
  author = 'Alex Mitchell',
  location = 'Product Designer',
}) {
  return (
    <div className="auth-visual-panel">
      <div className="testimonial-block">
        <span className="quote-mark quote-open" aria-hidden="true">“</span>
        <p className="testimonial-text">{quote}</p>
        <span className="quote-mark quote-close" aria-hidden="true">”</span>

        <div className="testimonial-author">
          <div className="author-avatar" aria-hidden="true">
            {author.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <div className="author-name">{author}</div>
            <div className="author-location">{location}</div>
          </div>
        </div>
      </div>

      {/* Minimalist geometric architectural line-art illustration */}
      <svg
        className="cityscape-svg"
        viewBox="0 0 420 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Soft pastel fills */}
        <polygon points="180,230 180,145 235,125 235,230" fill="#F5C9C6" />
        <polygon points="340,230 340,120 420,90 420,230" fill="#D8E8D8" />
        <polygon points="265,230 265,55 310,35 310,230" fill="#FAF9F2" />
        <polygon points="120,230 120,105 165,75 200,90 200,230" fill="#FAF9F2" />

        {/* Angled geometric buildings */}
        <path d="M18 230V165L60 148V230" stroke="#26434D" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M60 148L78 156V230" stroke="#26434D" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M90 230L125 98L170 76L205 94V230" stroke="#26434D" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M168 77L140 230" stroke="#26434D" strokeWidth="2" />

        {/* Blush building */}
        <path d="M180 230V145L235 125V230" stroke="#26434D" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M235 125L255 134V230" stroke="#26434D" strokeWidth="2.2" strokeLinejoin="round" />

        {/* Mid-ground building */}
        <path d="M220 130V95L275 72V230" stroke="#26434D" strokeWidth="2.2" strokeLinejoin="round" />

        {/* Tall tower */}
        <path d="M275 230V52L315 34L345 48V230" stroke="#26434D" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M315 34V230" stroke="#26434D" strokeWidth="2" />

        {/* Right building */}
        <path d="M345 122L395 98L420 110V230" stroke="#26434D" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M395 98V230" stroke="#26434D" strokeWidth="2" />

        {/* Dashed window lines */}
        <g stroke="#26434D" strokeWidth="1.8" strokeLinecap="round">
          <line x1="126" y1="114" x2="152" y2="103" />
          <line x1="122" y1="126" x2="148" y2="115" />
          <line x1="118" y1="138" x2="144" y2="127" />
          <line x1="114" y1="150" x2="140" y2="139" />
          <line x1="110" y1="162" x2="136" y2="151" />
          <line x1="106" y1="174" x2="132" y2="163" />

          <line x1="190" y1="154" x2="224" y2="141" />
          <line x1="190" y1="166" x2="224" y2="153" />
          <line x1="190" y1="178" x2="224" y2="165" />
          <line x1="190" y1="190" x2="224" y2="177" />

          <line x1="286" y1="60" x2="286" y2="68" />
          <line x1="296" y1="56" x2="296" y2="64" />
          <line x1="305" y1="52" x2="305" y2="60" />
          <line x1="286" y1="78" x2="286" y2="86" />
          <line x1="296" y1="74" x2="296" y2="82" />
          <line x1="305" y1="70" x2="305" y2="78" />
          <line x1="286" y1="96" x2="286" y2="104" />
          <line x1="296" y1="92" x2="296" y2="100" />
          <line x1="305" y1="88" x2="305" y2="96" />
          <line x1="286" y1="114" x2="286" y2="122" />
          <line x1="296" y1="110" x2="296" y2="118" />
          <line x1="305" y1="106" x2="305" y2="114" />
          <line x1="286" y1="132" x2="286" y2="140" />
          <line x1="296" y1="128" x2="296" y2="136" />
          <line x1="305" y1="124" x2="305" y2="132" />

          <line x1="356" y1="134" x2="384" y2="120" />
          <line x1="356" y1="146" x2="384" y2="132" />
          <line x1="356" y1="158" x2="384" y2="144" />
          <line x1="356" y1="170" x2="384" y2="156" />
        </g>

        {/* Minimalist trees */}
        <g>
          <path
            d="M84 220C74 220 68 212 72 203C69 197 73 188 84 188C95 188 99 197 96 203C100 212 94 220 84 220Z"
            fill="#FAF9F2"
            stroke="#26434D"
            strokeWidth="2"
          />
          <line x1="84" y1="204" x2="84" y2="230" stroke="#26434D" strokeWidth="2" />
          <line x1="84" y1="214" x2="90" y2="208" stroke="#26434D" strokeWidth="1.8" />

          <path
            d="M356 220C345 220 338 210 343 200C339 193 344 182 356 182C368 182 373 193 369 200C374 210 367 220 356 220Z"
            fill="#FAF9F2"
            stroke="#26434D"
            strokeWidth="2"
          />
          <line x1="356" y1="200" x2="356" y2="230" stroke="#26434D" strokeWidth="2" />
          <line x1="356" y1="212" x2="350" y2="206" stroke="#26434D" strokeWidth="1.8" />

          <path
            d="M394 222C386 222 381 215 385 208C382 203 386 196 394 196C402 196 406 203 403 208C407 215 402 222 394 222Z"
            fill="#FAF9F2"
            stroke="#26434D"
            strokeWidth="2"
          />
          <line x1="394" y1="208" x2="394" y2="230" stroke="#26434D" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}
