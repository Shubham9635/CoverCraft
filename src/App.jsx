import { useState, useRef, useCallback } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TemplateGallery from "./components/TemplateGallery";
import DetailsForm, { validateDetails } from "./components/DetailsForm";
import LivePreview from "./components/LivePreview";
import DownloadSection from "./components/DownloadSection";
import Footer from "./components/Footer";
import templates from "./data/templates";
import { PenLine, Eye, Sparkles, CheckCircle2, ArrowUp, MousePointerClick } from "lucide-react";

const INITIAL_DETAILS = {
  name: "",
  rollNumber: "2423",
  branch: "",
  subjectName: "",
  unit: "",
  semester: "",
  submittedTo: "",
};

export default function App() {
  // Initially NO template is selected. Step 2 & 3 open only after a template is chosen.
  const [selectedId, setSelectedId] = useState(null);
  const [details, setDetails] = useState(INITIAL_DETAILS);
  const [errors, setErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const galleryRef = useRef(null);
  const workspaceRef = useRef(null);

  // Current template is only set when selectedId is selected by the user
  const selectedTemplate = selectedId
    ? templates.find((t) => t.id === selectedId) || null
    : null;

  // Validation against currently selected template
  const validationErrors = selectedTemplate
    ? validateDetails(details, selectedTemplate)
    : null;
  const isFormValid = !validationErrors;

  // --- Handlers ---
  function scrollTo(ref) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleNavClick(section) {
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (section === "templates") {
      scrollTo(galleryRef);
    } else if (section === "about") {
      const el = document.getElementById("how-it-works");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function handleSelectTemplate(id) {
    setSelectedId(id);
    // Re-evaluate validation for the newly selected template if already submitted
    const newTemplate = templates.find((t) => t.id === id);
    if (hasAttemptedSubmit && newTemplate) {
      setErrors(validateDetails(details, newTemplate) || {});
    }
    // Smooth scroll down to the newly opened Step 2 & 3 workspace
    setTimeout(() => scrollTo(workspaceRef), 120);
  }

  const handleDetailChange = useCallback(
    (key, value) => {
      setDetails((prev) => {
        const next = { ...prev, [key]: value };
        if (hasAttemptedSubmit && selectedTemplate) {
          const valErrors = validateDetails(next, selectedTemplate);
          setErrors(valErrors || {});
        }
        return next;
      });
    },
    [hasAttemptedSubmit, selectedTemplate]
  );

  function handleAttemptInvalidDownload() {
    setHasAttemptedSubmit(true);
    if (selectedTemplate) {
      setErrors(validateDetails(details, selectedTemplate) || {});
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 antialiased selection:bg-purple-100 selection:text-purple-900">
      <Header onNavClick={handleNavClick} />

      {/* Hero */}
      <HeroSection onGetStarted={() => scrollTo(galleryRef)} />

      {/* Step 1: Template Gallery */}
      <div ref={galleryRef}>
        <TemplateGallery
          templates={templates}
          selectedId={selectedId}
          onSelect={handleSelectTemplate}
        />
      </div>

      {/* Call to action notice if no template is chosen yet */}
      {!selectedTemplate && (
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl mb-4">
              <MousePointerClick className="w-6 h-6 animate-bounce" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Select a Template Above to Continue
            </h3>
            <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
              Choose either <strong>Programming Lab File</strong> or <strong>Assignment Cover</strong> from Step 1 above. The details form and live preview will open instantly.
            </p>
          </div>
        </section>
      )}

      {/* Workspace: Step 2 (Form) + Step 3 (Live Preview & Download) */}
      {selectedTemplate && (
        <section
          ref={workspaceRef}
          className="py-16 bg-white border-t border-purple-100 transition-all duration-500"
          id="workspace"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Step header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-200/60 rounded-full text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Step 2 &amp; 3 · Fill Details &amp; Export
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                  Enter Your Details &amp; Export
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-gray-500 text-sm">Active Template:</span>
                  <span className="font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-100 text-sm inline-block">
                    {selectedTemplate.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({selectedTemplate.fields.length} fields)
                  </span>
                </div>
              </div>

              {/* Change template quick button */}
              <button
                type="button"
                onClick={() => scrollTo(galleryRef)}
                className="self-start md:self-center inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-600 hover:text-purple-700 bg-gray-50 hover:bg-purple-50 rounded-xl border border-gray-200 transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" /> Change Template
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left column (Form & Download) */}
              <div className="lg:col-span-6 space-y-6">
                {/* Form card */}
                <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 sm:p-7">
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                        <PenLine className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-base">
                          {selectedTemplate.id.includes("assignment")
                            ? "Assignment Details"
                            : "Student Details"}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {selectedTemplate.fields.length} required fields for this template
                        </p>
                      </div>
                    </div>
                    {isFormValid && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> All filled
                      </span>
                    )}
                  </div>

                  <DetailsForm
                    template={selectedTemplate}
                    details={details}
                    onChange={handleDetailChange}
                    errors={hasAttemptedSubmit ? errors : {}}
                    disabled={false}
                  />
                </div>

                {/* Download options card */}
                <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 sm:p-7">
                  <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-gray-100">
                    <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">Download Cover Page</h3>
                      <p className="text-xs text-gray-500">Original design preserved 1:1</p>
                    </div>
                  </div>

                  <DownloadSection
                    template={selectedTemplate}
                    details={details}
                    isValid={isFormValid}
                    onAttemptInvalidDownload={handleAttemptInvalidDownload}
                  />
                </div>
              </div>

              {/* Right column (Live preview) */}
              <div className="lg:col-span-6 sticky top-24">
                <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm p-5 sm:p-6">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                        <Eye className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-base">Live Preview</h3>
                        <p className="text-xs text-gray-500">Updates live as you type</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-gray-400">
                      {selectedTemplate.naturalWidth} × {selectedTemplate.naturalHeight}px
                    </span>
                  </div>

                  <LivePreview template={selectedTemplate} details={details} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
