import { RiBrushLine, RiVideoLine, RiLayoutLine, RiPaletteLine } from 'react-icons/ri';

export const metadata = { title: 'Services | Client Portal' };

const services = [
  {
    icon: RiBrushLine,
    title: 'Graphic Design',
    description: 'Desain grafis untuk kebutuhan branding, sosial media, poster, banner, dan berbagai kebutuhan visual lainnya.',
    items: ['Social Media Post', 'Banner & Poster', 'Branding & Logo', 'Infografis'],
  },
  {
    icon: RiVideoLine,
    title: 'Content Creation',
    description: 'Pembuatan konten kreatif untuk platform sosial media seperti Instagram, TikTok, dan YouTube.',
    items: ['Konten Instagram', 'Konten TikTok', 'Thumbnail YouTube', 'Story & Reels'],
  },
  {
    icon: RiLayoutLine,
    title: 'UI/UX Design',
    description: 'Desain antarmuka aplikasi dan website yang modern, bersih, dan user-friendly.',
    items: ['Desain UI Mobile', 'Desain UI Website', 'Prototype & Wireframe', 'Design System'],
  },
  {
    icon: RiPaletteLine,
    title: 'Preset & Template',
    description: 'Produk digital berupa preset Lightroom dan template desain siap pakai.',
    items: ['Lightroom Preset', 'Canva Template', 'Figma Template', 'Photoshop Action'],
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-[28px] font-extrabold text-[#111] dark:text-white">Services</h1>
        <p className="text-[15px] text-black/50 dark:text-white/40 mt-1">
          Layanan profesional yang aku tawarkan
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(({ icon: Icon, title, description, items }) => (
          <div
            key={title}
            className="bg-white dark:bg-[#111] rounded-[20px] p-8 border border-black/5 dark:border-white/5"
          >
            <div className="w-12 h-12 rounded-[14px] bg-[#f0f2f5] dark:bg-white/10 flex items-center justify-center mb-5">
              <Icon size={22} className="text-[#2d3b55] dark:text-white/70" />
            </div>
            <h2 className="text-[18px] font-bold text-[#111] dark:text-white mb-2">{title}</h2>
            <p className="text-[14px] text-black/50 dark:text-white/40 leading-relaxed mb-5">
              {description}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 bg-[#f0f2f5] dark:bg-white/10 text-[#111] dark:text-white/70 rounded-full text-[12px] font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[#2d3b55] dark:bg-[#1a2538] rounded-[20px] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div>
          <h3 className="text-[18px] font-bold text-white mb-1">Tertarik untuk berkolaborasi?</h3>
          <p className="text-[14px] text-white/50">Hubungi aku melalui fitur Support untuk diskusi lebih lanjut.</p>
        </div>
        <a
          href="/client-portal/support"
          className="shrink-0 px-6 py-3 bg-white text-[#111] rounded-[14px] text-[14px] font-semibold hover:bg-white/90 transition-colors"
        >
          Chat Support
        </a>
      </div>

    </div>
  );
}