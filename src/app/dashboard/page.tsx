import DashboardCard from "../../components/DashboardCard";
import MicroFrontend from "../../components/MicroFrontend";

export default function DashboardPage() {
  return (
    <div className="flex-1 max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <DashboardCard title="Active Users" value={1234}>
          Compared to last week: +12%
        </DashboardCard>
        <DashboardCard title="Revenue" value="$24,300">
          Monthly revenue running above target.
        </DashboardCard>
        <DashboardCard title="Errors" value={5}>
          Minor error increase in API.
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MicroFrontend src="/microfrontends/sample.html" title="Analytics Microfrontend" height="480px" />
        <div className="space-y-4">
          <DashboardCard title="Tasks" value={8}>
            Pending tasks assigned to you.
          </DashboardCard>
          <DashboardCard title="Notifications" value={3}>
            New notifications to review.
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
