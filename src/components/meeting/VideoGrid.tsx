import { Video, Mic, MicOff } from "lucide-react";

const VideoGrid = () => {
  // Mock participants data
  const participants = [
    { id: 1, name: "You", muted: false, video: true },
    { id: 2, name: "Alex Chen", muted: false, video: true },
    { id: 3, name: "Sarah Miller", muted: true, video: true },
  ];

  return (
    <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
      {participants.map((participant) => (
        <div
          key={participant.id}
          className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border border-border group"
        >
          {/* Mock video placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/30 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary-foreground">
                {participant.name.charAt(0)}
              </span>
            </div>
          </div>

          {/* Participant info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">{participant.name}</span>
              <div className="flex items-center gap-2">
                {participant.muted ? (
                  <MicOff className="w-4 h-4 text-destructive" />
                ) : (
                  <Mic className="w-4 h-4 text-success" />
                )}
              </div>
            </div>
          </div>

          {/* Video indicator */}
          {participant.video && (
            <div className="absolute top-3 right-3 bg-black/40 rounded-lg px-2 py-1">
              <Video className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
