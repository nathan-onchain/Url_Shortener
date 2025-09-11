import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { UrlInput } from "./UrlInput";
import { ShortenedUrl } from "./Shortened";
import { RecentUrls } from "./RecentUrl";

export const UrlShortener = () => {
  const [shortened, setShortened] = useState<{
    long_url: string;
    short_url: string;
    created_at: string;
  } | null>(null);

  return (
    <div className="space-y-8">
      {/* URL Shortening Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Shorten Your URL</CardTitle>
        </CardHeader>
        <CardContent>
          <UrlInput onShortened={setShortened} />
          {shortened && <ShortenedUrl data={shortened} />}
        </CardContent>
      </Card>
      
      {/* Recent URLs Card */}
      <RecentUrls />
    </div>
  );
};
