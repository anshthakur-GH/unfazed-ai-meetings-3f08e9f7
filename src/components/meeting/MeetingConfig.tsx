import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface MeetingConfigProps {
  data: {
    name: string;
    description: string;
    scheduledTime: string;
  };
  onChange: (data: any) => void;
}

const MeetingConfig = ({ data, onChange }: MeetingConfigProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Configure Your Meeting</h2>
        <p className="text-muted-foreground text-lg">
          Set up the details for your meeting
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base font-medium">
            Meeting Name *
          </Label>
          <Input
            id="name"
            placeholder="e.g., Team Strategy Session"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            className="text-base py-6"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-base font-medium">
            Description (Optional)
          </Label>
          <Textarea
            id="description"
            placeholder="Briefly describe the meeting agenda and goals..."
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            rows={4}
            className="text-base resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="scheduled-time" className="text-base font-medium">
            Scheduled Time (Optional)
          </Label>
          <Input
            id="scheduled-time"
            type="datetime-local"
            value={data.scheduledTime}
            onChange={(e) => onChange({ ...data, scheduledTime: e.target.value })}
            className="text-base py-6"
          />
          <p className="text-sm text-muted-foreground">
            Leave empty for instant meetings
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeetingConfig;
