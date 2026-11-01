import { Heart, BookOpen, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-base">
              Cover<span className="text-purple-400">Craft</span>
            </span>
          </div>

          {/* Developer Credit */}
          <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1.5 flex-wrap">
            <span>Designed &amp; Developed with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>by</span>
            <span className="inline-flex items-center gap-1 text-white font-semibold bg-gray-900 border border-gray-800 px-2 py-0.5 rounded-md hover:border-purple-500/50 hover:text-purple-300 transition-all">
              <Code2 className="w-3 h-3 text-purple-400" />
              Shubham Gupta
            </span>
          </p>

          {/* Quick Links */}
          <div className="flex items-center gap-5 text-xs text-gray-400">
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <span className="text-gray-700">|</span>
            <span className="text-gray-400">Print-Ready A4</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} CoverCraft · Built by Shubham Gupta</p>
          <p className="text-gray-400">Pre-designed cover templates remain 100% original.</p>
        </div>
      </div>
    </footer>
  );
}
