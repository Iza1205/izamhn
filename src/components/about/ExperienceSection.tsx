import { MapPin, Calendar, Building2 } from 'lucide-react';
import { experiences, type Experience, type Position } from '@/data/experience';

// ─── helpers ────────────────────────────────────────────────

const isPresent = (endDate: string) => endDate === 'Present';

// ─── Badge atoms ─────────────────────────────────────────────

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-neutral-200 dark:border-neutral-700/60 px-1.5 py-0.5 text-[11px] font-normal text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
      {children}
    </span>
  );
}

function PresentBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[5px] border border-emerald-200 dark:border-emerald-800/60 px-1.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      Present
    </span>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-700/60 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-0.5 text-[11px] font-normal text-neutral-400 dark:text-neutral-500 whitespace-nowrap shrink-0 mt-0.5">
      {count} positions
    </span>
  );
}

// ─── PositionRow ─────────────────────────────────────────────

function PositionRow({
  position,
  isLast,
}: {
  position: Position;
  isLast: boolean;
}) {
  const present = isPresent(position.endDate);

  return (
    <div className="relative flex gap-3">
      {/* Timeline */}
      <div className="flex flex-col items-center shrink-0 pt-[3px] w-[10px]">
        <div
          className={`w-[7px] h-[7px] rounded-full shrink-0 ${
            present
              ? 'bg-emerald-500 shadow-[0_0_0_2.5px_rgba(16,185,129,0.15)]'
              : 'bg-transparent border-[1.5px] border-neutral-300 dark:border-neutral-600'
          }`}
        />
        {!isLast && (
          <div className="w-px flex-1 bg-neutral-200 dark:bg-neutral-700/50 mt-1 min-h-4" />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 flex flex-col gap-1.5 ${!isLast ? 'pb-4' : ''}`}>
        {/* Role + badges */}
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <p className="text-[13px] font-medium text-neutral-800 dark:text-neutral-100 leading-snug">
            {position.role}
          </p>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {present ? <PresentBadge /> : <Badge>{position.endDate}</Badge>}
            <Badge>{position.employmentType}</Badge>
            <Badge>{position.locationType}</Badge>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 dark:text-neutral-500">
          <Calendar size={11} strokeWidth={1.75} className="shrink-0" />
          <span>
            {position.startDate} – {position.endDate}
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600 shrink-0" />
          <span>{position.duration}</span>
        </div>
      </div>
    </div>
  );
}

// ─── ExperienceCard ──────────────────────────────────────────

function ExperienceCard({ exp }: { exp: Experience }) {
  const multi = exp.positions.length > 1;

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3.5 px-[18px] pt-4 pb-3.5">
        {/* Logo */}
        <div className="w-[42px] h-[42px] rounded-[10px] border border-neutral-200 dark:border-neutral-700/60 bg-neutral-50 dark:bg-neutral-800 overflow-hidden shrink-0 flex items-center justify-center">
          <img
            src={exp.logo}
            alt={`${exp.company} logo`}
            className="w-full h-full object-contain"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.style.display = 'none';
              const fallback = img.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          {/* Fallback icon */}
          <span className="hidden items-center justify-center w-full h-full">
            <Building2 size={16} strokeWidth={1.5} className="text-neutral-400" />
          </span>
        </div>

        {/* Company info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[14px] font-medium text-neutral-900 dark:text-neutral-50 leading-snug truncate">
                {exp.company}
              </p>
              <p className="text-[12px] text-neutral-500 dark:text-neutral-400 truncate">
                {exp.companyFull}
              </p>
            </div>
            {multi && <CountBadge count={exp.positions.length} />}
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 mt-1 text-[11px] text-neutral-400 dark:text-neutral-500">
            <MapPin size={10} strokeWidth={2} className="shrink-0" />
            <span>{exp.location}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px mx-[18px] bg-neutral-100 dark:bg-neutral-800" />

      {/* Positions */}
      <div className="px-[18px] pt-3.5 pb-4 flex flex-col">
        {exp.positions.map((pos, i) => (
          <PositionRow
            key={i}
            position={pos}
            isLast={i === exp.positions.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────

export default function ExperienceSection() {
  return (
    <section className="flex flex-col gap-2.5">
      {experiences.map((exp, i) => (
        <ExperienceCard key={i} exp={exp} />
      ))}
    </section>
  );
}