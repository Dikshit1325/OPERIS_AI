import { useNavigate } from "react-router-dom";
import { BarChart3, Shield, Zap, ArrowRight } from "lucide-react";

const features = [
  { icon: BarChart3, title: "Real-time Analytics", desc: "Track productivity metrics across your entire organization" },
  { icon: Shield, title: "Burnout Detection", desc: "AI-powered risk assessment to protect employee wellbeing" },
  { icon: Zap, title: "Actionable Insights", desc: "Data-driven recommendations to optimize team performance" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-border">
        <span className="text-xl font-bold tracking-tight text-foreground">Operis</span>
        <div className="flex gap-3">
          <button onClick={() => navigate("/role-select?mode=login")} className="px-5 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-secondary transition-colors">
            Login
          </button>
          <button onClick={() => navigate("/role-select?mode=signup")} className="px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
          <Zap className="h-3 w-3" /> AI-Powered Workforce Analytics
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight max-w-3xl leading-tight">
          Measure impact,<br />
          <span className="text-primary">not just activity</span>
        </h1>
        <p className="mt-6 text-muted-foreground text-lg max-w-xl">
          Enterprise-grade workforce analytics that helps you understand productivity, prevent burnout, and drive meaningful outcomes.
        </p>
        <div className="mt-10 flex gap-4">
          <button onClick={() => navigate("/role-select?mode=signup")} className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            Get Started <ArrowRight className="h-4 w-4" />
          </button>
          <button onClick={() => navigate("/role-select?mode=login")} className="px-8 py-3 border border-border rounded-lg font-medium text-foreground hover:bg-secondary transition-colors">
            Login
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 pb-24">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-xl bg-card border border-border">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-foreground font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
