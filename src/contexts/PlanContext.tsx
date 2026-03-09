import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type PlanName =
  | "Entry Level Pass"
  | "Visual Starter Kit"
  | "Viral Growth"
  | "Full Brand Manager"
  | "Done For You"
  | "Master Production"
  | null;

export interface PlanFeatures {
  hasImageUpload: boolean;
  hasTemplates: boolean;
  templateCount: number;
  hasShortFormVideo: boolean;
  videoCount: number;
  hasUGC: boolean;
  ugcCount: number;
  hasManagedPosting: boolean;
  hasStrategySessions: boolean;
  strategyFrequency: string | null;
}

const FEATURE_MATRIX: Record<Exclude<PlanName, null>, PlanFeatures> = {
  "Entry Level Pass": {
    hasImageUpload: true, hasTemplates: false, templateCount: 0,
    hasShortFormVideo: false, videoCount: 0, hasUGC: false, ugcCount: 0,
    hasManagedPosting: false, hasStrategySessions: false, strategyFrequency: null,
  },
  "Visual Starter Kit": {
    hasImageUpload: true, hasTemplates: true, templateCount: 10,
    hasShortFormVideo: false, videoCount: 0, hasUGC: false, ugcCount: 0,
    hasManagedPosting: false, hasStrategySessions: false, strategyFrequency: null,
  },
  "Viral Growth": {
    hasImageUpload: true, hasTemplates: true, templateCount: 15,
    hasShortFormVideo: true, videoCount: 1, hasUGC: false, ugcCount: 0,
    hasManagedPosting: false, hasStrategySessions: false, strategyFrequency: null,
  },
  "Full Brand Manager": {
    hasImageUpload: true, hasTemplates: true, templateCount: 20,
    hasShortFormVideo: true, videoCount: 2, hasUGC: false, ugcCount: 0,
    hasManagedPosting: true, hasStrategySessions: false, strategyFrequency: null,
  },
  "Done For You": {
    hasImageUpload: true, hasTemplates: true, templateCount: 30,
    hasShortFormVideo: true, videoCount: 2, hasUGC: true, ugcCount: 1,
    hasManagedPosting: true, hasStrategySessions: true, strategyFrequency: "quarterly",
  },
  "Master Production": {
    hasImageUpload: true, hasTemplates: true, templateCount: 40,
    hasShortFormVideo: true, videoCount: 3, hasUGC: true, ugcCount: 2,
    hasManagedPosting: true, hasStrategySessions: true, strategyFrequency: "quarterly",
  },
};

interface SetupProgress {
  imageUpload: boolean;
  templateSelection: boolean;
  videoOptions: boolean;
  advancedServices: boolean;
}

interface PlanContextType {
  currentPlan: PlanName;
  planFeatures: PlanFeatures | null;
  setPlan: (plan: PlanName) => void;
  clearPlan: () => void;
  setupProgress: SetupProgress;
  updateSetupProgress: (step: keyof SetupProgress, done: boolean) => void;
  isSetupComplete: boolean;
}

const defaultSetupProgress: SetupProgress = {
  imageUpload: false,
  templateSelection: false,
  videoOptions: false,
  advancedServices: false,
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [currentPlan, setCurrentPlan] = useState<PlanName>(() => {
    const stored = localStorage.getItem("ryze-current-plan");
    return stored ? (stored as PlanName) : null;
  });

  const [setupProgress, setSetupProgress] = useState<SetupProgress>(() => {
    const stored = localStorage.getItem("ryze-setup-progress");
    return stored ? JSON.parse(stored) : defaultSetupProgress;
  });

  useEffect(() => {
    if (currentPlan) {
      localStorage.setItem("ryze-current-plan", currentPlan);
    } else {
      localStorage.removeItem("ryze-current-plan");
    }
  }, [currentPlan]);

  useEffect(() => {
    localStorage.setItem("ryze-setup-progress", JSON.stringify(setupProgress));
  }, [setupProgress]);

  const planFeatures = currentPlan ? FEATURE_MATRIX[currentPlan] : null;

  const setPlan = (plan: PlanName) => {
    setCurrentPlan(plan);
    setSetupProgress(defaultSetupProgress);
  };

  const clearPlan = () => {
    setCurrentPlan(null);
    setSetupProgress(defaultSetupProgress);
    localStorage.removeItem("ryze-current-plan");
    localStorage.removeItem("ryze-setup-progress");
  };

  const updateSetupProgress = (step: keyof SetupProgress, done: boolean) => {
    setSetupProgress((prev) => ({ ...prev, [step]: done }));
  };

  const isSetupComplete = (() => {
    if (!planFeatures) return false;
    if (!setupProgress.imageUpload) return false;
    if (planFeatures.hasTemplates && !setupProgress.templateSelection) return false;
    if (planFeatures.hasShortFormVideo && !setupProgress.videoOptions) return false;
    if (planFeatures.hasManagedPosting && !setupProgress.advancedServices) return false;
    return true;
  })();

  return (
    <PlanContext.Provider value={{ currentPlan, planFeatures, setPlan, clearPlan, setupProgress, updateSetupProgress, isSetupComplete }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
