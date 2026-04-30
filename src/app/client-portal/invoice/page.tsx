import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Invoice | Client Portal' };

const statusColor: Record<string, string> = {
  unpaid: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-400/10 dark:text-yellow-400',
  paid:   'bg-green-100 text-green-700 dark:bg-green-400/10 dark:text-green-400',
};

export default async function InvoicePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/client-portal/login');

  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (!user) redirect('/client-portal/login');

  const invoices = await prisma.invoice.findMany({
    where: { order: { user_id: user.id } },
    include: { order: { include: { product: true } } },
    orderBy: { created_at: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-extrabold text-[#111] dark:text-white">Invoice</h1>
        <p className="text-[15px] text-black/50 dark:text-white/40 mt-1">Riwayat invoice pesanan kamu</p>
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-20 text-black/30 dark:text-white/20">
          <p>Belum ada invoice</p>
        </div>
      ) : (
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="bg-white dark:bg-[#111] rounded-[20px] p-6 border border-black/5 dark:border-white/5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-[16px] font-bold text-[#111] dark:text-white truncate">
                    {invoice.order.product.name}
                  </p>
                  <p className="text-[13px] text-black/40 dark:text-white/30 mt-0.5">
                    #{invoice.id.slice(0, 8).toUpperCase()} · {new Date(invoice.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-[15px] font-bold text-[#111] dark:text-white">
                    Rp {invoice.amount.toLocaleString('id-ID')}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[12px] font-semibold capitalize ${statusColor[invoice.status] ?? ''}`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}