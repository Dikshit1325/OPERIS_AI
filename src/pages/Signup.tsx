import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Signup() {
  const { signup, selectedRole } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!selectedRole) {
    navigate("/role-select?mode=signup");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError("All fields required"); return; }
    signup(email, password, name);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-foreground tracking-tight">Operis</span>
          <h2 className="mt-4 text-lg font-semibold text-foreground">Create your account</h2>
          <p className="mt-1 text-sm text-muted-foreground">Joining as <span className="text-primary font-medium">{selectedRole}</span></p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-xs text-destructive text-center">{error}</p>}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="John Doe" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="you@company.com" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
            Create Account
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Already have an account? <button onClick={() => navigate("/role-select?mode=login")} className="text-primary hover:underline">Login</button>
        </p>
      </div>
    </div>
  );
}
