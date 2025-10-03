import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoGrid from "@/components/meeting/VideoGrid";
import MeetingControls from "@/components/meeting/MeetingControls";
import DashboardSidebar from "@/components/meeting/DashboardSidebar";
import { Video } from "lucide-react";

const MeetingRoom = () => {
  const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [meetingStartTime] = useState(new Date());
  const [participants] = useState(3); // Mock participant count

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Video className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">Team Strategy Meeting</h1>
            <p className="text-sm text-muted-foreground">Meeting ID: {id}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {participants} participants
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area */}
        <div className={`flex-1 flex flex-col transition-all ${isSidebarOpen ? 'mr-0' : ''}`}>
          <VideoGrid />
          <MeetingControls onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>

        {/* Dashboard Sidebar */}
        {isSidebarOpen && (
          <DashboardSidebar
            meetingStartTime={meetingStartTime}
            participants={participants}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MeetingRoom;
