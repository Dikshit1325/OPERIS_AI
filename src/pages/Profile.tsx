import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { employees } from "@/data/mockData";
import { Flame, TrendingUp, Clock, Calendar } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  // Pick a mock employee matching user's role for demo
  const mockProfile = employees.find(e => e.role === user?.role) || employees[0];

  const streakPercent = Math.min((mockProfile.streak / 14) * 100, 100);
  const burnoutColor = mockProfile.burnoutLevel === "High" ? "text-destructive" : mockProfile.burnoutLevel === "Medium" ? "text-warning" : "text-success";

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>

        {/* User Info */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <span className="inline-block mt-1 text-xs font-medium px-2.5 py-0.5 rounded bg-primary/10 text-primary">{user?.role}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Productivity Score</span>
              </div>
              <p className="text-xl font-bold text-foreground">{mockProfile.productivityScore}</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Burnout Status</span>
              </div>
              <p className={`text-xl font-bold ${burnoutColor}`}>{mockProfile.burnoutLevel}</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Hours/Week</span>
              </div>
              <p className="text-xl font-bold text-foreground">{mockProfile.hoursWorked}h</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="h-4 w-4 text-warning" />
                <span className="text-xs text-muted-foreground">Tasks Completed</span>
              </div>
              <p className="text-xl font-bold text-foreground">{mockProfile.tasksCompleted}</p>
            </div>
          </div>
        </div>

        {/* Productivity Streak */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="h-5 w-5 text-warning" />
            <h3 className="text-sm font-semibold text-foreground">Productivity Streak</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-foreground">{mockProfile.streak}</div>
            <div>
              <p className="text-sm text-foreground font-medium">days of high productivity</p>
              <p className="text-xs text-muted-foreground mt-0.5">Keep it up! Your streak is growing.</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Progress</span>
              <span>{mockProfile.streak}/14 days</span>
            </div>
            <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full bg-warning transition-all" style={{ width: `${streakPercent}%` }} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
