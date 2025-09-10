// UrlInput.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UrlInputProps {
  onShortened: (data: { long_url: string; short_url: string; created_at: string }) => void;
}

export const UrlInput = ({ onShortened }: UrlInputProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a URL.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5050/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url }),
      });

      if (!res.ok) throw new Error("Failed to shorten URL");

      const data = await res.json(); // { long_url, short_url, created_at }
      onShortened(data); // pass response up
      setUrl("");

      toast({
        title: "Success",
        description: "Your URL was shortened!",
      });
    } catch {
      toast({
        title: "Error",
        description: "Could not shorten URL.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
        <Input
          type="url"
          placeholder="Enter your long URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
          className="pl-12 h-14"
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full h-14">
        {isLoading ? "Shortening..." : "Shorten URL"}
      </Button>
    </form>
  );
};
