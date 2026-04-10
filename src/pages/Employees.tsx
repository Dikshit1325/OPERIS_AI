import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { employees } from "@/data/mockData";
import type { Role, BurnoutLevel } from "@/data/mockData";
import { Search, X } from "lucide-react";

function BurnoutBadge({ level }: { level: string }) {
  const cls = level === "High" ? "bg-destructive/10 text-destructive" : level === "Medium" ? "bg-warning/10 text-warning" : "bg-success/10 text-success";
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${cls}`}>{level}</span>;
}

export default function Employees() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "">("");
  const [burnoutFilter, setBurnoutFilter] = useState<BurnoutLevel | "">("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = employees.filter(e => {
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !String(e.id).includes(search)) return false;
    if (roleFilter && e.role !== roleFilter) return false;
    if (burnoutFilter && e.burnoutLevel !== burnoutFilter) return false;
    return true;
  });

  const selected = selectedId ? employees.find(e => e.id === selectedId) : null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Employees</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or ID..." className="w-full pl-9 pr-3 py-2 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value as Role | "")} className="px-3 py-2 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option value="">All Roles</option>
            <option>SDE</option>
            <option>Full Stack Engineer</option>
            <option>AI/ML Engineer</option>
            <option>Data Engineer</option>
          </select>
          <select value={burnoutFilter} onChange={e => setBurnoutFilter(e.target.value as BurnoutLevel | "")} className="px-3 py-2 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option value="">All Risk Levels</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="flex gap-6">
          {/* Table */}
          <div className="flex-1 rounded-xl bg-card border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Productivity</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Burnout</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(emp => (
                  <tr key={emp.id} onClick={() => setSelectedId(emp.id)} className={`border-b border-border/50 cursor-pointer transition-colors ${selectedId === emp.id ? 'bg-primary/5' : 'hover:bg-secondary/30'}`}>
                    <td className="py-3 px-4 text-foreground">{emp.id}</td>
                    <td className="py-3 px-4 text-foreground">{emp.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{emp.role}</td>
                    <td className="py-3 px-4 text-foreground">{emp.productivityScore}</td>
                    <td className="py-3 px-4"><BurnoutBadge level={emp.burnoutLevel} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detail Panel */}
          {selected && (
            <div className="w-80 shrink-0 p-5 rounded-xl bg-card border border-border">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-foreground">{selected.name}</h3>
                <button onClick={() => setSelectedId(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">ID</span><span className="text-foreground">{selected.id}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Role</span><span className="text-foreground">{selected.role}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Productivity</span><span className="text-foreground">{selected.productivityScore}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Hours/week</span><span className="text-foreground">{selected.hoursWorked}h</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tasks Done</span><span className="text-foreground">{selected.tasksCompleted}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Meetings</span><span className="text-foreground">{selected.meetingCount}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Burnout</span><BurnoutBadge level={selected.burnoutLevel} /></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Streak</span><span className="text-foreground">{selected.streak} days</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
