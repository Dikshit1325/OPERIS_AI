import DashboardLayout from "@/components/DashboardLayout";
import { getAlerts } from "@/data/mockData";

export default function Alerts() {
  const alerts = getAlerts();
  const high = alerts.filter(a => a.level === "High");
  const medium = alerts.filter(a => a.level === "Medium");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Alerts</h1>

        {/* High Risk */}
        <div>
          <h2 className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-destructive" /> High Risk ({high.length})
          </h2>
          <div className="space-y-2">
            {high.map(a => (
              <div key={a.employeeId} className="flex items-center justify-between p-4 rounded-xl bg-card border border-destructive/20">
                <div>
                  <p className="text-sm font-medium text-foreground">Employee {a.employeeId} — {a.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">High burnout risk detected</p>
                </div>
                <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive">
                  {a.recommendation}
                </span>
              </div>
            ))}
            {high.length === 0 && <p className="text-sm text-muted-foreground">No high risk alerts</p>}
          </div>
        </div>

        {/* Medium Risk */}
        <div>
          <h2 className="text-sm font-semibold text-warning mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-warning" /> Medium Risk ({medium.length})
          </h2>
          <div className="space-y-2">
            {medium.map(a => (
              <div key={a.employeeId} className="flex items-center justify-between p-4 rounded-xl bg-card border border-warning/20">
                <div>
                  <p className="text-sm font-medium text-foreground">Employee {a.employeeId} — {a.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Moderate burnout risk</p>
                </div>
                <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-warning/10 text-warning">
                  {a.recommendation}
                </span>
              </div>
            ))}
            {medium.length === 0 && <p className="text-sm text-muted-foreground">No medium risk alerts</p>}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
