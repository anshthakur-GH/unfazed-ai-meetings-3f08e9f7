import { useState, useEffect } from "react";
import { X, AlertCircle, MessageCircle, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardSidebarProps {
  meetingStartTime: Date;
  participants: number;
  onClose: () => void;
}

// Mock data for important comments
const mockComments = [
  {
    id: 1,
    author: "Alex Chen",
    text: "What's our timeline for the Q2 deliverables?",
    type: "question",
    timestamp: new Date(Date.now() - 5 * 60000),
    priority: "high",
  },
  {
    id: 2,
    author: "Sarah Miller",
    text: "URGENT: We need to address the API integration issues before Friday",
    type: "action",
    timestamp: new Date(Date.now() - 3 * 60000),
    priority: "urgent",
  },
  {
    id: 3,
    author: "John Doe",
    text: "Can someone clarify the budget allocation for the new feature?",
    type: "question",
    timestamp: new Date(Date.now() - 2 * 60000),
    priority: "high",
  },
  {
    id: 4,
    author: "Emily Zhang",
    text: "Important: The stakeholder meeting needs to be rescheduled",
    type: "feedback",
    timestamp: new Date(Date.now() - 1 * 60000),
    priority: "high",
  },
];

const DashboardSidebar = ({ meetingStartTime, participants, onClose }: DashboardSidebarProps) => {
  const [duration, setDuration] = useState("");
  const [importantCount, setImportantCount] = useState(mockComments.length);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - meetingStartTime.getTime();
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [meetingStartTime]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "question": return "bg-primary/10 text-primary border-primary/20";
      case "action": return "bg-destructive/10 text-destructive border-destructive/20";
      case "feedback": return "bg-accent/10 text-accent border-accent/20";
      default: return "bg-muted text-muted-foreground border-muted";
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === "urgent") {
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
    return null;
  };

  return (
    <div className="w-96 border-l border-border bg-sidebar flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">AI Dashboard</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-lg p-3 border border-border">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Duration</span>
            </div>
            <p className="text-xl font-bold">{duration}</p>
          </div>
          <div className="bg-card rounded-lg p-3 border border-border">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Active</span>
            </div>
            <p className="text-xl font-bold">{participants}</p>
          </div>
        </div>
      </div>

      {/* Important Comments Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Important Queries</h3>
          </div>
          <Badge className="gradient-primary">{importantCount}</Badge>
        </div>
      </div>

      {/* Comments List */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-4">
          {mockComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-card rounded-lg p-4 border border-border space-y-3 animate-slide-up hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-medium text-sm">{comment.author}</span>
                <div className="flex items-center gap-1">
                  {getPriorityIcon(comment.priority)}
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed">{comment.text}</p>
              <Badge variant="outline" className={`text-xs ${getTypeColor(comment.type)}`}>
                {comment.type}
              </Badge>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* AI Status Indicator */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>AI analyzing comments in real-time</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
