import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  MessageSquare,
  MoreVertical,
  PhoneOff,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface MeetingControlsProps {
  onToggleSidebar: () => void;
}

const MeetingControls = ({ onToggleSidebar }: MeetingControlsProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEndMeeting = () => {
    toast({
      title: "Meeting ended",
      description: "You have left the meeting",
    });
    navigate("/");
  };

  return (
    <div className="border-t border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* Left controls */}
        <div className="flex items-center gap-2">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>
          <Button
            variant={isVideoOff ? "destructive" : "secondary"}
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </Button>
        </div>

        {/* Center controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full w-12 h-12"
          >
            <MonitorUp className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full w-12 h-12"
          >
            <MessageSquare className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={onToggleSidebar}
          >
            <LayoutDashboard className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full w-12 h-12"
          >
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>

        {/* Right controls */}
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full w-12 h-12"
          onClick={handleEndMeeting}
        >
          <PhoneOff className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default MeetingControls;
