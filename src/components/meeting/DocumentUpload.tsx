import { useCallback } from "react";
import { Upload, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploadProps {
  documents: File[];
  onDocumentsChange: (files: File[]) => void;
}

const DocumentUpload = ({ documents, onDocumentsChange }: DocumentUploadProps) => {
  const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      const isValid = file.size <= 10 * 1024 * 1024; // 10MB limit
      if (!isValid) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 10MB limit`,
          variant: "destructive",
        });
      }
      return isValid;
    });
    onDocumentsChange([...documents, ...validFiles]);
  }, [documents, onDocumentsChange, toast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const removeFile = (index: number) => {
    onDocumentsChange(documents.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3">Upload Documents (Optional)</h2>
        <p className="text-muted-foreground text-lg">
          Share materials that participants can reference during the meeting
        </p>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer bg-muted/20"
      >
        <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg font-medium mb-2">Drag and drop files here</p>
        <p className="text-sm text-muted-foreground mb-4">
          or click to browse (max 10MB per file)
        </p>
        <Button variant="outline" onClick={() => document.getElementById('file-input')?.click()}>
          Choose Files
        </Button>
        <input
          id="file-input"
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              const files = Array.from(e.target.files);
              onDocumentsChange([...documents, ...files]);
            }
          }}
        />
      </div>

      {documents.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Uploaded Documents ({documents.length})</h3>
          {documents.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-secondary rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFile(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
