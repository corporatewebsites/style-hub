import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { to: "/shop", label: "Магазин" },
  { to: "/sale", label: "Акции" },
  { to: "/journal", label: "Редакция" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Promo Strip */}
      <div className="w-full bg-foreground text-background py-2 px-6 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase">
        <span>Бесплатная доставка от 25 000 ₽</span>
        <span className="hidden md:block">Архив: Коллекция SS24 уже доступна</span>
        <span>RU / RUB</span>
      </div>

      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex justify-between items-end">
        <div className="flex gap-8 items-end">
          <Link to="/" className="text-2xl font-800 tracking-tighter uppercase leading-none">
            LÜMERE
          </Link>
          <div className="hidden md:flex gap-6 text-[11px] font-medium uppercase tracking-wider mb-0.5">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`hover:text-muted transition-colors ${pathname === l.to ? "text-foreground" : "text-foreground/80"}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-6 text-[11px] font-medium uppercase tracking-wider mb-0.5">
          <Link to="/account" className="hover:text-muted transition-colors">
            Кабинет
          </Link>
          <button className="hover:text-muted transition-colors">Корзина ({count})</button>
        </div>
      </nav>

      <main>{children}</main>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border bg-background mt-24">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <p className="text-2xl font-800 tracking-tighter uppercase mb-4">LÜMERE</p>
            <p className="text-[11px] text-muted leading-relaxed uppercase tracking-wider">
              Концептуальная одежда для городского минималиста.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-[10px] font-mono uppercase tracking-widest">
            <div>
              <p className="text-foreground mb-4 font-bold">Клиенты</p>
              <ul className="space-y-2 text-muted">
                <li><a href="#" className="hover:text-foreground">Доставка</a></li>
                <li><a href="#" className="hover:text-foreground">Возврат</a></li>
                <li><a href="#" className="hover:text-foreground">Контакты</a></li>
              </ul>
            </div>
            <div>
              <p className="text-foreground mb-4 font-bold">Социальные сети</p>
              <ul className="space-y-2 text-muted">
                <li><a href="#" className="hover:text-foreground">Telegram</a></li>
                <li><a href="#" className="hover:text-foreground">Pinterest</a></li>
                <li><a href="#" className="hover:text-foreground">Instagram</a></li>
              </ul>
            </div>
            <div className="hidden md:block">
              <p className="text-foreground mb-4 font-bold">Подписка</p>
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border-b border-border pb-2 focus:outline-none focus:border-foreground w-full text-foreground placeholder:text-muted"
              />
            </div>
          </div>
        </div>
        <div className="mt-16 text-[9px] font-mono text-muted flex justify-between uppercase tracking-[0.2em]">
          <span>© 2024 LÜMERE STUDIO</span>
          <span>MADE IN RUSSIA</span>
        </div>
      </footer>
    </div>
  );
}
