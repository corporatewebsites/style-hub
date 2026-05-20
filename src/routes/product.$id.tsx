import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { products, type Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — LÜMERE` },
          { name: "description", content: loaderData.product.description ?? loaderData.product.name },
          { property: "og:title", content: `${loaderData.product.name} — LÜMERE` },
          { property: "og:description", content: loaderData.product.description ?? loaderData.product.name },
          { property: "og:image", content: loaderData.product.image },
          { property: "og:type", content: "product" },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="px-6 py-32 text-center">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted mb-4">404</p>
        <h1 className="text-4xl font-800 uppercase tracking-tighter mb-6">Товар не найден</h1>
        <Link to="/shop" className="text-[11px] font-mono uppercase tracking-widest border-b border-foreground">
          Вернуться в магазин
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="px-6 py-32 text-center text-sm text-muted">{error.message}</div>
    </SiteLayout>
  ),
  component: ProductPage,
});

const fmt = new Intl.NumberFormat("ru-RU");

function ProductPage() {
  const { product } = Route.useLoaderData();
  const gallery: string[] = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const sizes: string[] = product.sizes ?? ["XS", "S", "M", "L", "XL"];

  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [size, setSize] = useState<string | null>(sizes.length === 1 ? sizes[0] : null);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  const related: Product[] = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  const handleAdd = () => {
    if (!size) return;
    add(product, size, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <SiteLayout>
      <div className="px-6 pt-8 text-[10px] font-mono uppercase tracking-[0.25em] text-muted flex gap-2">
        <Link to="/" className="hover:text-foreground">Главная</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-foreground">Магазин</Link>
        <span>/</span>
        <span className="text-foreground">{product.category}</span>
      </div>

      <section className="px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,460px)] gap-10 lg:gap-16">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 md:w-20 overflow-x-auto md:overflow-visible">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`shrink-0 size-20 bg-surface overflow-hidden border transition-colors ${
                  activeImage === img ? "border-foreground" : "border-border hover:border-muted"
                }`}
              >
                <img src={img} alt={`${product.name} вид ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-surface aspect-[3/4] overflow-hidden">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover animate-reveal"
              key={activeImage}
            />
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start space-y-8">
          <div>
            {product.isNew && (
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-3">Новое поступление</p>
            )}
            {product.onSale && (
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] mb-3">Архивная распродажа</p>
            )}
            <h1 className="text-3xl md:text-4xl font-800 uppercase tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-[12px] font-mono text-muted mt-3 uppercase tracking-wider">{product.color}</p>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-2xl font-mono">{fmt.format(product.price)} ₽</span>
            {product.oldPrice && (
              <span className="text-sm font-mono text-muted line-through">{fmt.format(product.oldPrice)} ₽</span>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Размер</h2>
              <button className="text-[10px] font-mono uppercase tracking-widest text-muted hover:text-foreground border-b border-border">
                Таблица размеров
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-12 h-12 px-3 border text-[12px] font-mono transition-colors ${
                    size === s
                      ? "bg-foreground text-background border-foreground"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleAdd}
              disabled={!size}
              className="w-full bg-foreground text-background py-4 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground/90 disabled:bg-muted disabled:cursor-not-allowed transition-colors"
            >
              {added ? "Добавлено в корзину ✓" : size ? "Добавить в корзину" : "Выберите размер"}
            </button>
            <button className="w-full border border-border py-4 text-[11px] font-bold uppercase tracking-[0.25em] hover:border-foreground transition-colors">
              В избранное
            </button>
          </div>

          <div className="border-t border-border pt-8 space-y-6 text-[13px] leading-relaxed">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Описание</h3>
              <p className="text-foreground/80">{product.description}</p>
            </div>
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Состав и уход</h3>
              <p className="text-foreground/80">{product.composition}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[10px] font-mono uppercase tracking-widest text-muted pt-2">
              <div>
                <p className="text-foreground mb-1">Доставка</p>
                <p>Бесплатно от 25 000 ₽</p>
              </div>
              <div>
                <p className="text-foreground mb-1">Возврат</p>
                <p>14 дней без вопросов</p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="px-6 py-16 border-t border-border">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-2xl md:text-3xl font-800 uppercase tracking-tighter">
              Похожие <span className="font-serif italic lowercase tracking-normal">/ предметы</span>
            </h2>
            <Link to="/shop" className="text-[11px] font-mono uppercase tracking-widest border-b border-foreground">
              В каталог
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 60} />
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}