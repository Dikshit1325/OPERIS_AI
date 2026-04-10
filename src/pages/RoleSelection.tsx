import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { Role } from "@/data/mockData";
import { Code2, Layers, Brain, Database } from "lucide-react";

const roles: { role: Role; icon: typeof Code2; desc: string }[] = [
  { role: "SDE", icon: Code2, desc: "Software Development Engineer" },
  { role: "Full Stack Engineer", icon: Layers, desc: "End-to-end development" },
  { role: "AI/ML Engineer", icon: Brain, desc: "Machine learning & AI systems" },
  { role: "Data Engineer", icon: Database, desc: "Data pipelines & infrastructure" },
];

export default function RoleSelection() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const mode = params.get("mode") || "login";
  const { setSelectedRole } = useAuth();

  const handleSelect = (role: Role) => {
    setSelectedRole(role);
    navigate(mode === "signup" ? "/signup" : "/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <span className="text-2xl font-bold text-foreground tracking-tight">Operis</span>
          <h2 className="mt-4 text-xl font-semibold text-foreground">Select your role</h2>
          <p className="mt-2 text-sm text-muted-foreground">Choose the role that best describes your position</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {roles.map((r) => (
            <button
              key={r.role}
              onClick={() => handleSelect(r.role)}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <r.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-foreground text-sm">{r.role}</h3>
              <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
