import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link, Zap } from "lucide-react";
import { useToast } from "../hooks/use-toast";

interface UrlInputProps {
  onUrlShorten: (url: string) => void;
}

export const UrlInput = ({ onUrlShorten }: UrlInputProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
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
    
    // Simulate API call delay
    setTimeout(() => {
      onUrlShorten(url);
      setUrl("");
      setIsLoading(false);
      toast({
        title: "URL Shortened!",
        description: "Your short link is ready to use.",
        variant: "default",
      });
    }, 1000);
  };

  return (
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
  );
};