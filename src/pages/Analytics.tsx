import DashboardLayout from "@/components/DashboardLayout";
import { productivityTrend, meetingVsProductivity, getBurnoutDistribution } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, Cell } from "recharts";

const COLORS = { SDE: "#3B82F6", "Full Stack Engineer": "#22C55E", "AI/ML Engineer": "#F59E0B", "Data Engineer": "#EF4444" };
const BURNOUT_COLORS = { Low: "#22C55E", Medium: "#F59E0B", High: "#EF4444" };

export default function Analytics() {
  const burnout = getBurnoutDistribution();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>

        {/* Productivity Trends */}
        <div className="p-5 rounded-xl bg-card border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4">Productivity Trends by Role</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productivityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,17%,20%)" />
              <XAxis dataKey="week" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#1F2937', border: '1px solid #374151', borderRadius: 8, color: '#E5E7EB' }} />
              <Line type="monotone" dataKey="sde" name="SDE" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="fullstack" name="Full Stack" stroke="#22C55E" strokeWidth={2} />
              <Line type="monotone" dataKey="aiml" name="AI/ML" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="data" name="Data Eng" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3 justify-center">
            {Object.entries(COLORS).map(([k,v]) => (
              <div key={k} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full" style={{ background: v }} />{k}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Meeting Load vs Productivity */}
          <div className="p-5 rounded-xl bg-card border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4">Meeting Load vs Productivity</h3>
            <ResponsiveContainer width="100%" height={260}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,17%,20%)" />
                <XAxis dataKey="meetings" name="Meetings" tick={{ fill: '#9CA3AF', fontSize: 12 }} label={{ value: "Meetings/week", position: "bottom", fill: '#9CA3AF', fontSize: 11 }} />
                <YAxis dataKey="productivity" name="Productivity" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#1F2937', border: '1px solid #374151', borderRadius: 8, color: '#E5E7EB' }} />
                <Scatter data={meetingVsProductivity}>
                  {meetingVsProductivity.map((entry, i) => (
                    <Cell key={i} fill={COLORS[entry.role as keyof typeof COLORS] || "#3B82F6"} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Burnout by Level */}
          <div className="p-5 rounded-xl bg-card border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4">Burnout Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={burnout}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,17%,20%)" />
                <XAxis dataKey="level" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#1F2937', border: '1px solid #374151', borderRadius: 8, color: '#E5E7EB' }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {burnout.map(b => (
                    <Cell key={b.level} fill={BURNOUT_COLORS[b.level as keyof typeof BURNOUT_COLORS]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
