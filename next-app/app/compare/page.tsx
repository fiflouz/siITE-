import Link from "next/link";
import clsx from "clsx";

export default function ComparePage({
  searchParams,
}: {
  searchParams: { compare?: string };
}) {
  const compareIds = searchParams?.compare?.split(",").filter(Boolean) ?? [];
  const hasSelection = compareIds.length >= 2;

  return (
    <section className="flex flex-col gap-10 py-12">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold text-white md:text-5xl">Comparateur</h1>
        <p className="max-w-2xl text-lg text-neutral-300">
          Ajoute au moins deux composants depuis la liste pour découvrir l&apos;analyse détaillée (heatmaps,
          specs par catégorie et lien partageable). La nouvelle expérience arrive très bientôt.
        </p>
      </header>

      {hasSelection ? (
        <div className="rounded-2xl border border-white/10 bg-surface-800/70 p-8 text-neutral-300">
          <p>
            Comparaison active pour&nbsp;
            <span className="font-semibold text-white">{compareIds.join(", ")}</span>. Les tableaux et la barre de
            comparaison seront intégrés dans la prochaine itération.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-dashed border-white/15 bg-surface-800/60 p-12 text-center text-neutral-300">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-neutral-400">
            Comparateur Pro
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">Aucune sélection pour le moment</h2>
            <p className="max-w-md text-sm text-neutral-300">
              Clique sur «&nbsp;Comparer&nbsp;» depuis une carte produit pour ajouter des composants. La barre de
              comparaison apparaîtra automatiquement dès 2 éléments sélectionnés.
            </p>
          </div>
          <Link
            href="/"
            className={clsx(
              "rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition",
              "hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300",
            )}
          >
            Explorer les composants
          </Link>
        </div>
      )}
    </section>
  );
}
