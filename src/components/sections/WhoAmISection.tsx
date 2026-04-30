import Link from 'next/link';
import Image from 'next/image';
import { RiArrowRightLine } from 'react-icons/ri';

export default function WhoAmISection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,855px)_340px] gap-4 items-stretch">

      {/* Left card — text */}
      <div className="order-2 md:order-1 rounded-3xl overflow-hidden bg-[#0f0f0f] px-6 py-8 md:px-10 md:py-12 flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-4">


          {/* Headline */}
          <h2 className="text-[26px] md:text-[42px] font-black leading-[1.1] tracking-tight text-white">
            Who am I?
          </h2>

          {/* Body copy */}
          <div className="flex flex-col gap-3 text-white/70 text-[14px] md:text-[18px] font-medium leading-relaxed max-w-xl">
            <p>
              I&apos;m Iza a Graphic Designer and Content Creator who loves turning ideas
              into visuals that actually speak. From brand identities to short-form video,
              I craft things that look good and feel right.
            </p>
            <p>
              Always creating, always learning.{' '}
              <span className="bg-[#1D4ED8]/20 text-[#1D4ED8] px-2 py-0.5 rounded-lg inline-block leading-tight font-semibold">
                Let&apos;s make something great.
              </span>
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/about"
          className="self-start flex items-center gap-2 text-white font-semibold text-[14px] border border-white/10 hover:border-white/30 rounded-full px-5 py-2.5 transition-colors duration-200 group"
        >
          Read more about me
          <RiArrowRightLine size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>

      {/* Right card — square photo */}
      <div className="order-1 md:order-2 rounded-3xl overflow-hidden bg-neutral-800 aspect-square">
        <Image
          src="/profill.png"
          alt="Iza Mahendra"
          width={600}
          height={600}
          className="w-full h-full object-cover object-center"
          priority
        />
      </div>

    </div>
  );
}