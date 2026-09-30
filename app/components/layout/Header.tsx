"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiBell,
  FiChevronDown,
  FiLogOut,
  FiSettings,
  FiUser,
} from "react-icons/fi";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Overview
        </p>
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
          Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
        >
          <FiBell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-indigo-600" />
        </button>
        <div className="relative">
          <button
            type="button"
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
            onClick={() => setIsProfileOpen((open) => !open)}
            className="flex items-center gap-3 rounded-xl p-1.5 pr-2 text-left transition hover:bg-slate-50"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
              JD
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold text-slate-900">
                John Doe
              </span>
              <span className="block text-xs text-slate-400">
                Administrator
              </span>
            </span>
            <FiChevronDown className="h-4 w-4" />
          </button>
          {isProfileOpen && (
            <div
              role="menu"
              className="absolute right-0 top-14 z-20 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60"
            >
              <div className="border-b border-slate-100 px-3 py-2.5">
                <p className="text-sm font-semibold text-slate-900">John Doe</p>
                <p className="truncate text-xs text-slate-400">
                  john@domaindude.com
                </p>
              </div>
              <Link
                href="/profile"
                role="menuitem"
                className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              >
                <FiUser />
                My profile
              </Link>
              <Link
                href="/settings"
                role="menuitem"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              >
                <FiSettings />
                Settings
              </Link>
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50"
              >
                <FiLogOut />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
