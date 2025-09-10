import { useState } from "react";
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
    <div className="space-y-6">
      <UrlInput onShortened={setShortened} />
      {shortened && <ShortenedUrl data={shortened} />}
      <RecentUrls />
    </div>
  );
};
