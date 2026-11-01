import { ArrowDown, Sparkles, FileImage, Download } from "lucide-react";

const steps = [
  { icon: FileImage, title: "Pick a Template", desc: "Choose from our gallery of pre-designed lab file covers." },
  { icon: Sparkles, title: "Fill 3 Details", desc: "Enter your Name, Roll Number, and Branch — that's it." },
  { icon: Download, title: "Download & Print", desc: "Download your ready-to-print cover as PDF or PNG." },
];

export default function HeroSection({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-indigo-50 pt-20 pb-24">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-16 right-0 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-6">
          <Sparkles className="w-3 h-3" /> Free • Fast • No Sign-up Required
        </span>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-5">
          Your Lab File Cover,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">
            Ready in Seconds
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-500 mb-10">
          Select your cover, fill in three details, and download your
          ready-to-print lab file. No design skills needed.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onGetStarted}
            className="px-7 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-200 transition-all text-base"
          >
            Browse Templates →
          </button>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 px-6 py-3.5 text-gray-600 hover:text-purple-600 font-medium text-base transition-colors"
          >
            <ArrowDown className="w-4 h-4" /> How it works
          </a>
        </div>

        {/* Steps */}
        <div
          id="how-it-works"
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left flex gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <s.icon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-purple-400 mb-0.5">
                  STEP {i + 1}
                </p>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {s.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

