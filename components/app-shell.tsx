"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { navigationItems } from "@/lib/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeItem =
    navigationItems.find((item) => item.href === pathname) ?? navigationItems[0];

  return (
    <div className="min-h-screen bg-champagne/50 text-ink transition-colors dark:bg-[#090B10] dark:text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-black/10 bg-white/80 px-5 py-6 shadow-executive-card backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] lg:flex lg:flex-col">
          <SidebarContent pathname={pathname} />
        </aside>

        {isMenuOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              aria-label="Close navigation menu"
              className="absolute inset-0 bg-ink/50"
              onClick={() => setIsMenuOpen(false)}
              type="button"
            />
            <aside className="relative z-50 flex h-full w-80 max-w-[86vw] flex-col border-r border-black/10 bg-white px-5 py-6 shadow-2xl dark:border-white/10 dark:bg-[#11141B]">
              <SidebarContent
                onNavigate={() => setIsMenuOpen(false)}
                pathname={pathname}
              />
            </aside>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-black/10 bg-champagne/80 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#090B10]/80 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  aria-label="Open navigation menu"
                  className="rounded-2xl border border-black/10 bg-white/80 p-3 text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-soft-gold/60 dark:border-white/10 dark:bg-white/[0.06] dark:text-white lg:hidden"
                  onClick={() => setIsMenuOpen(true)}
                  type="button"
                >
                  <span className="block h-0.5 w-5 bg-current" />
                  <span className="mt-1.5 block h-0.5 w-5 bg-current" />
                  <span className="mt-1.5 block h-0.5 w-5 bg-current" />
                </button>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-soft-gold">
                    Decision DNA
                  </p>
                  <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                    {activeItem.label}
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-graphite shadow-sm dark:border-white/10 dark:bg-white/[0.05] dark:text-white/70 sm:block">
                  Private workspace
                </div>
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

type SidebarContentProps = {
  onNavigate?: () => void;
  pathname: string;
};

function SidebarContent({ onNavigate, pathname }: SidebarContentProps) {
  return (
    <>
      <Link
        className="group flex items-center gap-3 rounded-3xl p-2"
        href="/"
        onClick={onNavigate}
      >
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-lg font-bold text-white shadow-lg shadow-ink/20 dark:bg-soft-gold dark:text-ink">
          D
        </div>
        <div>
          <p className="text-base font-semibold tracking-tight">Decision DNA</p>
          <p className="text-xs text-graphite/70 dark:text-white/55">
            Leadership intelligence
          </p>
        </div>
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-ink text-white shadow-lg shadow-ink/15 dark:bg-white dark:text-ink"
                  : "text-graphite hover:bg-ink/5 hover:text-ink dark:text-white/70 dark:hover:bg-white/[0.06] dark:hover:text-white"
              }`}
              href={item.href}
              key={item.href}
              onClick={onNavigate}
            >
              <span
                aria-hidden="true"
                className={`grid h-8 w-8 place-items-center rounded-xl border text-base ${
                  isActive
                    ? "border-white/20 bg-white/15 dark:border-ink/10 dark:bg-ink/10"
                    : "border-black/10 bg-white/70 dark:border-white/10 dark:bg-white/[0.04]"
                }`}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-3xl border border-soft-gold/30 bg-soft-gold/10 p-4 dark:border-soft-gold/20 dark:bg-soft-gold/10">
        <p className="text-sm font-semibold">Executive ready</p>
        <p className="mt-2 text-sm leading-6 text-graphite/70 dark:text-white/60">
          Prepare leader-approved insights before anything reaches the team.
        </p>
      </div>
    </>
  );
}
