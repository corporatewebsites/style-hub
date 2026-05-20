import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { products } from "@/data/products";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Личный кабинет — LÜMERE" },
      { name: "description", content: "Заказы, избранное и профиль клиента LÜMERE." },
    ],
  }),
  component: Account,
});

const tabs = ["Заказы", "Избранное", "Профиль"] as const;
type Tab = (typeof tabs)[number];

const orders = [
  { id: "LM-92841", date: "12.05.2024", status: "Доставлено", total: 74000 },
  { id: "LM-91022", date: "04.05.2024", status: "В пути", total: 21500 },
  { id: "LM-89110", date: "18.04.2024", status: "Доставлено", total: 38500 },
  { id: "LM-87024", date: "02.04.2024", status: "Возврат", total: 19500 },
];

const fmt = new Intl.NumberFormat("ru-RU");

function Account() {
  const [tab, setTab] = useState<Tab>("Заказы");
  const wishlist = products.slice(0, 3);

  return (
    <SiteLayout>
      <section className="px-6 pt-16 pb-12 border-b border-border">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted mb-4">Личный кабинет</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h1 className="text-5xl md:text-7xl font-800 uppercase tracking-tighter">
            Здравствуйте, <span className="font-serif italic lowercase tracking-normal">Алексей</span>
          </h1>
          <div className="text-right">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted mb-1">Статус</p>
            <p className="text-sm font-bold uppercase tracking-wide">Archive Member</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="flex gap-8 mb-12 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-4 text-[11px] font-bold uppercase tracking-widest transition-colors -mb-px border-b-2 ${
                tab === t ? "border-foreground text-foreground" : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Заказы" && (
          <div className="border border-border">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-mono uppercase text-muted border-b border-border">
                  <th className="px-6 py-4 font-normal">Номер</th>
                  <th className="px-6 py-4 font-normal">Дата</th>
                  <th className="px-6 py-4 font-normal">Статус</th>
                  <th className="px-6 py-4 font-normal text-right">Сумма</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-border/60 last:border-0 hover:bg-surface transition-colors">
                    <td className="px-6 py-5 font-mono">#{o.id}</td>
                    <td className="px-6 py-5 font-mono text-muted">{o.date}</td>
                    <td className={`px-6 py-5 ${o.status === "Доставлено" ? "text-accent" : o.status === "Возврат" ? "text-muted" : "text-foreground"}`}>
                      {o.status}
                    </td>
                    <td className="px-6 py-5 text-right font-mono">{fmt.format(o.total)} ₽</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "Избранное" && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {wishlist.map((p) => (
              <div key={p.id} className="group">
                <div className="aspect-[3/4] bg-surface mb-4 overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="text-[13px] font-medium uppercase">{p.name}</h3>
                    <p className="text-[11px] text-muted font-mono mt-1">{p.color}</p>
                  </div>
                  <span className="text-[13px] font-mono">{fmt.format(p.price)} ₽</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Профиль" && (
          <div className="max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "Имя", value: "Алексей" },
              { label: "Фамилия", value: "Волков" },
              { label: "Email", value: "alexey@lumere.studio" },
              { label: "Телефон", value: "+7 (999) 123-45-67" },
              { label: "Город", value: "Москва" },
              { label: "Размер", value: "M / 48" },
            ].map((f) => (
              <label key={f.label} className="flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted">{f.label}</span>
                <input
                  defaultValue={f.value}
                  className="bg-transparent border-b border-border pb-2 focus:outline-none focus:border-foreground text-[14px]"
                />
              </label>
            ))}
            <div className="md:col-span-2 pt-4">
              <button className="px-8 py-4 bg-foreground text-background text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-all">
                Сохранить изменения
              </button>
            </div>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
