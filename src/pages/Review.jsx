import { useState, useEffect } from 'react';

// Pull in every generated image (candidates + raw generation/reference folders).
// Vite resolves these at build time, so new files appear after a dev-server refresh.
const modules = {
  ...import.meta.glob('../../public/assets/candidates/**/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' }),
  ...import.meta.glob('../../imageGeneration/**/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' }),
};

// Group images by their parent folder (relative to the repo root).
const groups = Object.entries(modules).reduce((acc, [path, url]) => {
  const repoPath = path.replace(/^(\.\.\/)+/, ''); // e.g. public/assets/candidates/home_hero/x.png
  const rel = repoPath.replace(/^public\//, '');
  const parts = rel.split('/');
  const name = parts.pop();
  const folder = parts.join('/');
  (acc[folder] ||= []).push({ name, url, folder, repoPath });
  return acc;
}, {});

const folders = Object.keys(groups).sort();
const all = folders.flatMap((f) => groups[f].sort((a, b) => a.name.localeCompare(b.name)));

export default function Review() {
  const [filter, setFilter] = useState('all');
  const [index, setIndex] = useState(null);
  const [copied, setCopied] = useState(null);

  const copyPath = (e, img) => {
    e.stopPropagation();
    navigator.clipboard.writeText(img.repoPath);
    setCopied(img.repoPath);
    setTimeout(() => setCopied(null), 1500);
  };

  const CopyBtn = ({ img }) => (
    <span
      role="button"
      onClick={(e) => copyPath(e, img)}
      title={img.repoPath}
      className="shrink-0 px-2 py-0.5 text-[10px] font-mono rounded border border-[#c69f69]/50 text-[#c69f69] hover:bg-[#c69f69] hover:text-[#161412] cursor-pointer"
    >
      {copied === img.repoPath ? '✓ copied' : 'copy path'}
    </span>
  );

  const visible = filter === 'all' ? all : groups[filter];
  const current = index !== null ? visible[index] : null;

  // Keyboard navigation in the lightbox.
  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setIndex(null);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % visible.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + visible.length) % visible.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, visible.length]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-24 text-[#e6dfcc]">
      <h1 className="text-3xl font-['Oswald'] uppercase tracking-widest text-[#c69f69] mb-2">Image Review</h1>
      <p className="text-sm opacity-70 mb-6">{all.length} images across {folders.length} folders</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {['all', ...folders].map((f) => (
          <button
            key={f}
            id={`review-filter-${f.replace(/\W+/g, '-')}`}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${
              filter === f ? 'bg-[#c69f69] text-[#161412] border-[#c69f69]' : 'border-[#c69f69]/40 hover:border-[#c69f69]'
            }`}
          >
            {f} {f !== 'all' && `(${groups[f].length})`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {visible.map((img, i) => (
          <button
            key={img.url}
            onClick={() => setIndex(i)}
            className="group text-left bg-black/40 border border-[#c69f69]/20 hover:border-[#c69f69] rounded-lg overflow-hidden transition-colors"
          >
            <img src={img.url} alt={img.name} loading="lazy" className="w-full aspect-square object-cover group-hover:scale-105 transition-transform" />
            <div className="p-2 flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-mono truncate">{img.name}</p>
                <p className="text-[10px] font-mono opacity-50 truncate">{img.folder}</p>
              </div>
              <CopyBtn img={img} />
            </div>
          </button>
        ))}
      </div>

      {current && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4" onClick={() => setIndex(null)}>
          <img src={current.url} alt={current.name} className="max-h-[85vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
          <p className="mt-3 text-sm font-mono text-[#c69f69] flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {current.repoPath} · {index + 1}/{visible.length}
            <CopyBtn img={current} />
          </p>
          <p className="text-xs opacity-50">← → to navigate · Esc to close</p>
        </div>
      )}
    </section>
  );
}
