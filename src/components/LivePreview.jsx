import { useEffect, useRef, useState } from "react";
import { renderToCanvas } from "../utils/canvasUtils";
import { Eye, ImageOff } from "lucide-react";

export default function LivePreview({ template, details }) {
  const canvasRef = useRef(null);
  const [isRendering, setIsRendering] = useState(false);
  const [renderError, setRenderError] = useState(null);

  // Re-render the canvas whenever template or details change
  useEffect(() => {
    if (!template || !canvasRef.current) return;

    let cancelled = false;
    setIsRendering(true);
    setRenderError(null);

    renderToCanvas(canvasRef.current, template, details, 2)
      .then(() => {
        if (!cancelled) setIsRendering(false);
      })
      .catch((err) => {
        if (!cancelled) {
          setIsRendering(false);
          setRenderError(err.message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [template, details]);

  if (!template) {
    return (
      <div className="flex flex-col items-center justify-center h-72 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 text-gray-400 gap-3">
        <Eye className="w-8 h-8 opacity-40" />
        <p className="text-sm font-medium">Select a template to see a preview</p>
      </div>
    );
  }

  const aspectRatio = template.naturalWidth / template.naturalHeight;

  return (
    <div className="relative w-full flex justify-center">
      {/* Canvas wrapper — compact reduced size & horizontally centered */}
      <div className="relative w-full max-w-[380px] mx-auto">
        <div
          className="relative w-full rounded-xl overflow-hidden shadow-xl border border-gray-200/90 bg-white"
          style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ imageRendering: "auto" }}
          />

          {/* Rendering shimmer */}
          {isRendering && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-3 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                <span className="text-xs text-purple-600 font-medium">Rendering…</span>
              </div>
            </div>
          )}

          {/* Error state */}
          {renderError && !isRendering && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-50/80">
              <div className="flex flex-col items-center gap-2 text-red-500 p-4 text-center">
                <ImageOff className="w-8 h-8" />
                <p className="text-xs font-medium">Preview error: {renderError}</p>
              </div>
            </div>
          )}
        </div>

        {/* "Live" badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow text-xs font-semibold text-gray-700 border border-gray-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live Preview
        </div>
      </div>
    </div>
  );
}
