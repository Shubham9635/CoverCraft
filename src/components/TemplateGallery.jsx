import { CheckCircle2, LayoutGrid, Check } from "lucide-react";

export default function TemplateGallery({ templates, selectedId, onSelect }) {
  return (
    <section id="templates" className="py-12 sm:py-16 bg-gray-50/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
                <LayoutGrid className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">
                Step 1 · Choose Template
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Select a Pre-Designed Cover
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Pick a ready-to-print cover page. Layouts and college branding remain 100% original.
            </p>
          </div>

          <div className="text-xs text-gray-400 font-medium">
            {templates.length} templates available
          </div>
        </div>

        {/* Horizontal & Compact Template Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {templates.map((tpl) => {
            const isSelected = tpl.id === selectedId;
            return (
              <div
                key={tpl.id}
                onClick={() => onSelect(tpl.id)}
                className={`group relative flex flex-row items-center p-3 sm:p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-300 bg-white
                  ${
                    isSelected
                      ? "border-purple-600 ring-4 ring-purple-100 shadow-lg shadow-purple-500/10 scale-[1.01]"
                      : "border-gray-200/90 hover:border-purple-300 hover:shadow-md"
                  }
                `}
              >
                {/* Left: Compact thumbnail with preserved 3:4 aspect ratio */}
                <div className="relative w-24 sm:w-28 flex-shrink-0 aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
                  <img
                    src={tpl.file}
                    alt={tpl.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 bg-purple-600 text-white rounded-full p-0.5 shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Right: Info and Select button */}
                <div className="flex flex-col justify-between flex-1 pl-3.5 h-full min-h-[140px]">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-purple-50 text-purple-700 border border-purple-100 uppercase tracking-wider">
                        {tpl.category || "Cover Page"}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">
                        {tpl.fields.length} fields
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-purple-600 transition-colors">
                      {tpl.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">
                      {tpl.subtitle || "Pre-designed template"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(tpl.id);
                    }}
                    className={`mt-2.5 w-full py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5
                      ${
                        isSelected
                          ? "bg-purple-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-700 hover:bg-purple-600 hover:text-white"
                      }
                    `}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                      </>
                    ) : (
                      "Select Template"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
