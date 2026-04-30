import { RiExternalLinkLine } from 'react-icons/ri';
import certificates, { type CertificateProps } from '@/data/certificates';

function CertificateCard({ title, issuer, year, category, image, href }: CertificateProps) {
  return (
    <div className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg p-3">

      {/* Thumbnail — klik buka link eksternal */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full aspect-video bg-neutral-100 dark:bg-neutral-800 overflow-hidden rounded-xl"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
        />

        {/* Overlay icon saat hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
          <div className="h-9 w-9 rounded-full bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
            <RiExternalLinkLine size={14} className="text-neutral-600 dark:text-neutral-300" />
          </div>
        </div>
      </a>

      {/* Info */}
      <div className="px-1 pt-3 pb-1 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[14px] font-semibold leading-snug text-neutral-900 dark:text-neutral-100 truncate">
            {title}
          </h3>
          <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500">
            {issuer} · {year}
          </p>
        </div>

        {/* Category badge */}
        <span className="shrink-0 inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
          {category}
        </span>
      </div>
    </div>
  );
}

export default function CertificateSection() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {certificates.map((cert, i) => (
        <CertificateCard key={i} {...cert} />
      ))}
    </div>
  );
}