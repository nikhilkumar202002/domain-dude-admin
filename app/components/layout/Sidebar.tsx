import Link from "next/link";
import Image from "next/image";
import { FiBriefcase, FiFolder, FiGrid, FiLayers, FiSettings } from "react-icons/fi";

type Icon = typeof FiGrid;

const navigation: { label: string; href: string; icon: Icon; active?: boolean }[] = [
  { label: "Dashboard", href: "/", icon: FiGrid, active: true },
  { label: "Category", href: "/category", icon: FiFolder },
  { label: "Portfolio", href: "/portfolio", icon: FiBriefcase },
  { label: "Service", href: "/service", icon: FiLayers },
];

const Sidebar = () => (
  <aside className="fixed inset-y-0 left-0 z-30 flex w-68 flex-col overflow-y-auto border-r border-slate-200 bg-white px-5 py-7 text-slate-600">
    <Link href="/" className="mb-14 flex items-center gap-3 px-2" aria-label="Domain Dude home">
      <Image
        src="/Domine-Dude_black.png"
        alt="Domain Dude"
        width={205}
        height={64}
        priority
        className="h-auto w-full max-w-[150px] shrink-0 object-contain object-left"
      />
    </Link>
    <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Workspace</p>
    <nav className="space-y-1.5" aria-label="Main navigation">
      {navigation.map(({ label, href, icon: Icon, active }) => <Link key={label} href={href} className={`group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors ${active ? "bg-indigo-50 text-indigo-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"}`}><Icon className={`h-5 w-5 ${active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-700"}`} />{label}{active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600" />}</Link>)}
    </nav>
    <div className="mt-auto border-t border-slate-100 pt-5">
      <Link href="/settings" className="group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-950"><FiSettings className="h-5 w-5 text-slate-400 group-hover:text-slate-700" />Settings</Link>
      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-50 p-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">JD</div><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900">John Doe</p><p className="truncate text-xs text-slate-400">Administrator</p></div><span className="ml-auto h-2 w-2 rounded-full bg-emerald-500" /></div>
    </div>
  </aside>
);

export default Sidebar;
