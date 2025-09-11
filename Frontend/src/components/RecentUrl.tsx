import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Copy, ExternalLink, Calendar, MousePointer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UrlData {
  long_url: string;
  short_url: string;
  created_at: string; // ISO string from backend
  clicks?: number; // Add clicks field
}

export const RecentUrls = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const { toast } = useToast();

  // ✅ Fetch recent URLs from backend
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await fetch("http://localhost:5050/recent-urls");
        if (!res.ok) throw new Error("Failed to fetch URLs");
        const data: UrlData[] = await res.json();

        // Sort by created_at (latest first) and take only the last 10
        const sorted = data
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .slice(0, 10);

        setUrls(sorted);
      } catch (err) {
        toast({
          title: "Error",
          description: "Could not fetch recent URLs.",
          variant: "destructive",
        });
      }
    };

    fetchUrls();
  }, [toast]);

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      toast({
        title: "Copied!",
        description: "URL copied to clipboard.",
      });

      setTimeout(() => setCopiedUrl(null), 2000);
    } catch {
      toast({
        title: "Copy Failed",
        description: "Failed to copy URL to clipboard.",
        variant: "destructive",
      });
    }
  };

  if (urls.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent URLs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No URLs shortened yet. Create your first short link above!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Recent URLs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {urls.map((url, index) => (
          <div key={index} className="p-4 bg-muted rounded-lg space-y-3 border-b border-border last:border-b-0">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground break-all">
                {url.long_url}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-mono text-primary">
                  {url.short_url}
                </p>
                <div className="flex space-x-1">
                  <Button
                    onClick={() => handleCopy(url.short_url)}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  >
                    {copiedUrl === url.short_url ? (
                      <span className="text-success">✓</span>
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                  <Button
                    onClick={() => window.open(`http://localhost:5050/r/${url.short_url}`, "_blank")}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(url.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MousePointer className="h-3 w-3" />
                <span className="font-semibold">{url.clicks || 0} clicks</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
