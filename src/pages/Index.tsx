import { Button } from "@/components/ui/button";
import { Video, Upload, Users, Zap, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Video className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Unfazed
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-hero py-20 md:py-32 animate-fade-in">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              AI-Powered Meetings
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                That Actually Matter
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Smart video conferencing with real-time AI insights. Upload documents, meet seamlessly, 
              and never miss important questions again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                size="lg" 
                className="gradient-primary text-lg px-8 py-6 rounded-xl shadow-elegant hover:scale-105 transition-transform"
                onClick={() => navigate('/create')}
              >
                <Video className="w-5 h-5 mr-2" />
                Create Meeting
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-secondary"
              >
                Join Meeting
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful features designed for modern collaboration
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "AI-Powered Insights",
                description: "Automatically detect and prioritize important questions and comments in real-time"
              },
              {
                icon: Upload,
                title: "Document Upload",
                description: "Share documents before meetings. Reference materials instantly during discussions"
              },
              {
                icon: Users,
                title: "Seamless Collaboration",
                description: "Crystal-clear video, screen sharing, and real-time chat for effective teamwork"
              },
              {
                icon: Clock,
                title: "Real-Time Analytics",
                description: "Live dashboard showing meeting stats, active queries, and participant insights"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "End-to-end encryption and secure meeting links keep your conversations private"
              },
              {
                icon: Video,
                title: "HD Quality",
                description: "Professional-grade video and audio quality for distraction-free meetings"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-8 rounded-2xl bg-card border border-border hover:shadow-elegant transition-all hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple Three-Step Process
            </h2>
            <p className="text-xl text-muted-foreground">
              From creation to collaboration in minutes
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {[
              {
                step: "01",
                title: "Create & Configure",
                description: "Start a new meeting, optionally upload documents, and set your meeting details"
              },
              {
                step: "02",
                title: "Share & Invite",
                description: "Get a shareable link and invite participants with a single click"
              },
              {
                step: "03",
                title: "Meet & Analyze",
                description: "Join your meeting room with AI-powered insights showing important queries in real-time"
              }
            ].map((step, index) => (
              <div key={index} className="flex gap-8 items-start">
                <div className="text-6xl font-bold text-primary/20 min-w-[100px]">
                  {step.step}
                </div>
                <div className="flex-1 p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-lg text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button 
              size="lg"
              className="gradient-primary text-lg px-8 py-6 rounded-xl shadow-elegant hover:scale-105 transition-transform"
              onClick={() => navigate('/create')}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2025 Unfazed. Making meetings matter.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
