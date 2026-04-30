interface PageHeadingProps {
  title: string;
  description?: string;
}

export default function PageHeading({ title, description }: PageHeadingProps) {
  return (
    <div className="mb-6">
      <h1
        className="text-[28px] font-bold tracking-tight mb-1"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h1>
      {description && (
        <p className="text-[15px]" style={{ color: 'var(--text-tertiary)' }}>
          {description}
        </p>
      )}
    </div>
  );
}
