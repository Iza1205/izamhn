import Image from 'next/image';

const COLORS = [
  { bg: '#635BFF22', text: '#635BFF' },
  { bg: '#007AFF22', text: '#007AFF' },
  { bg: '#34C75922', text: '#34C759' },
  { bg: '#FF375F22', text: '#FF375F' },
  { bg: '#FF950022', text: '#FF9500' },
  { bg: '#5AC8FA22', text: '#5AC8FA' },
];

interface AvatarProps {
  image?: string | null;
  name: string;
  size?: number;
}

export default function Avatar({ image, name, size = 36 }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const color = COLORS[name.charCodeAt(0) % COLORS.length];

  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full flex-shrink-0 flex items-center justify-center font-semibold"
      style={{
        width: size,
        height: size,
        background: color.bg,
        color: color.text,
        fontSize: size * 0.35,
      }}
    >
      {initials}
    </div>
  );
}
