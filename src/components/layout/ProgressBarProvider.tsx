'use client';

import NextTopLoader from 'nextjs-toploader';

export default function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextTopLoader
        color="#6366f1"
        height={3}
        showSpinner={false}
        shadow={false}
      />
      {children}
    </>
  );
}