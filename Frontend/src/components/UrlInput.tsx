import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShortenedUrlResponse {
  long_url: string;
  short_url: string;
  created_at: string;
}

export const UrlInput = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a URL to shorten.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (including http:// or https://)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/shorten_url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ long_url: url }),
      });

      if (!res.ok) throw new Error("Failed to shorten URL");

      const data: ShortenedUrlResponse = await res.json();

      setShortenedUrl(data.short_url);
      setUrl("");
      toast({
        title: "URL Shortened!",
        description: "Your short link is ready below.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong while shortening the URL.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="url"
            placeholder="Enter your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-12 h-14 text-lg bg-input border-border focus:ring-primary"
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          className="w-full h-14 text-lg bg-gradient-primary hover:shadow-glow transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Shortening...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Shorten URL</span>
            </div>
          )}
        </Button>
      </form>

      {shortenedUrl && (
        <div className="p-4 rounded-lg bg-muted text-center">
          <p className="text-sm text-muted-foreground">Your short link:</p>
          <a
            href={shortenedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-mono text-primary hover:underline"
          >
            {shortenedUrl}
          </a>
        </div>
      )}
    </div>
  );
};
