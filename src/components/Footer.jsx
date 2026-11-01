import { Heart, BookOpen } from "lucide-react";

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

          {/* Copy */}
          <p className="text-xs text-gray-400 text-center flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> for college &amp; university students
          </p>

          {/* Links */}
          <div className="flex items-center gap-5 text-xs text-gray-400">
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">Print-Ready A4</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} CoverCraft. Zero registration needed.</p>
          <p className="text-gray-400">Pre-designed cover templates remain 100% original.</p>
        </div>

        {/* Developer Credit at the very bottom */}
        <p className="mt-4 text-center text-xs text-gray-400 font-medium">
          Created and developed by{" "}
          <a
            href="https://www.linkedin.com/in/shubham-gupta-9a6a7b308/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 font-semibold hover:text-purple-400 hover:underline transition-colors inline-flex items-center gap-1"
          >
            Shubham Gupta
          </a>
        </p>
      </div>
    </footer>
  );
}
