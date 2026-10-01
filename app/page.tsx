import DashboardKeycards from "./components/common/DashboardKeycards";

const DashboardPage = () => {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">Here’s what’s happening</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
          Dashboard overview
        </h1>
      </div>
      <DashboardKeycards />
    </section>
  );
};

export default DashboardPage;
