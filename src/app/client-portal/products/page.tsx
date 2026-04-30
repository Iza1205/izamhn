import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { RiShoppingBagLine } from 'react-icons/ri';

export const metadata = { title: 'Products | Client Portal' };

export default async function ProductsPage() {

  const products = await prisma.portalProduct.findMany({
    where: { is_active: true },
    orderBy: { sort_order: 'asc' },
  });

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[28px] font-extrabold text-[#111] dark:text-white">Products</h1>
        <p className="text-[15px] text-black/50 dark:text-white/40 mt-1">Browse my digital products and offerings</p>
      </div>

      {categories.map((cat) => (
        <section key={cat}>
          <h2 className="text-[16px] font-bold text-[#111] dark:text-white capitalize mb-4">{cat}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.filter((p) => p.category === cat).map((product) => (
              <div key={product.id} className="bg-white dark:bg-[#111] rounded-[20px] overflow-hidden border border-black/5 dark:border-white/5 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-[#f0f2f5] dark:bg-white/5 flex items-center justify-center">
                    <RiShoppingBagLine size={32} className="text-black/20 dark:text-white/20" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-[17px] font-bold text-[#111] dark:text-white mb-1">{product.name}</h3>
                  {product.description && (
                    <p className="text-[14px] text-black/50 dark:text-white/40 mb-4 line-clamp-2">{product.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-extrabold text-[#111] dark:text-white">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    <Link
                      href={`/client-portal/products/${product.id}/order`}
                      className="px-4 py-2 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded-[10px] text-[13px] font-semibold hover:opacity-90 transition-opacity"
                    >
                      Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {products.length === 0 && (
        <div className="text-center py-20 text-black/30 dark:text-white/20">
          <RiShoppingBagLine size={40} className="mx-auto mb-3" />
          <p>Belum ada produk tersedia</p>
        </div>
      )}
    </div>
  );
}