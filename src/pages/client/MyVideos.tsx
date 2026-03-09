import React from "react";
import { usePlan } from "@/contexts/PlanContext";

const MyVideos: React.FC = () => {
  const { planFeatures } = usePlan();

  return (
    <div className="max-w-7xl mx-auto space-y-4 px-1 sm:px-0 h-[calc(100vh-6rem)]">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold">Videos</h1>
        <p className="text-muted-foreground mt-1">
          Browse Canva's video library — search, preview, and download what you need.
        </p>
      </div>
      <div className="flex-1 rounded-xl overflow-hidden border border-border" style={{ height: "calc(100% - 5rem)" }}>
        <iframe
          src="https://www.canva.com/videos/"
          title="Canva Video Library"
          className="w-full h-full"
          allow="clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

export default MyVideos;
