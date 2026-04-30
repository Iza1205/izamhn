import { RiMapPinLine, RiMacbookLine } from 'react-icons/ri';

export default function HeroSection() {
  return (
    <>
      <style>{`
        .hero-gradient {
          background:
            radial-gradient(ellipse 60% 55% at 50% 80%, #12096b 0%, transparent 65%),
            radial-gradient(ellipse 45% 55% at 100% 0%, #e0dcf8 0%, transparent 55%),
            radial-gradient(ellipse 45% 45% at 0% 100%, #cbc5f0 0%, transparent 50%),
            linear-gradient(155deg, #5c54ca 0%, #6460cc 20%, #3a30aa 50%, #130e52 100%);
        }
        @media (max-width: 768px) {
          .hero-gradient {
            background:
              radial-gradient(ellipse 100% 40% at 50% 100%, #0e0850 0%, transparent 70%),
              radial-gradient(ellipse 80% 50% at 110% 0%, #ddd9f5 0%, transparent 60%),
              radial-gradient(ellipse 70% 40% at -10% 110%, #ccc6f0 0%, transparent 55%),
              linear-gradient(170deg, #6058cc 0%, #5a54c8 15%, #3d33b0 45%, #160f56 100%);
          }
        }
      `}</style>
      <section
        className="hero-gradient rounded-3xl overflow-hidden px-6 py-8 md:px-10 md:py-12 relative"
      >
        {/* Noise overlay */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full"
          style={{ opacity: 0.50, mixBlendMode: 'soft-light' }}
        >
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>

        {/* Headline */}
        <h1 className="relative text-[26px] md:text-[60px] font-black leading-[1.1] tracking-tight text-white mb-2 md:mb-4">
          Hey 👋 I&apos;m Izamhn.
        </h1>

        {/* Sub-copy */}
        <p className="relative text-white/70 text-[14px] md:text-[30px] font-medium leading-relaxed max-w-[1050px] mb-5 md:mb-8">
          I discuss{' '}
          <span className="bg-white/20 text-white px-2 py-0.5 rounded-lg inline-block leading-tight font-semibold">
            design
          </span>{' '}
          on social media helping people create visuals that actually look good.
        </p>

        {/* Meta */}
        <div className="relative flex flex-col gap-1.5 md:flex-row md:items-center md:gap-5">
          <span className="flex items-center gap-1.5 text-white/40 text-[12px] md:text-[16px]">
            <RiMapPinLine size={20} /> Based in Jakarta, Indonesia
          </span>
          <span className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
          <span className="flex items-center gap-1.5 text-white/40 text-[12px] md:text-[16px]">
            <RiMacbookLine size={20} /> Open for Collab
          </span>
        </div>
      </section>
    </>
  );
}