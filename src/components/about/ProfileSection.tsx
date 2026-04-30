export default function ProfileSection() {
  return (
    <div className="mb-8">
      {/* Page header */}
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
        About
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-base max-w-xl leading-relaxed">
        A brief introduction about myself and my professional background.
      </p>

      {/* Profile card */}
      <section className="mt-8 rounded-3xl overflow-hidden bg-[#0f0f0f] px-6 py-8 md:px-10 md:py-12">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-3 md:mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39d353] animate-pulse shrink-0" />
          <span className="text-[10px] md:text-[12px] font-semibold tracking-widest uppercase text-white/40">
            Graphic Designer & Content Creator
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-[26px] md:text-[52px] font-black leading-[1.1] tracking-tight text-white mb-2 md:mb-4">
          I&apos;m Iza Mahendra.
        </h2>

        {/* Bio */}
        <p className="text-white/70 text-[14px] md:text-[20px] font-medium leading-relaxed max-w-xl mb-5 md:mb-8">
          A{' '}
          <span className="bg-[#39d353]/20 text-[#39d353] px-2 py-0.5 rounded-lg inline-block leading-tight font-semibold">
            graphic designer
          </span>{' '}
          creating strong visuals for branding, social media, and digital marketing campaigns.
          Always eager to grow and explore fresh ideas, I look forward to collaborating and
          creating impactful work together.
        </p>

        {/* Sign off */}
        <p className="text-white/30 text-[13px] md:text-[15px] font-medium">
          Best Regards, Iza Mahendra
        </p>
      </section>
    </div>
  );
}