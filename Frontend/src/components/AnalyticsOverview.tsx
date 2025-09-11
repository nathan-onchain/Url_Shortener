import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link, MousePointer, TrendingUp } from "lucide-react";

interface AnalyticsData {
  totalUrls: number;
  totalClicks: number;
  avgClicks: number;
}

export const AnalyticsOverview = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUrls: 0,
    totalClicks: 0,
    avgClicks: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("http://localhost:5050/analytics");
        if (!res.ok) throw new Error("Failed to fetch analytics");
        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Analytics Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Link className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Total URLs</p>
            <p className="text-2xl font-bold">{analytics.totalUrls.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <MousePointer className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Total Clicks</p>
            <p className="text-2xl font-bold">{analytics.totalClicks.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Avg Clicks</p>
            <p className="text-2xl font-bold">{analytics.avgClicks.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
