import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Магазин — LÜMERE" },
      { name: "description", content: "Каталог LÜMERE: верхняя одежда, трикотаж, рубашки, брюки и аксессуары." },
    ],
  }),
  component: Shop,
});

const categories = ["Все", "Верхняя одежда", "Трикотаж", "Рубашки", "Брюки", "Аксессуары"] as const;

function Shop() {
  const [active, setActive] = useState<(typeof categories)[number]>("Все");
  const list = active === "Все" ? products : products.filter((p) => p.category === active);

  return (
    <SiteLayout>
      <section className="px-6 pt-16 pb-12 border-b border-border">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted mb-4">Каталог</p>
        <h1 className="text-5xl md:text-7xl font-800 uppercase tracking-tighter">
          Осень <span className="font-serif italic lowercase tracking-normal">/ 2024</span>
        </h1>
      </section>

      <section className="px-6 py-12 flex flex-col md:flex-row gap-12">
        <aside className="w-full md:w-64 shrink-0">
          <div className="md:sticky md:top-28">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8">Фильтры</h2>
            <ul className="space-y-3 text-[13px] uppercase tracking-wide">
              {categories.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setActive(c)}
                    className={`w-full flex justify-between border-b border-border pb-2 transition-colors ${
                      active === c ? "text-foreground" : "text-muted hover:text-foreground"
                    }`}
                  >
                    <span>{c}</span>
                    <span className="text-[10px]">{c === "Все" ? products.length : products.filter((p) => p.category === c).length}</span>
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mt-12 mb-6">Размер</h3>
            <div className="flex flex-wrap gap-2">
              {["XS", "S", "M", "L", "XL"].map((s) => (
                <button key={s} className="size-10 border border-border text-[11px] font-mono hover:bg-foreground hover:text-background transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-end mb-8 text-[11px] font-mono uppercase tracking-widest text-muted">
            <span>{list.length} предметов</span>
            <span>Сортировать: новинки</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
