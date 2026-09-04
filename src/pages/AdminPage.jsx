import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  STYLES,
  onAuth,
  signIn,
  signOut,
  uploadPiece,
  listAllPieces,
  updatePiece,
  deletePiece,
} from '../lib/adminGallery';
import {
  getMyStaff,
  getMyArtist,
  listArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  uploadPortrait,
} from '../lib/adminArtists';
import { STUDIO_META } from '../data/studios';
import {
  Upload, X, Star, Eye, EyeOff, Trash2, LogOut, Loader2, ImagePlus,
  Images, Users, Plus, ArrowLeft, Save,
} from 'lucide-react';

const STUDIO_KEYS = Object.keys(STUDIO_META); // ['santacruz', 'tabaiba']

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
            Panel · <span className="text-orange-gradient font-serif-title italic font-normal">Malibu</span>
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

/* --------------------------------------------------------------- ui atoms -- */

const Field = ({ label, children }) => (
  <label className="block text-xs">
    <span className="text-slate-400 uppercase tracking-wider font-mono">{label}</span>
    {children}
  </label>
);

const inputCls =
  'mt-1 w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#ff5500] focus:outline-none';

function FullScreenSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070709]">
      <Loader2 className="w-6 h-6 text-[#ff5500] animate-spin" />
    </div>
  );
}

/* ---------------------------------------------------------------- uploader -- */

function Uploader({ onDone, artists, lockedArtist }) {
  const options = useMemo(
    () => (lockedArtist ? [lockedArtist] : artists),
    [lockedArtist, artists],
  );
  const [artistSlug, setArtistSlug] = useState(options[0]?.slug || '');
  const [style, setStyle] = useState('');
  const [status, setStatus] = useState('published');
  const [items, setItems] = useState([]); // { file, url, title }
  const [progress, setProgress] = useState(null); // { done, total, error }
  const inputRef = useRef(null);

  const artist = useMemo(
    () => options.find((a) => a.slug === artistSlug) || options[0],
    [options, artistSlug],
  );

  // options load async (admin) — lock onto the first real one when it arrives
  useEffect(() => {
    if (options.length && !options.some((a) => a.slug === artistSlug)) {
      setArtistSlug(options[0].slug);
    }
  }, [options, artistSlug]);

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
    if (!artist) return;
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
        <Field label="Artista">
          {lockedArtist ? (
            <div className={`${inputCls} text-slate-300`}>{lockedArtist.name}</div>
          ) : (
            <select value={artistSlug} onChange={(e) => setArtistSlug(e.target.value)} className={inputCls}>
              {options.map((a) => (
                <option key={a.slug} value={a.slug}>{a.name}</option>
              ))}
            </select>
          )}
        </Field>

        <Field label="Estilo">
          <input
            list="admin-styles"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            placeholder="Blackwork…"
            className={inputCls}
          />
          <datalist id="admin-styles">
            {STYLES.map((s) => <option key={s} value={s} />)}
          </datalist>
        </Field>

        <Field label="Estado">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
            <option value="published">Publicado</option>
            <option value="draft">Borrador</option>
          </select>
        </Field>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-white/15 hover:border-[#ff5500]/50 rounded-2xl p-8 text-center cursor-pointer transition-colors"
      >
        <ImagePlus className="w-7 h-7 text-[#ff5500] mx-auto mb-2" />
        <p className="text-sm text-slate-300">Arrastra fotos aquí o haz clic</p>
        <p className="text-[11px] text-slate-500 mt-1 font-mono">se optimizan a WebP ≤1600px al subir</p>
        <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => addFiles(e.target.files)} />
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
            onClick={() => { if (confirm('¿Borrar esta pieza?')) onDelete(piece); }}
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

/* ------------------------------------------------------- gallery manager -- */

function GalleryManager({ artists, lockedArtist }) {
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      setPieces(await listAllPieces(lockedArtist ? { artistSlug: lockedArtist.slug } : {}));
    } catch {
      setPieces([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  const published = pieces.filter((p) => p.status === 'published').length;

  return (
    <div className="space-y-8">
      <Uploader onDone={refresh} artists={artists} lockedArtist={lockedArtist} />

      <section className="space-y-4">
        <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 font-mono">
          {pieces.length} piezas · {published} publicadas
        </h2>
        {loading ? (
          <div className="py-10 text-center"><Loader2 className="w-5 h-5 text-[#ff5500] animate-spin mx-auto" /></div>
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
  );
}

/* ----------------------------------------------------------- artist form -- */

function ArtistForm({ artist, isAdmin, onSaved, onBack, onDeleted }) {
  const [form, setForm] = useState({
    name: artist.name || '',
    handle: artist.handle || '',
    instagram_url: artist.instagram_url || '',
    role_title: artist.role_title || '',
    bio_es: artist.bio_es || '',
    bio_en: artist.bio_en || '',
    whatsapp: artist.whatsapp || '',
    email: artist.email || '',
    portrait_url: artist.portrait_url || '',
    studio: artist.studio || 'santacruz',
    status: artist.status || 'published',
    sort_order: artist.sort_order ?? 100,
  });
  const [specialtiesText, setSpecialtiesText] = useState((artist.specialties || []).join(', '));
  const [busy, setBusy] = useState('');
  const [err, setErr] = useState('');
  const portraitRef = useRef(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const pickPortrait = async (file) => {
    if (!file) return;
    setBusy('portrait');
    setErr('');
    try {
      const url = await uploadPortrait(file, artist.slug);
      setForm((f) => ({ ...f, portrait_url: url }));
    } catch (e) {
      setErr(e.message || 'No se pudo subir la foto');
    } finally {
      setBusy('');
    }
  };

  const save = async () => {
    setBusy('save');
    setErr('');
    try {
      const payload = {
        ...form,
        specialties: specialtiesText.split(',').map((s) => s.trim()).filter(Boolean),
      };
      if (!isAdmin) {
        delete payload.studio;
        delete payload.status;
        delete payload.sort_order;
      }
      const updated = await updateArtist(artist.id, payload);
      onSaved(updated);
    } catch (e) {
      setErr(e.message || 'No se pudo guardar');
    } finally {
      setBusy('');
    }
  };

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-5 sm:p-7 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h3 className="text-sm font-black uppercase text-white font-heading tracking-wide">{artist.name}</h3>
            <p className="text-[11px] text-slate-500 font-mono">
              /{artist.slug} · {STUDIO_META[form.studio]?.label || form.studio}
            </p>
          </div>
        </div>
        {isAdmin && onDeleted && (
          <button
            onClick={() => { if (confirm(`¿Borrar a ${artist.name}? No se puede deshacer.`)) onDeleted(artist); }}
            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
            title="Borrar artista"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* portrait */}
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/15 bg-black/40 shrink-0">
          {form.portrait_url
            ? <img src={form.portrait_url} alt="" className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-center justify-center text-slate-600"><ImagePlus className="w-6 h-6" /></div>}
        </div>
        <div>
          <button
            onClick={() => portraitRef.current?.click()}
            disabled={busy === 'portrait'}
            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 disabled:opacity-60"
          >
            {busy === 'portrait' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImagePlus className="w-3.5 h-3.5" />}
            Cambiar foto
          </button>
          <p className="text-[11px] text-slate-500 mt-1.5 font-mono">se optimiza a WebP al subir</p>
          <input
            ref={portraitRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => pickPortrait(e.target.files?.[0])}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Nombre"><input value={form.name} onChange={set('name')} className={inputCls} /></Field>
        <Field label="Instagram (handle sin @)">
          <input value={form.handle} onChange={set('handle')} placeholder="yenko_freestyletatau" className={inputCls} />
        </Field>
        <Field label="URL de Instagram">
          <input value={form.instagram_url} onChange={set('instagram_url')} placeholder="https://www.instagram.com/…" className={inputCls} />
        </Field>
        <Field label="Rol / título">
          <input value={form.role_title} onChange={set('role_title')} placeholder="Fine Line Artist" className={inputCls} />
        </Field>
      </div>

      <Field label="Bio (ES)">
        <textarea value={form.bio_es} onChange={set('bio_es')} rows={3} className={inputCls} />
      </Field>
      <Field label="Bio (EN)">
        <textarea value={form.bio_en} onChange={set('bio_en')} rows={3} className={inputCls} />
      </Field>
      <Field label="Estilos / especialidades (separados por comas)">
        <input
          value={specialtiesText}
          onChange={(e) => setSpecialtiesText(e.target.value)}
          placeholder="Blackwork, Fine Line, Dotwork"
          className={inputCls}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="WhatsApp (con prefijo, ej. +34…)">
          <input value={form.whatsapp} onChange={set('whatsapp')} placeholder="+34 600 00 00 00" className={inputCls} />
        </Field>
        <Field label="Email de contacto">
          <input value={form.email} onChange={set('email')} placeholder="nombre@…" className={inputCls} />
        </Field>
      </div>

      {isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-white/10">
          <Field label="Estudio">
            <select value={form.studio} onChange={set('studio')} className={inputCls}>
              {STUDIO_KEYS.map((k) => <option key={k} value={k}>{STUDIO_META[k].label}</option>)}
            </select>
          </Field>
          <Field label="Visibilidad">
            <select value={form.status} onChange={set('status')} className={inputCls}>
              <option value="published">Publicado</option>
              <option value="draft">Oculto (borrador)</option>
            </select>
          </Field>
          <Field label="Orden">
            <input type="number" value={form.sort_order} onChange={set('sort_order')} className={inputCls} />
          </Field>
        </div>
      )}

      {err && <p className="text-xs text-red-400 font-mono">{err}</p>}

      <button
        onClick={save}
        disabled={busy === 'save'}
        className="px-6 py-3 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-widest hover:bg-[#ff7700] transition-colors disabled:opacity-60 flex items-center gap-2"
      >
        {busy === 'save' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        Guardar cambios
      </button>
    </div>
  );
}

/* --------------------------------------------------------- new artist -- */

function NewArtistForm({ onCreated, onCancel }) {
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');
  const [studio, setStudio] = useState('santacruz');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const create = async () => {
    setBusy(true);
    setErr('');
    try {
      const a = await createArtist({ slug: slug.trim().toLowerCase(), name: name.trim(), studio });
      onCreated(a);
    } catch (e) {
      setErr(e.message || 'No se pudo crear');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-5 sm:p-6 space-y-4">
      <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 font-mono">Nuevo artista</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Slug (URL, ej. yenko)">
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Nombre">
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Estudio">
          <select value={studio} onChange={(e) => setStudio(e.target.value)} className={inputCls}>
            {STUDIO_KEYS.map((k) => <option key={k} value={k}>{STUDIO_META[k].label}</option>)}
          </select>
        </Field>
      </div>
      {err && <p className="text-xs text-red-400 font-mono">{err}</p>}
      <div className="flex items-center gap-3">
        <button
          onClick={create}
          disabled={busy || !slug.trim() || !name.trim()}
          className="px-5 py-2.5 rounded-full bg-[#ff5500] text-black font-extrabold text-xs uppercase tracking-widest hover:bg-[#ff7700] transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Crear y editar
        </button>
        <button onClick={onCancel} className="text-xs text-slate-400 hover:text-white transition-colors">Cancelar</button>
      </div>
      <p className="text-[11px] text-slate-500 font-mono">
        Se crea oculto (borrador). Rellena su ficha y ponlo en «Publicado» cuando esté listo.
      </p>
    </div>
  );
}

/* ------------------------------------------------------- artists manager -- */

function ArtistsManager() {
  const [artists, setArtists] = useState(null); // null = loading
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);

  const refresh = async () => {
    try {
      setArtists(await listArtists());
    } catch {
      setArtists([]);
    }
  };

  useEffect(() => { refresh(); }, []);

  if (artists === null) {
    return <div className="py-10 text-center"><Loader2 className="w-5 h-5 text-[#ff5500] animate-spin mx-auto" /></div>;
  }

  if (editing) {
    return (
      <ArtistForm
        artist={editing}
        isAdmin
        onBack={() => setEditing(null)}
        onSaved={(u) => { setArtists((prev) => prev.map((a) => (a.id === u.id ? u : a))); setEditing(u); }}
        onDeleted={async (a) => { await deleteArtist(a.id); setArtists((prev) => prev.filter((x) => x.id !== a.id)); setEditing(null); }}
      />
    );
  }

  return (
    <div className="space-y-5">
      {creating ? (
        <NewArtistForm
          onCancel={() => setCreating(false)}
          onCreated={(a) => { setCreating(false); setArtists((prev) => [...prev, a]); setEditing(a); }}
        />
      ) : (
        <button
          onClick={() => setCreating(true)}
          className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-[#ff5500]" /> Nuevo artista
        </button>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {artists.map((a) => (
          <button
            key={a.id}
            onClick={() => setEditing(a)}
            className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col text-left hover:border-[#ff5500]/50 transition-colors"
          >
            <div className="relative aspect-[4/5] bg-black/40">
              {a.portrait_url
                ? <img src={a.portrait_url} alt={a.name} loading="lazy" className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-slate-600"><ImagePlus className="w-6 h-6" /></div>}
              {a.status !== 'published' && (
                <span className="absolute top-2 left-2 text-[9px] font-mono font-bold uppercase bg-amber-500 text-black px-2 py-0.5 rounded-full">
                  Oculto
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="text-xs font-bold text-white line-clamp-1">{a.name}</p>
              <p className="text-[11px] text-slate-400 font-mono line-clamp-1">
                {STUDIO_META[a.studio]?.label || a.studio}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- admin console -- */

function AdminConsole() {
  const [view, setView] = useState('gallery'); // 'gallery' | 'artists'
  const [artistOptions, setArtistOptions] = useState([]);

  useEffect(() => {
    listArtists()
      .then((rows) => setArtistOptions(rows.map((a) => ({ slug: a.slug, name: a.name }))))
      .catch(() => setArtistOptions([]));
  }, []);

  const Tab = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setView(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-colors ${
        view === id ? 'bg-[#ff5500] text-black' : 'text-slate-400 hover:text-white'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#070709] text-white font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <header className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-lg font-black uppercase font-heading tracking-wide">
            Panel · <span className="text-orange-gradient font-serif-title italic font-normal">Malibu</span>
          </h1>
          <div className="flex items-center gap-1 glass-panel rounded-full border border-white/10 p-1">
            <Tab id="gallery" icon={Images} label="Galería" />
            <Tab id="artists" icon={Users} label="Artistas" />
          </div>
          <button onClick={signOut} className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" /> Salir
          </button>
        </header>

        {view === 'gallery'
          ? <GalleryManager artists={artistOptions} />
          : <ArtistsManager />}
      </div>
    </div>
  );
}

/* --------------------------------------------------------- artist console -- */

function ArtistConsole({ artist: initial }) {
  const [artist, setArtist] = useState(initial);

  return (
    <div className="min-h-screen bg-[#070709] text-white font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black uppercase font-heading tracking-wide">
              Hola, <span className="text-orange-gradient font-serif-title italic font-normal">{artist.name}</span>
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">Tu ficha y tu galería</p>
          </div>
          <button onClick={signOut} className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" /> Salir
          </button>
        </header>

        <ArtistForm artist={artist} onSaved={setArtist} />

        <section className="space-y-4">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 font-mono">Tu galería</h2>
          <GalleryManager lockedArtist={{ slug: artist.slug, name: artist.name }} />
        </section>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- app -- */

export default function AdminPage() {
  const [session, setSession] = useState(undefined); // undefined = loading
  const [me, setMe] = useState(undefined); // undefined = loading, null = not staff, { role, myArtist? }

  useEffect(() => onAuth(setSession), []);

  useEffect(() => {
    if (session === undefined) return;
    if (!session) { setMe(undefined); return; }

    let alive = true;
    (async () => {
      const staff = await getMyStaff();
      if (!alive) return;
      if (staff?.role === 'admin') { setMe({ role: 'admin' }); return; }
      const mine = await getMyArtist();
      if (!alive) return;
      setMe(mine ? { role: 'artist', myArtist: mine } : null);
    })();
    return () => { alive = false; };
  }, [session]);

  if (session === undefined || (session && me === undefined)) return <FullScreenSpinner />;
  if (!session) return <Login />;

  if (me === null) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[#070709] text-center">
        <div className="space-y-4">
          <p className="text-sm text-slate-300">Tu usuario no tiene ninguna ficha ni permiso asignado.</p>
          <button onClick={signOut} className="text-xs text-[#ff5500] hover:underline font-mono">Cerrar sesión</button>
        </div>
      </div>
    );
  }

  return me.role === 'admin' ? <AdminConsole /> : <ArtistConsole artist={me.myArtist} />;
}
