import {
  FiBriefcase,
  FiCheckCircle,
  FiFolder,
  FiUsers,
} from "react-icons/fi";

const cards = [
  {
    label: "Portfolio projects",
    value: "04",
    detail: "Across all categories",
    icon: FiBriefcase,
    iconClass: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "Active clients",
    value: "04",
    detail: "Client relationships",
    icon: FiUsers,
    iconClass: "bg-sky-50 text-sky-600",
  },
  {
    label: "Categories",
    value: "04",
    detail: "Organizing your work",
    icon: FiFolder,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    label: "Published projects",
    value: "03",
    detail: "Ready to showcase",
    icon: FiCheckCircle,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
];

const DashboardKeycards = () => (
  <section aria-label="Dashboard summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {cards.map(({ label, value, detail, icon: Icon, iconClass }) => (
      <article
        key={label}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              {value}
            </p>
          </div>
          <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}>
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
        </div>
        <p className="mt-4 text-xs text-slate-400">{detail}</p>
      </article>
    ))}
  </section>
);

export default DashboardKeycards;
