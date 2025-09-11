import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MousePointer } from "lucide-react";

interface TopPerformerData {
  long_url: string;
  short_url: string;
  clicks: number;
}

export const TopPerformer = () => {
  const [topPerformer, setTopPerformer] = useState<TopPerformerData | null>(null);

  useEffect(() => {
    const fetchTopPerformer = async () => {
      try {
        const res = await fetch("http://localhost:5050/top-performer");
        if (!res.ok) throw new Error("Failed to fetch top performer");
        const data = await res.json();
        setTopPerformer(data);
      } catch (err) {
        console.error("Failed to fetch top performer:", err);
      }
    };

    fetchTopPerformer();
  }, []);

  if (!topPerformer) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Top Performer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            No data available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Top Performer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground break-all">
            {topPerformer.long_url}
          </p>
          <p className="text-sm font-mono text-primary">
            {topPerformer.short_url}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <MousePointer className="h-4 w-4 text-success" />
          <span className="text-lg font-bold text-success">
            {topPerformer.clicks.toLocaleString()} clicks
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
