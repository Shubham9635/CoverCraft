import { BookOpen } from "lucide-react";

const navLinks = ["Home", "Templates", "About"];

export default function Header({ onNavClick }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavClick?.("home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-purple-600 transition-colors">
            Cover<span className="text-purple-600">Craft</span>
          </span>
        </button>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => onNavClick?.(link.toLowerCase())}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
            >
              {link}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => onNavClick?.("templates")}
          className="hidden sm:flex px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
        >
          Get Started
        </button>
      </div>
    </header>
  );
}

