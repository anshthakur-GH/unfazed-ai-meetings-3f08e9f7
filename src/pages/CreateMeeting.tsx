import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DocumentUpload from "@/components/meeting/DocumentUpload";
import MeetingConfig from "@/components/meeting/MeetingConfig";
import ShareLink from "@/components/meeting/ShareLink";

const CreateMeeting = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [documents, setDocuments] = useState<File[]>([]);
  const [meetingData, setMeetingData] = useState({
    name: "",
    description: "",
    scheduledTime: "",
  });
  const [meetingLink, setMeetingLink] = useState("");

  const handleNext = () => {
    if (step === 2) {
      // Generate meeting link
      const generatedLink = `${window.location.origin}/meeting/${Math.random().toString(36).substr(2, 9)}`;
      setMeetingLink(generatedLink);
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      navigate('/');
    } else {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    setStep(step + 1);
  };

  const canProceed = () => {
    if (step === 1) return true; // Can always skip document upload
    if (step === 2) return meetingData.name.trim() !== "";
    return false;
  };

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            {[
              { num: 1, label: "Documents" },
              { num: 2, label: "Configure" },
              { num: 3, label: "Share" }
            ].map((item, idx) => (
              <div key={item.num} className="flex items-center">
                <div className={`flex flex-col items-center ${idx < 2 ? 'mr-4' : ''}`}>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step > item.num
                        ? "bg-success text-success-foreground"
                        : step === item.num
                        ? "gradient-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > item.num ? <Check className="w-6 h-6" /> : item.num}
                  </div>
                  <span className="text-sm mt-2 font-medium">{item.label}</span>
                </div>
                {idx < 2 && (
                  <div
                    className={`w-24 h-1 mb-6 transition-all ${
                      step > item.num ? "bg-success" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="bg-card rounded-2xl shadow-elegant p-8 animate-scale-in">
            {step === 1 && (
              <DocumentUpload
                documents={documents}
                onDocumentsChange={setDocuments}
              />
            )}
            
            {step === 2 && (
              <MeetingConfig
                data={meetingData}
                onChange={setMeetingData}
              />
            )}
            
            {step === 3 && (
              <ShareLink
                link={meetingLink}
                meetingName={meetingData.name}
              />
            )}

            {/* Action Buttons */}
            <div className="flex justify-between mt-8 pt-8 border-t border-border">
              {step < 3 ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleSkip}
                    disabled={step === 2}
                  >
                    {step === 1 ? "Skip" : ""}
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="gradient-primary gap-2"
                  >
                    {step === 2 ? "Generate Link" : "Next"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => navigate(meetingLink.replace(window.location.origin, ''))}
                  className="gradient-primary w-full gap-2"
                >
                  Join Meeting
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMeeting;
