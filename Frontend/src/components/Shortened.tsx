// ShortenedUrl.tsx
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useToast } from "../hooks/use-toast";

interface ShortenedUrlData {
  long_url: string;
  short_url: string;
  created_at: string;
}

interface ShortenedUrlProps {
  data: ShortenedUrlData;
}

export const ShortenedUrl = ({ data }: ShortenedUrlProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.short_url);
      setCopied(true);
      toast({ title: "Copied!", description: "Short URL copied to clipboard." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Copy Failed",
        description: "Could not copy URL.",
        variant: "destructive",
      });
    }
  };

  const handleVisit = () => window.open(`http://localhost:5050/r/${data.short_url}`, "_blank");

  return (
    <div className="space-y-4 p-6 bg-gradient-card rounded-lg border border-border shadow-glow">
      <h3 className="text-lg font-semibold text-success">Your shortened URL is ready 🎉</h3>
      <p className="text-sm text-muted-foreground">
        Original: <span className="break-all">{data.long_url}</span>
      </p>

      <div className="flex space-x-2">
        <Input value={data.short_url} readOnly className="flex-1 font-mono" />
        <Button onClick={handleCopy} variant="outline" size="icon">
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
        </Button>
        <Button onClick={handleVisit} variant="outline" size="icon">
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Created: {new Date(data.created_at).toLocaleString()}
      </p>
    </div>
  );
};
