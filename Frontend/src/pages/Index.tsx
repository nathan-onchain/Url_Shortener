import { Header } from "@/components/Header";
import { UrlShortener } from "@/components/UrlShortener";
import { AnalyticsOverview } from "@/components/AnalyticsOverview";
import { TopPerformer } from "@/components/TopPerformer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Left Column */}
          <div className="space-y-8">
            <UrlShortener />
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            <AnalyticsOverview />
            <TopPerformer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;