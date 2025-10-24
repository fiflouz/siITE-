export default function HomePage() {
  return (
    <section className="flex flex-col gap-12 py-12">
      <header className="max-w-3xl space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-300">
          Bientôt disponible
        </span>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">
          Construisez un PC qui vous ressemble
        </h1>
        <p className="text-lg text-neutral-300">
          Nous préparons une nouvelle expérience Next.js pour comparer les composants, générer des
          configurations et suivre les prix en temps réel. Revenez très vite pour découvrir la suite.
        </p>
      </header>
      <div className="grid gap-6 rounded-2xl border border-white/10 bg-surface-800/60 p-8 text-sm text-neutral-300 md:grid-cols-2">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">Ce qui arrive dans la v2</h2>
          <ul className="space-y-2 text-neutral-300">
            <li>• Comparateur pro avec barres d'analyse multi-composants</li>
            <li>• Recommandations intelligentes selon votre budget</li>
            <li>• Compte utilisateur synchronisé pour vos builds</li>
          </ul>
        </div>
        <div className="space-y-4 rounded-xl border border-white/10 bg-surface-700/60 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-400">Roadmap</h3>
          <div className="space-y-3 text-neutral-300">
            <div className="flex items-center justify-between text-sm">
              <span>Migration Next.js</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">En cours</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Comparateur &amp; Dashboard</span>
              <span className="rounded-full bg-slate-500/10 px-2 py-0.5 text-xs text-slate-300">À venir</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
