import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — izamhn',
  description: 'Privacy policy for izamhn.com',
};

const sections = [
  {
    title: 'Information I Collect',
    content:
      'This website does not collect personally identifiable information unless you voluntarily provide it (e.g., via the contact form or guestbook). Basic analytics data such as page views and referrer URLs may be collected anonymously to help improve the site.',
  },
  {
    title: 'How I Use Your Information',
    content:
      'Any information you provide is used solely to respond to your inquiries or improve the website experience. I do not sell, trade, or share your personal information with third parties.',
  },
  {
    title: 'Cookies',
    content:
      'This site may use cookies to remember your preferences (such as theme settings). These cookies are strictly functional and do not track you across other websites.',
  },
  {
    title: 'Third-Party Services',
    content:
      'This site may integrate third-party services such as GitHub and WakaTime APIs for displaying public statistics. These services have their own privacy policies which I encourage you to review.',
  },
  {
    title: 'Data Security',
    content:
      'I take reasonable measures to protect any data you provide. However, no method of transmission over the internet is 100% secure, and I cannot guarantee absolute security.',
  },
  {
    title: 'Changes to This Policy',
    content:
      'This privacy policy may be updated from time to time. Any changes will be reflected on this page with an updated date.',
  },
  {
    title: 'Contact',
    content:
      'If you have any questions about this privacy policy, feel free to reach out via the contact page.',
  },
];

export default function PrivacyPage() {
  return (
    <section className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
          Privacy Policy
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-base max-w-xl leading-relaxed">
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
          Here's how your data is handled on this site.
        </p>
      </div>

      {/* Main card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
          <span className="text-[12px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
            Legal
          </span>
        </div>

        {/* Content */}
        <div className="p-5 md:p-7 flex flex-col gap-6">
          {sections.map((s, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <h2 className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-100">
                {i + 1}. {s.title}
              </h2>
              <p className="text-[14px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {s.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer bar */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 px-5 py-4 bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-between">
          <p className="text-[13px] text-neutral-400 dark:text-neutral-500">
            © {new Date().getFullYear()} Iza Mahendra
          </p>
          <Link
            href="/terms"
            className="text-[13px] text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            Terms →
          </Link>
        </div>
      </div>

    </section>
  );
}