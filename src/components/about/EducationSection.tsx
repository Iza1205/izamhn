import { RiMapPinLine } from 'react-icons/ri';
import educations, { type EducationProps } from '@/data/education';

function EducationCard({ degree, major, school, location, startYear, endYear, logo }: EducationProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg overflow-hidden">

      {/* Header */}
      <div className="flex items-start gap-3.5 px-4 py-4 sm:px-5">

        {/* Logo sekolah */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          {logo ? (
            <img
              src={logo}
              alt={school}
              className="h-9 w-9 object-contain"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-400"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[13px] font-semibold leading-snug text-neutral-900 dark:text-neutral-50 truncate">
                {school}
              </p>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                {degree}
              </p>
            </div>

            {/* Tahun badge */}
            <span className="shrink-0 inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
              {startYear} – {endYear}
            </span>
          </div>

          {/* Lokasi */}
          <div className="flex items-center gap-1 mt-1.5 text-[11px] text-neutral-400 dark:text-neutral-500">
            <RiMapPinLine size={10} />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px mx-4 sm:mx-5 bg-neutral-100 dark:bg-neutral-800" />

      {/* Jurusan */}
      <div className="px-4 sm:px-5 py-3 flex items-center justify-between gap-2">
        <p className="text-[12px] text-neutral-500 dark:text-neutral-400">
          Major
        </p>
        <p className="text-[12px] font-medium text-neutral-700 dark:text-neutral-300 text-right">
          {major}
        </p>
      </div>

    </div>
  );
}

export default function EducationSection() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {educations.map((edu, i) => (
        <EducationCard key={i} {...edu} />
      ))}
    </div>
  );
}