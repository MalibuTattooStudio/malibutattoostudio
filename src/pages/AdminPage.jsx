import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ARTISTS,
  STYLES,
  onAuth,
  signIn,
  signOut,
  uploadPiece,
  listAllPieces,
  updatePiece,
  deletePiece,
} from '../lib/adminGallery';
import { Upload, X, Star, Eye, EyeOff, Trash2, LogOut, Loader2, ImagePlus } from 'lucide-react';

/* ------------------------------------------------------------------ login -- */

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      await signIn(email.trim(), password);
    } catch (e2) {
      setErr(e2.message || 'No se pudo entrar');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#070709]">
      <form onSubmit={submit} className="w-full max-w-sm glass-panel rounded-3xl border border-white/10 p-8 space-y-5">
        <div className="space-y-1 text-center">
          <h1 className="text-xl font-black uppercase text-white font-heading tracking-wide">
            Panel · <span className="text-orange-gradient font-serif-title italic font-normal">Galería</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono">Malibu Tattoo Studio</p>
        </div>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          autoComplete="username"
          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#ff5500] focus:outline-none"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="contraseña"
          autoComplete="current-password"
          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#ff5500] focus:outline-none"
        />

        {err && <p className="text-xs text-red-400 font-mono">{err}</p>}

        <button
          type="submit"
          disabled={busy}
          className="w-full py-3 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-widest hover:bg-[#ff7700] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {busy && <Loader2 className="w-4 h-4 animate-spin" />}
          Entrar
        </button>
      </form>
    </div>
  );
}

/* ---------------------------------------------------------------- uploader -- */

function Uploader({ onDone }) {
  const [artistSlug, setArtistSlug] = useState(ARTISTS[0].slug);
  const [style, setStyle] = useState('');
  const [status, setStatus] = useState('published');
  const [items, setItems] = useState([]); // { file, url, title }
  const [progress, setProgress] = useState(null); // { done, total, error }
  const inputRef = useRef(null);

  const artist = useMemo(() => ARTISTS.find((a) => a.slug === artistSlug), [artistSlug]);

  useEffect(() => () => items.forEach((it) => URL.revokeObjectURL(it.url)), [items]);

  const addFiles = (fileList) => {
    const next = Array.from(fileList)
      .filter((f) => f.type.startsWith('image/'))
      .map((f) => ({ file: f, url: URL.createObjectURL(f), title: '' }));
    setItems((prev) => [...prev, ...next]);
  };

  const removeAt = (i) => {
    setItems((prev) => {
      URL.revokeObjectURL(prev[i].url);
      return prev.filter((_, idx) => idx !== i);
    });
  };

  const run = async () => {
    setProgress({ done: 0, total: items.length, error: '' });
    let done = 0;
    for (const it of items) {
      try {
        await uploadPiece({
          file: it.file,
          artistName: artist.name,
          artistSlug: artist.slug,
          style,
          title: it.title,
          status,
        });
        done += 1;
        setProgress({ done, total: items.length, error: '' });
      } catch (e) {
        setProgress({ done, total: items.length, error: e.message || 'Error subiendo' });
        break;
      }
    }
    items.forEach((it) => URL.revokeObjectURL(it.url));
    setItems([]);
    setProgress(null);
    onDone();
  };

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-5 sm:p-6 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="block text-xs">
          <span className="text-slate-400 uppercase tracking-wider font-mono">Artista</span>
          <select
            value={artistSlug}
            onChange={(e) => setArtistSlug(e.target.value)}
            className="mt-1 w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#ff5500] focus:outline-none"
          >
            {ARTISTS.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-xs">
          <span className="text-slate-400 uppercase tracking-wider font-mono">Estilo</span>
          <input
            list="admin-styles"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            placeholder="Blackwork…"
            className="mt-1 w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#ff5500] focus:outline-none"
          />
          <datalist id="admin-styles">
            {STYLES.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </label>

        <label className="block text-xs">
          <span className="text-slate-400 uppercase tracking-wider font-mono">Estado</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#ff5500] focus:outline-none"
          >
            <option value="published">Publicado</option>
            <option value="draft">Borrador</option>
          </select>
        </label>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-white/15 hover:border-[#ff5500]/50 rounded-2xl p-8 text-center cursor-pointer transition-colors"
      >
        <ImagePlus className="w-7 h-7 text-[#ff5500] mx-auto mb-2" />
        <p className="text-sm text-slate-300">Arrastra fotos aquí o haz clic</p>
        <p className="text-[11px] text-slate-500 mt-1 font-mono">se optimizan a WebP ≤1600px al subir</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {items.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map((it, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40">
                <img src={it.url} alt="" className="w-full h-28 object-cover" />
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/80 text-white hover:bg-red-500/80"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <input
                  value={it.title}
                  onChange={(e) =>
                    setItems((prev) => prev.map((p, idx) => (idx === i ? { ...p, title: e.target.value } : p)))
                  }
                  placeholder="título (opcional)"
                  className="w-full bg-black/70 text-[11px] text-white px-2 py-1.5 border-t border-white/10 focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={run}
              disabled={!!progress}
              className="px-6 py-3 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-widest hover:bg-[#ff7700] transition-colors disabled:opacity-60 flex items-center gap-2"
            >
              {progress ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {progress ? `Subiendo ${progress.done}/${progress.total}` : `Subir ${items.length} piezas`}
            </button>
            {progress?.error && <span className="text-xs text-red-400 font-mono">{progress.error}</span>}
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------- piece card -- */

function PieceRow({ piece, onChange, onDelete }) {
  const [busy, setBusy] = useState(false);

  const toggle = async (patch) => {
    setBusy(true);
    try {
      const updated = await updatePiece(piece.id, patch);
      onChange(updated);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col">
      <div className="relative aspect-[4/5] bg-black/40">
        <img src={piece.image_url} alt={piece.title || ''} loading="lazy" className="w-full h-full object-cover" />
        {piece.status !== 'published' && (
          <span className="absolute top-2 left-2 text-[9px] font-mono font-bold uppercase bg-amber-500 text-black px-2 py-0.5 rounded-full">
            Borrador
          </span>
        )}
        {piece.featured && (
          <span className="absolute top-2 right-2 text-[#ff5500]">
            <Star className="w-4 h-4 fill-current" />
          </span>
        )}
      </div>
      <div className="p-3 space-y-1.5 flex-1 flex flex-col">
        <p className="text-xs font-bold text-white line-clamp-1">{piece.title || '—'}</p>
        <p className="text-[11px] text-slate-400 font-mono line-clamp-1">
          {piece.artist || '—'} · {piece.style || '—'}
        </p>
        <div className="flex items-center gap-1.5 pt-1 mt-auto">
          <button
            onClick={() => toggle({ status: piece.status === 'published' ? 'draft' : 'published' })}
            disabled={busy}
            title={piece.status === 'published' ? 'Despublicar' : 'Publicar'}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
          >
            {piece.status === 'published' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => toggle({ featured: !piece.featured })}
            disabled={busy}
            title="Destacar"
            className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 ${piece.featured ? 'text-[#ff5500]' : 'text-slate-300'}`}
          >
            <Star className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              if (confirm('¿Borrar esta pieza?')) onDelete(piece);
            }}
            disabled={busy}
            title="Borrar"
            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 ml-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- app -- */

export default function AdminPage() {
  const [session, setSession] = useState(undefined); // undefined = loading
  const [pieces, setPieces] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => onAuth(setSession), []);

  const refresh = async () => {
    setLoadingList(true);
    try {
      setPieces(await listAllPieces());
    } catch {
      setPieces([]);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    if (session) refresh();
  }, [session]);

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070709]">
        <Loader2 className="w-6 h-6 text-[#ff5500] animate-spin" />
      </div>
    );
  }

  if (!session) return <Login />;

  const published = pieces.filter((p) => p.status === 'published').length;

  return (
    <div className="min-h-screen bg-[#070709] text-white font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black uppercase font-heading tracking-wide">
              Panel · <span className="text-orange-gradient font-serif-title italic font-normal">Galería</span>
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              {pieces.length} piezas · {published} publicadas
            </p>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </header>

        <Uploader onDone={refresh} />

        <section className="space-y-4">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 font-mono">
            Piezas en la galería
          </h2>
          {loadingList ? (
            <div className="py-10 text-center">
              <Loader2 className="w-5 h-5 text-[#ff5500] animate-spin mx-auto" />
            </div>
          ) : pieces.length === 0 ? (
            <p className="text-sm text-slate-500 py-6">Aún no hay piezas. Sube las primeras arriba.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {pieces.map((p) => (
                <PieceRow
                  key={p.id}
                  piece={p}
                  onChange={(u) => setPieces((prev) => prev.map((x) => (x.id === u.id ? u : x)))}
                  onDelete={async (piece) => {
                    await deletePiece(piece.id, piece.image_url);
                    setPieces((prev) => prev.filter((x) => x.id !== piece.id));
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
