import Link from 'next/link';

export const metadata = {
  title: 'Terms of Use — izamhn',
  description: 'Terms of use for izamhn.com',
};

const sections = [
  {
    title: 'Acceptance of Terms',
    content:
      'By accessing and using izamhn.com, you agree to be bound by these terms of use. If you do not agree with any part of these terms, please do not use this website.',
  },
  {
    title: 'Use of Content',
    content:
      'All content on this website — including text, code snippets, designs, and visuals — is the intellectual property of Iza Mahendra unless otherwise stated. You may not reproduce or redistribute content without prior written permission.',
  },
  {
    title: 'Guestbook & User Content',
    content:
      'By submitting a message to the guestbook, you grant permission to display it publicly on this site. You are responsible for the content you post. Messages that are offensive, spammy, or inappropriate may be removed at any time.',
  },
  {
    title: 'Third-Party Links',
    content:
      'This website may contain links to external sites. I am not responsible for the content, privacy practices, or accuracy of any third-party websites.',
  },
  {
    title: 'Disclaimer',
    content:
      'This website is provided "as is" without any warranties of any kind. I do not guarantee that the site will be error-free, uninterrupted, or free of harmful components.',
  },
  {
    title: 'Limitation of Liability',
    content:
      'To the fullest extent permitted by law, Iza Mahendra shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.',
  },
  {
    title: 'Changes to Terms',
    content:
      'These terms may be updated at any time. Continued use of the site after changes are posted constitutes your acceptance of the new terms.',
  },
  {
    title: 'Contact',
    content:
      'If you have any questions about these terms, please reach out through the contact page.',
  },
];

export default function TermsPage() {
  return (
    <section className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
          Terms of Use
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-base max-w-xl leading-relaxed">
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
          Please read these terms carefully before using this site.
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
            href="/privacy"
            className="text-[13px] text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            ← Privacy Policy
          </Link>
        </div>
      </div>

    </section>
  );
}