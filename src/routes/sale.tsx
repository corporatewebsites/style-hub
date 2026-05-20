import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import saleBanner from "@/assets/sale-banner.jpg";

export const Route = createFileRoute("/sale")({
  head: () => ({
    meta: [
      { title: "Акции — LÜMERE" },
      { name: "description", content: "Архивная распродажа LÜMERE: избранные предметы со скидкой до 40%." },
    ],
  }),
  component: Sale,
});

const promos = [
  { code: "ARCHIVE40", title: "Архив SS24", desc: "Скидка до 40% на капсулу прошлого сезона.", until: "До 31 мая" },
  { code: "FIRST10", title: "Первый заказ", desc: "10% при оформлении первого заказа в магазине.", until: "Постоянно" },
  { code: "FREESHIP", title: "Доставка в подарок", desc: "Бесплатная доставка от 25 000 ₽ по всей России.", until: "Постоянно" },
];

function Sale() {
  const onSale = products.filter((p) => p.onSale);

  return (
    <SiteLayout>
      {/* Banner */}
      <section className="relative w-full h-[70vh] overflow-hidden bg-surface">
        <img src={saleBanner} alt="Архивная распродажа" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6 md:p-12 text-background">
          <p className="text-xs font-mono uppercase tracking-[0.3em] mb-4">Архивная распродажа</p>
          <h1 className="text-6xl md:text-8xl font-800 uppercase tracking-tighter leading-[0.85]">
            До <span className="font-serif italic lowercase">−40%</span>
          </h1>
          <p className="mt-6 max-w-md text-sm md:text-base">
            Ограниченное количество предметов из предыдущих коллекций. Действует до 31 мая.
          </p>
        </div>
      </section>

      {/* Promo codes */}
      <section className="px-6 py-20 border-b border-border">
        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted mb-10">Активные предложения</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {promos.map((p) => (
            <div key={p.code} className="bg-background p-8 flex flex-col gap-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted">{p.until}</p>
              <h3 className="text-2xl font-800 uppercase tracking-tighter">{p.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-border">
                <span className="font-mono text-[13px]">{p.code}</span>
                <button className="text-[10px] font-bold uppercase tracking-widest border-b border-foreground pb-0.5">
                  Скопировать
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sale products */}
      <section className="px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-5xl font-800 uppercase tracking-tighter">
            В акции <span className="font-serif italic lowercase tracking-normal">сейчас</span>
          </h2>
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted">{onSale.length} предметов</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {onSale.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 80} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
