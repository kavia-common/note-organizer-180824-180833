"use client";

import React from "react";

/**
 * PUBLIC_INTERFACE
 * Navbar component renders the top navigation with branding and actions.
 */
export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-30 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-blue-100"
      role="banner"
      aria-label="Top Navigation"
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-blue-700 shadow-sm" aria-hidden />
          <span className="text-[15px] sm:text-base font-semibold text-slate-900">
            Ocean Notes
          </span>
        </div>
        <nav className="flex items-center gap-2" aria-label="Quick actions">
          <a
            href="#"
            className="text-xs sm:text-sm text-blue-700 hover:text-blue-800 transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            Docs
          </a>
          <a
            href="#"
            className="text-xs sm:text-sm text-blue-700 hover:text-blue-800 transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            Help
          </a>
        </nav>
      </div>
    </header>
  );
}
