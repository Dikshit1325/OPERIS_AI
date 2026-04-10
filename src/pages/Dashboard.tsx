import { employees, getKPIs, getBurnoutDistribution, productivityTrend, getAlerts } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { TrendingUp, AlertTriangle, Clock, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import DashboardLayout from "@/components/DashboardLayout";

const BURNOUT_COLORS = { Low: "#22C55E", Medium: "#F59E0B", High: "#EF4444" };

function KPICard({ icon: Icon, label, value, color }: { icon: typeof TrendingUp; label: string; value: string | number; color?: string }) {
  return (
    <div className="p-5 rounded-xl bg-card border border-border">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4.5 w-4.5 text-primary" style={color ? { color } : {}} />
        </div>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}

function BurnoutBadge({ level }: { level: string }) {
  const cls = level === "High" ? "bg-destructive/10 text-destructive" : level === "Medium" ? "bg-warning/10 text-warning" : "bg-success/10 text-success";
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${cls}`}>{level}</span>;
}

export default function Dashboard() {
  const { user } = useAuth();
  const kpis = getKPIs();
  const burnoutDist = getBurnoutDistribution();
  const alerts = getAlerts().filter(a => a.level === "High").slice(0, 5);
  const roleEmployees = user?.role ? employees.filter(e => e.role === user.role) : employees;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back, {user?.name}</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard icon={TrendingUp} label="Avg Productivity" value={kpis.avgProd} />
          <KPICard icon={AlertTriangle} label="High Burnout Risk" value={kpis.highBurnout} color="#EF4444" />
          <KPICard icon={Clock} label="Avg Working Hours" value={`${kpis.avgHours}h`} />
          <KPICard icon={Users} label="Total Employees" value={kpis.totalEmployees} />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-card border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4">Productivity Trend</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={productivityTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,17%,20%)" />
                <XAxis dataKey="week" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#1F2937', border: '1px solid #374151', borderRadius: 8, color: '#E5E7EB' }} />
                <Line type="monotone" dataKey="sde" stroke="#3B82F6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="fullstack" stroke="#22C55E" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="aiml" stroke="#F59E0B" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="data" stroke="#EF4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-3 justify-center">
              {[["SDE","#3B82F6"],["Full Stack","#22C55E"],["AI/ML","#F59E0B"],["Data","#EF4444"]].map(([l,c]) => (
                <div key={l} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="h-2 w-2 rounded-full" style={{ background: c }} />{l}
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-card border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4">Burnout Distribution</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={burnoutDist} dataKey="count" nameKey="level" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={4}>
                  {burnoutDist.map((entry) => (
                    <Cell key={entry.level} fill={BURNOUT_COLORS[entry.level as keyof typeof BURNOUT_COLORS]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#1F2937', border: '1px solid #374151', borderRadius: 8, color: '#E5E7EB' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-3 justify-center">
              {burnoutDist.map(b => (
                <div key={b.level} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="h-2 w-2 rounded-full" style={{ background: BURNOUT_COLORS[b.level as keyof typeof BURNOUT_COLORS] }} />
                  {b.level}: {b.count}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="p-5 rounded-xl bg-card border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">⚠ High Risk Alerts</h3>
            <div className="space-y-2">
              {alerts.map(a => (
                <div key={a.employeeId} className="flex items-center justify-between py-2 px-3 rounded-lg bg-destructive/5 border border-destructive/10">
                  <span className="text-sm text-foreground">Employee {a.employeeId} — <span className="text-muted-foreground">{a.name}</span></span>
                  <span className="text-xs text-destructive font-medium">High burnout risk</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Employee Table */}
        <div className="p-5 rounded-xl bg-card border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            {user?.role ? `${user.role} Employees` : "All Employees"}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
                  <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                  <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Productivity</th>
                  <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Burnout Risk</th>
                </tr>
              </thead>
              <tbody>
                {roleEmployees.slice(0, 10).map(emp => (
                  <tr key={emp.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-2.5 px-3 text-foreground">{emp.id}</td>
                    <td className="py-2.5 px-3 text-foreground">{emp.name}</td>
                    <td className="py-2.5 px-3 text-foreground">{emp.productivityScore}</td>
                    <td className="py-2.5 px-3"><BurnoutBadge level={emp.burnoutLevel} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
