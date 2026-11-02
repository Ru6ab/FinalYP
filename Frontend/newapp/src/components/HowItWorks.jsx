import { FaSearch, FaEnvelopeOpenText, FaKey } from "react-icons/fa";

const steps = [
  { icon: FaSearch, title: "Search", text: "Filter homes by type, location and price." },
  { icon: FaEnvelopeOpenText, title: "Contact the owner", text: "Send a message straight to the listing owner." },
  { icon: FaKey, title: "Move in", text: "Agree on terms and get your keys." },
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-50 pt-12 pb-20 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 sm:text-3xl">How it works</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="rounded-xl bg-white p-6 text-center shadow-sm">
              <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-blue-100 text-blue-700">
                <Icon size={20} />
              </span>
              <h3 className="font-semibold text-slate-900">{i + 1}. {title}</h3>
              <p className="mt-1 text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}