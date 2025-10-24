"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import clsx from "clsx";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/compare", label: "Comparateur" },
  { href: "/builders", label: "Configurateur" },
  { href: "/guides", label: "Guides" },
];

interface NavProps {
  compareCount?: number;
}

export function Nav({ compareCount = 0 }: NavProps) {
  const pathname = usePathname();

  const items = useMemo(
    () =>
      links.map((link) => {
        const isActive =
          pathname === link.href || pathname?.startsWith(`${link.href}/`);
        return { ...link, isActive };
      }),
    [pathname],
  );

  return (
    <nav className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-surface-800/80 px-6 py-4 shadow-lg shadow-black/20 backdrop-blur-xl">
      <Link href="/" className="text-lg font-semibold tracking-tight text-white">
        PC Builder
      </Link>
      <div className="hidden items-center gap-4 md:flex">
        {items.map(({ href, label, isActive }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "relative rounded-full px-3 py-1 text-sm font-medium transition-colors",
              isActive ? "text-white" : "text-neutral-300 hover:text-white",
            )}
          >
            {label}
            {href === "/compare" && compareCount > 0 && (
              <span className="absolute -right-3 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-500 px-1 text-[11px] font-semibold text-white">
                {compareCount}
              </span>
            )}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="rounded-full border border-white/10 px-3 py-1 text-sm font-semibold text-neutral-200 transition hover:border-white/30 hover:text-white"
        >
          Connexion
        </Link>
      </div>
    </nav>
  );
}
