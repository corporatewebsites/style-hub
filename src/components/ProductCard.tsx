import type { Product } from "@/data/products";

const fmt = new Intl.NumberFormat("ru-RU");

export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  return (
    <div className="group cursor-pointer animate-reveal" style={{ animationDelay: `${delay}ms` }}>
      <div className="aspect-[3/4] bg-surface overflow-hidden mb-4 relative">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-background px-2 py-1 text-[9px] font-bold uppercase tracking-widest">
            New
          </div>
        )}
        {product.onSale && (
          <div className="absolute top-3 left-3 bg-foreground text-background px-2 py-1 text-[9px] font-bold uppercase tracking-widest">
            Sale
          </div>
        )}
      </div>
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="text-[13px] font-medium uppercase leading-tight">{product.name}</h3>
          <p className="text-[11px] text-muted font-mono mt-1">{product.color}</p>
        </div>
        <div className="text-right shrink-0">
          {product.oldPrice && (
            <p className="text-[11px] font-mono text-muted line-through">{fmt.format(product.oldPrice)} ₽</p>
          )}
          <span className="text-[13px] font-mono whitespace-nowrap">{fmt.format(product.price)} ₽</span>
        </div>
      </div>
    </div>
  );
}
