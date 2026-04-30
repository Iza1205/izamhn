import Link from 'next/link';
import { RiUserLine, RiArrowLeftLine, RiBriefcaseLine, RiShoppingBagLine, RiCustomerService2Line } from 'react-icons/ri';

export default function ClientPortalPage() {
  return (
    <div className="space-y-4">

      {/* Hero Section */}
      <section className="bg-[#2d3b55] dark:bg-[#1a2538] rounded-[24px] px-8 sm:px-12 py-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
          Welcome to Client Portal
        </h1>
        <p className="text-xl sm:text-2xl font-medium text-white/80 max-w-2xl leading-relaxed mb-10">
          Explore my{' '}
          <span className="bg-orange-400 text-black px-2.5 py-0.5 rounded-lg font-bold">
            services and products
          </span>
          , manage your orders, and access support all in one place.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/client-portal/login"
            className="flex items-center gap-2 px-6 py-3 bg-white text-[#111] rounded-[14px] text-[15px] font-semibold hover:bg-white/90 transition-colors"
          >
            <RiUserLine size={17} />
            Login to Portal
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-[14px] text-[15px] font-semibold hover:bg-white/20 transition-colors"
          >
            <RiArrowLeftLine size={17} />
            Back to Personal Space
          </Link>
        </div>
      </section>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Link
          href="/client-portal/services"
          className="group bg-white dark:bg-[#111111] rounded-[20px] p-8 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="w-12 h-12 rounded-[14px] bg-[#f0f2f5] dark:bg-white/10 flex items-center justify-center mb-5 group-hover:bg-orange-50 dark:group-hover:bg-orange-400/10 transition-colors">
            <RiBriefcaseLine size={22} className="text-[#2d3b55] dark:text-white/70 group-hover:text-orange-500 transition-colors" />
          </div>
          <h2 className="text-[20px] font-bold text-[#111] dark:text-white mb-2">Services</h2>
          <p className="text-[15px] text-black/50 dark:text-white/40 leading-relaxed">
            Explore my professional services &amp; solutions
          </p>
        </Link>

        <Link
          href="/client-portal/products"
          className="group bg-white dark:bg-[#111111] rounded-[20px] p-8 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="w-12 h-12 rounded-[14px] bg-[#f0f2f5] dark:bg-white/10 flex items-center justify-center mb-5 group-hover:bg-orange-50 dark:group-hover:bg-orange-400/10 transition-colors">
            <RiShoppingBagLine size={22} className="text-[#2d3b55] dark:text-white/70 group-hover:text-orange-500 transition-colors" />
          </div>
          <h2 className="text-[20px] font-bold text-[#111] dark:text-white mb-2">Products</h2>
          <p className="text-[15px] text-black/50 dark:text-white/40 leading-relaxed">
            Browse my digital products and offerings
          </p>
        </Link>

        <Link
          href="/client-portal/support"
          className="group bg-white dark:bg-[#111111] rounded-[20px] p-8 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="w-12 h-12 rounded-[14px] bg-[#f0f2f5] dark:bg-white/10 flex items-center justify-center mb-5 group-hover:bg-orange-50 dark:group-hover:bg-orange-400/10 transition-colors">
            <RiCustomerService2Line size={22} className="text-[#2d3b55] dark:text-white/70 group-hover:text-orange-500 transition-colors" />
          </div>
          <h2 className="text-[20px] font-bold text-[#111] dark:text-white mb-2">Support</h2>
          <p className="text-[15px] text-black/50 dark:text-white/40 leading-relaxed">
            Get help and access the knowledge base
          </p>
        </Link>

      </div>
    </div>
  );
}