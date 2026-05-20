import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Редакция — LÜMERE" },
      { name: "description", content: "Эссе, интервью и гайды о моде, материалах и культуре от редакции LÜMERE." },
    ],
  }),
  component: Journal,
});

function Journal() {
  const [feature, ...rest] = posts;

  return (
    <SiteLayout>
      <section className="px-6 pt-16 pb-12 border-b border-border flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted mb-4">Журнал</p>
          <h1 className="text-5xl md:text-7xl font-800 uppercase tracking-tighter">
            Редакция <span className="font-serif italic lowercase tracking-normal">LÜMERE</span>
          </h1>
        </div>
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted">Volume 04 / 2024</p>
      </section>

      <section className="px-6 py-20">
        <article className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 group cursor-pointer">
          <div className="md:col-span-7">
            <img src={feature.image} alt={feature.title} loading="lazy" className="w-full aspect-[4/5] object-cover" />
          </div>
          <div className="md:col-span-5 flex flex-col justify-center">
            <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-4">
              {feature.category} · {feature.date}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-6 leading-tight">{feature.title}</h2>
            <p className="text-muted leading-relaxed mb-8">{feature.excerpt}</p>
            <span className="text-[11px] font-bold uppercase tracking-widest border-b border-foreground pb-1 self-start">
              Читать · {feature.readTime}
            </span>
          </div>
        </article>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border pt-16">
          {rest.map((p) => (
            <article key={p.id} className="group cursor-pointer">
              <img src={p.image} alt={p.title} loading="lazy" className="w-full aspect-[4/5] object-cover mb-6" />
              <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-3">
                {p.category} · {p.date}
              </p>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">{p.title}</h3>
              <p className="text-sm text-muted leading-relaxed mb-4">{p.excerpt}</p>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted">{p.readTime}</span>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
