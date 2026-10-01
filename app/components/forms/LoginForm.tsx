"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Domain Dude home">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white shadow-lg shadow-indigo-200">
              D
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-950">
              DOMAIN DUDE
            </span>
          </Link>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-9">
          <div className="mb-8">
            <p className="text-sm font-semibold text-indigo-600">Welcome back</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              Sign in to your account
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enter your details to access your dashboard.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-700">Email address</span>
              <span className="relative block">
                <FiMail aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  autoComplete="email"
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </span>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-700">Password</span>
              <span className="relative block">
                <FiLock aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-indigo-500"
                >
                  {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </span>
            </label>

            <div className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  name="remember"
                  className="h-4 w-4 rounded border-slate-300 accent-indigo-600 focus:ring-indigo-500"
                />
                Remember me
              </label>
              <a href="mailto:support@domaindude.com?subject=Password%20reset" className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
              <FiArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </form>
        </section>

        <p className="mt-6 text-center text-xs text-slate-400">
          Secure access to your Domain Dude admin panel
        </p>
      </div>
    </main>
  );
};

export default LoginForm;
