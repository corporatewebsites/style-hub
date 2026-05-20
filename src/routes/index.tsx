import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { posts } from "@/data/posts";
import hero from "@/assets/hero.jpg";
import accessories from "@/assets/editorial-accessories.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LÜMERE — Концептуальная одежда" },
      { name: "description", content: "Современный магазин концептуальной одежды: новые коллекции, акции, журнал и личный кабинет." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.slice(0, 2);
  const featuredPost = posts.find((p) => p.featured)!;
  const sidePosts = posts.filter((p) => !p.featured).slice(0, 2);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative w-full h-[85vh] overflow-hidden bg-surface">
        <img src={hero} alt="Кампания LÜMERE" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent flex flex-col justify-end p-6 md:p-12">
          <div className="max-w-2xl animate-reveal text-background">
            <h1 className="text-5xl md:text-7xl font-800 tracking-tighter text-balance leading-[0.9] mb-6 uppercase">
              Форма и <br />
              <span className="font-serif italic capitalize tracking-normal lowercase">материя</span>
            </h1>
            <p className="text-base md:text-lg max-w-md mb-8 text-pretty">
              Исследование структурного минимализма в новой осенней капсуле. Ткани из лучших мануфактур Италии.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-4 bg-background text-foreground text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-background/90 transition-all"
            >
              Смотреть коллекцию
            </Link>
          </div>
        </div>
      </section>

      {/* Curated */}
      <section className="px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted">01 / Избранное</h2>
          <Link to="/shop" className="text-[11px] uppercase tracking-wider border-b border-foreground pb-0.5">
            Все новинки
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={100 * (i + 1)} />
          ))}

          <Link to="/shop" className="md:col-span-2 group relative overflow-hidden animate-reveal" style={{ animationDelay: "300ms" }}>
            <div className="aspect-[16/9] md:aspect-auto md:h-full bg-surface relative">
              <img src={accessories} alt="Аксессуары" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-black/15 p-8 flex flex-col justify-end">
                <p className="text-background text-xs font-mono uppercase tracking-widest mb-2">Аксессуары</p>
                <h3 className="text-background text-3xl font-800 uppercase tracking-tighter">Архитектура деталей</h3>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Promo banner */}
      <section className="px-6 py-12 border-t border-border">
        <Link to="/sale" className="flex flex-col md:flex-row items-baseline justify-between gap-4 group">
          <h2 className="text-4xl md:text-6xl font-800 uppercase tracking-tighter">
            Архивная распродажа <span className="font-serif italic lowercase tracking-normal">до −40%</span>
          </h2>
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted group-hover:text-foreground transition-colors">
            Смотреть →
          </span>
        </Link>
      </section>

      {/* Journal teaser */}
      <section className="px-6 py-24 bg-ink text-ink-foreground">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-800 uppercase tracking-tighter">Редакция</h2>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-ink-foreground/50">Volume 04 / 2024</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <article className="md:col-span-7">
              <img src={featuredPost.image} alt={featuredPost.title} loading="lazy" className="w-full aspect-[4/5] object-cover mb-8" />
              <p className="text-[10px] font-mono text-ink-foreground/40 mb-3 uppercase tracking-widest">{featuredPost.category}</p>
              <h3 className="text-3xl font-serif italic mb-4">{featuredPost.title}</h3>
              <p className="text-ink-foreground/60 max-w-lg mb-6 leading-relaxed">{featuredPost.excerpt}</p>
              <Link to="/journal" className="text-[11px] font-bold uppercase tracking-widest border-b border-ink-foreground/30 pb-1">
                Читать далее
              </Link>
            </article>
            <div className="md:col-span-5 flex flex-col gap-16">
              {sidePosts.map((p) => (
                <article key={p.id} className="group">
                  <img src={p.image} alt={p.title} loading="lazy" className="aspect-square object-cover mb-6 w-full" />
                  <p className="text-[10px] font-mono text-ink-foreground/40 mb-2 uppercase tracking-widest">{p.category}</p>
                  <h4 className="text-xl uppercase font-bold tracking-tight">{p.title}</h4>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
