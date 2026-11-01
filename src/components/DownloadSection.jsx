import { useState, useRef } from "react";
import { Download, FileText, ImageDown, CheckCircle2, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { exportToPDF, exportToPNG } from "../utils/canvasUtils";

export default function DownloadSection({
  template,
  details,
  isValid,
  onAttemptInvalidDownload,
}) {
  const canvasRef = useRef(null);
  const [downloadingFormat, setDownloadingFormat] = useState(null); // 'pdf' | 'png' | null
  const [successFormat, setSuccessFormat] = useState(null); // 'pdf' | 'png' | null
  const [errorMessage, setErrorMessage] = useState(null);

  const getCanvas = () => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }
    return canvasRef.current;
  };

  const getCleanFileName = (extension) => {
    const studentName = (details.name || "Student").trim().replace(/[^a-zA-Z0-9]/g, "_");
    const tplName = (template.name || "Cover").replace(/[^a-zA-Z0-9]/g, "_");
    return `${studentName}_${tplName}.${extension}`;
  };

  async function handleDownloadPDF() {
    if (!isValid) {
      onAttemptInvalidDownload?.();
      return;
    }
    if (downloadingFormat) return;

    setDownloadingFormat("pdf");
    setErrorMessage(null);
    setSuccessFormat(null);

    try {
      const canvas = getCanvas();
      const pdf = await exportToPDF(canvas, template, details);
      pdf.save(getCleanFileName("pdf"));
      setSuccessFormat("pdf");
    } catch (e) {
      console.error("PDF generation failed:", e);
      setErrorMessage("Could not generate PDF. Please try again.");
    } finally {
      setDownloadingFormat(null);
      setTimeout(() => setSuccessFormat(null), 3500);
    }
  }

  async function handleDownloadPNG() {
    if (!isValid) {
      onAttemptInvalidDownload?.();
      return;
    }
    if (downloadingFormat) return;

    setDownloadingFormat("png");
    setErrorMessage(null);
    setSuccessFormat(null);

    try {
      const canvas = getCanvas();
      const url = await exportToPNG(canvas, template, details);
      const a = document.createElement("a");
      a.href = url;
      a.download = getCleanFileName("png");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSuccessFormat("png");
    } catch (e) {
      console.error("PNG export failed:", e);
      setErrorMessage("Could not export PNG. Please try again.");
    } finally {
      setDownloadingFormat(null);
      setTimeout(() => setSuccessFormat(null), 3500);
    }
  }

  return (
    <div className="space-y-4">
      {/* Friendly validation status banner */}
      {!isValid ? (
        <div className="flex items-start gap-2.5 p-3.5 bg-amber-50/90 border border-amber-200 rounded-xl text-amber-800 text-xs leading-relaxed">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>
            Please complete all required fields above ({template.fields.length} fields) to enable instant downloads.
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-3 bg-purple-50/80 border border-purple-100 rounded-xl text-purple-700 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Ready to export! Original layout and design preserved 100%.</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Action buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* PDF Download Button */}
        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={downloadingFormat !== null}
          className={`
            relative flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all
            ${
              successFormat === "pdf"
                ? "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm"
                : isValid
                ? "border-purple-600 bg-purple-600 text-white hover:bg-purple-700 hover:border-purple-700 shadow-md hover:shadow-purple-200 active:scale-[0.99]"
                : "border-gray-200 bg-gray-50 text-gray-400 hover:border-gray-300 hover:text-gray-600"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                successFormat === "pdf"
                  ? "bg-emerald-100 text-emerald-700"
                  : isValid
                  ? "bg-white/20 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {downloadingFormat === "pdf" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : successFormat === "pdf" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">
                {downloadingFormat === "pdf"
                  ? "Generating PDF…"
                  : successFormat === "pdf"
                  ? "Downloaded!"
                  : "Download PDF"}
              </p>
              <p
                className={`text-xs mt-0.5 ${
                  successFormat === "pdf"
                    ? "text-emerald-700"
                    : isValid
                    ? "text-purple-100"
                    : "text-gray-400"
                }`}
              >
                A4 Size · Print-ready
              </p>
            </div>
          </div>
          <Download
            className={`w-4 h-4 ml-2 ${
              isValid && !downloadingFormat ? "opacity-90" : "opacity-40"
            }`}
          />
        </button>

        {/* PNG Download Button */}
        <button
          type="button"
          onClick={handleDownloadPNG}
          disabled={downloadingFormat !== null}
          className={`
            relative flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all
            ${
              successFormat === "png"
                ? "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm"
                : isValid
                ? "border-gray-900 bg-gray-900 text-white hover:bg-black hover:border-black shadow-md hover:shadow-gray-200 active:scale-[0.99]"
                : "border-gray-200 bg-gray-50 text-gray-400 hover:border-gray-300 hover:text-gray-600"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                successFormat === "png"
                  ? "bg-emerald-100 text-emerald-700"
                  : isValid
                  ? "bg-white/20 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {downloadingFormat === "png" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : successFormat === "png" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <ImageDown className="w-5 h-5" />
              )}
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">
                {downloadingFormat === "png"
                  ? "Exporting PNG…"
                  : successFormat === "png"
                  ? "Downloaded!"
                  : "Download PNG"}
              </p>
              <p
                className={`text-xs mt-0.5 ${
                  successFormat === "png"
                    ? "text-emerald-700"
                    : isValid
                    ? "text-gray-300"
                    : "text-gray-400"
                }`}
              >
                High Resolution · 3× DPI
              </p>
            </div>
          </div>
          <Download
            className={`w-4 h-4 ml-2 ${
              isValid && !downloadingFormat ? "opacity-90" : "opacity-40"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
