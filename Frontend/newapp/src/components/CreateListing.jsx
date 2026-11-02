import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaTimes, FaPlus, FaMinus } from "react-icons/fa";

const CURRENCY = "$";
const MAX_IMAGES = 6;
const MAX_MB = 5;

const inputCls =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100";
const labelCls = "mb-1 block text-sm font-semibold text-slate-700";

function Card({ title, children }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-lg font-bold text-slate-900">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Counter({ label, value, onChange }) {
  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="flex w-fit items-center rounded-lg border border-slate-300">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          className="grid h-10 w-10 place-items-center text-slate-600 hover:bg-slate-50"
          aria-label={`Decrease ${label}`}
        >
          <FaMinus size={11} />
        </button>
        <span className="w-10 text-center font-semibold text-slate-900">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(10, value + 1))}
          className="grid h-10 w-10 place-items-center text-slate-600 hover:bg-slate-50"
          aria-label={`Increase ${label}`}
        >
          <FaPlus size={11} />
        </button>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, children }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
        checked
          ? "border-blue-700 bg-blue-50 text-blue-700"
          : "border-slate-300 text-slate-700 hover:bg-slate-50"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-blue-700"
      />
      {children}
    </label>
  );
}

export default function CreateListing() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    discription: "", // spelling kept to match your backend
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    regularPrice: "",
    offer: false,
    discountPrice: "",
  });
  const [images, setImages] = useState([]); // [{ file, preview }]
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [dragging, setDragging] = useState(false);

  // free preview URLs when leaving the page
  const imagesRef = useRef(images);
  imagesRef.current = images;
  useEffect(
    () => () => imagesRef.current.forEach((i) => URL.revokeObjectURL(i.preview)),
    []
  );

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));
  const onText = (e) => set({ [e.target.id]: e.target.value });

  const addFiles = (fileList) => {
    const picked = Array.from(fileList || []).filter((f) => f.type.startsWith("image/"));
    if (picked.length === 0) return;

    const tooBig = picked.find((f) => f.size > MAX_MB * 1024 * 1024);
    if (tooBig) {
      setError(`"${tooBig.name}" is larger than ${MAX_MB} MB.`);
      return;
    }

    const room = MAX_IMAGES - images.length;
    if (picked.length > room) {
      setError(`You can upload up to ${MAX_IMAGES} images.`);
    } else {
      setError("");
    }
    const next = picked.slice(0, Math.max(room, 0)).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...next]);
  };

  const removeImg = (index) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
    setError("");
  };

  const makeCover = (index) => {
    setImages((prev) => {
      const copy = [...prev];
      const [picked] = copy.splice(index, 1);
      return [picked, ...copy];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (images.length === 0) {
      setError("Please add at least one image.");
      return;
    }
    if (form.offer && Number(form.discountPrice) >= Number(form.regularPrice)) {
      setError("Discounted price must be lower than the regular price.");
      return;
    }

    const body = new FormData();
    body.append("userRef", currentUser?._id || "");
    body.append("name", form.name);
    body.append("discription", form.discription);
    body.append("address", form.address);
    body.append("regularPrice", form.regularPrice);
    body.append("discountPrice", form.offer ? form.discountPrice : "");
    body.append("type", form.type);
    body.append("offer", form.offer);
    body.append("bedrooms", form.bedrooms);
    body.append("bathrooms", form.bathrooms);
    body.append("parking", form.parking);
    body.append("furnished", form.furnished);
    images.forEach((img) => body.append("images", img.file));

    setSaving(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/createListing`, {
        method: "POST",
        body,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || "Could not create the listing.");
        return;
      }
      navigate(`/listing/${data._id}`);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Create a listing</h1>
          <p className="mt-1 text-sm text-slate-500">Fill in the details and add photos of your property.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
          {/* ---------- LEFT: details ---------- */}
          <div className="space-y-6 lg:col-span-2">
            <Card title="Basic information">
              <div>
                <label htmlFor="name" className={labelCls}>Title</label>
                <input
                  id="name"
                  required
                  minLength={10}
                  maxLength={62}
                  placeholder="e.g. 3 bed house near Main Boulevard"
                  className={inputCls}
                  value={form.name}
                  onChange={onText}
                />
              </div>
              <div>
                <label htmlFor="discription" className={labelCls}>Description</label>
                <textarea
                  id="discription"
                  required
                  rows={4}
                  placeholder="Describe the property, nearby places, rules..."
                  className={inputCls}
                  value={form.discription}
                  onChange={onText}
                />
              </div>
              <div>
                <label htmlFor="address" className={labelCls}>Address</label>
                <input
                  id="address"
                  required
                  placeholder="Area, city"
                  className={inputCls}
                  value={form.address}
                  onChange={onText}
                />
              </div>
            </Card>

            <Card title="Property details">
              <div>
                <span className={labelCls}>Listing type</span>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { v: "rent", l: "For Rent" },
                    { v: "sale", l: "For Sale" },
                  ].map((t) => (
                    <button
                      key={t.v}
                      type="button"
                      onClick={() => set({ type: t.v })}
                      className={`rounded-lg border py-2.5 font-semibold transition ${
                        form.type === t.v
                          ? "border-blue-700 bg-blue-700 text-white"
                          : "border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {t.l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <Counter label="Bedrooms" value={form.bedrooms} onChange={(v) => set({ bedrooms: v })} />
                <Counter label="Bathrooms" value={form.bathrooms} onChange={(v) => set({ bathrooms: v })} />
              </div>

              <div>
                <span className={labelCls}>Features</span>
                <div className="flex flex-wrap gap-3">
                  <Toggle checked={form.parking} onChange={(v) => set({ parking: v })}>Parking spot</Toggle>
                  <Toggle checked={form.furnished} onChange={(v) => set({ furnished: v })}>Furnished</Toggle>
                </div>
              </div>
            </Card>

            <Card title="Pricing">
              <div>
                <label htmlFor="regularPrice" className={labelCls}>
                  Regular price ({CURRENCY}){form.type === "rent" && " per month"}
                </label>
                <input
                  id="regularPrice"
                  type="number"
                  required
                  min={50}
                  max={10000000}
                  placeholder="0"
                  className={inputCls}
                  value={form.regularPrice}
                  onChange={onText}
                />
              </div>

              <Toggle checked={form.offer} onChange={(v) => set({ offer: v, discountPrice: v ? form.discountPrice : "" })}>
                Add a special offer
              </Toggle>

              {form.offer && (
                <div>
                  <label htmlFor="discountPrice" className={labelCls}>
                    Discounted price ({CURRENCY}){form.type === "rent" && " per month"}
                  </label>
                  <input
                    id="discountPrice"
                    type="number"
                    required
                    min={0}
                    max={10000000}
                    placeholder="0"
                    className={inputCls}
                    value={form.discountPrice}
                    onChange={onText}
                  />
                </div>
              )}
            </Card>
          </div>

          {/* ---------- RIGHT: photos + submit ---------- */}
          <div className="lg:col-span-1">
            <div className="space-y-6 lg:sticky lg:top-20">
              <Card title={`Photos (${images.length}/${MAX_IMAGES})`}>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={(e) => {
                    addFiles(e.target.files);
                    e.target.value = "";
                  }}
                />

                <button
                  type="button"
                  onClick={() => fileRef.current.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    addFiles(e.dataTransfer.files);
                  }}
                  disabled={images.length >= MAX_IMAGES}
                  className={`flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition disabled:cursor-not-allowed disabled:opacity-50 ${
                    dragging ? "border-blue-700 bg-blue-50" : "border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <FaCloudUploadAlt size={30} className="text-blue-700" />
                  <span className="text-sm font-semibold text-slate-700">Click to upload or drag and drop</span>
                  <span className="text-xs text-slate-500">Up to {MAX_IMAGES} images, {MAX_MB} MB each</span>
                </button>

                {images.length > 0 && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      {images.map((img, i) => (
                        <div key={img.preview} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200">
                          <img src={img.preview} alt="Preview" className="h-full w-full object-cover" />
                          {i === 0 ? (
                            <span className="absolute bottom-1.5 left-1.5 rounded bg-blue-700 px-2 py-0.5 text-[11px] font-semibold text-white">
                              Cover
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => makeCover(i)}
                              className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white opacity-100 transition hover:bg-black/80 sm:opacity-0 sm:group-hover:opacity-100"
                            >
                              Make cover
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImg(i)}
                            aria-label="Remove image"
                            className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white transition hover:bg-rose-600"
                          >
                            <FaTimes size={11} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </Card>

              {error && (
                <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
              >
                {saving ? "Creating listing..." : "Create listing"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}