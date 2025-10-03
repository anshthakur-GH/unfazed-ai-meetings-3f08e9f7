import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareLinkProps {
  link: string;
  meetingName: string;
}

const ShareLink = ({ link, meetingName }: ShareLinkProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Meeting link has been copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <Check className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-3xl font-bold mb-3">Meeting Created!</h2>
        <p className="text-muted-foreground text-lg">
          Share this link with participants to join <strong>{meetingName}</strong>
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={link}
            readOnly
            className="text-base py-6 font-mono"
          />
          <Button
            onClick={copyToClipboard}
            className="gradient-primary min-w-[120px]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              window.location.href = `mailto:?subject=Join my meeting: ${meetingName}&body=Join the meeting here: ${link}`;
            }}
          >
            <Mail className="w-4 h-4" />
            Email
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              const text = `Join my meeting: ${meetingName}\n${link}`;
              if (navigator.share) {
                navigator.share({ text });
              }
            }}
          >
            <MessageSquare className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="bg-muted/50 rounded-xl p-6 space-y-3">
        <h3 className="font-semibold text-lg">Meeting Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Participants can join anytime using this link</li>
          <li>• AI dashboard will analyze comments in real-time</li>
          <li>• Important questions will be automatically highlighted</li>
          <li>• Meeting recordings available after the session</li>
        </ul>
      </div>
    </div>
  );
};

export default ShareLink;
