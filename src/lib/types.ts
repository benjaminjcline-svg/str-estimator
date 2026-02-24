export type Verdict = "Proceed" | "Borderline" | "Walk Away";

export type PropertyType = "SFH" | "condo" | "duplex";

export interface STRInput {
  address?: string;
  purchase_price: number;
  down_payment_percent: number;
  interest_rate: number | "current market";
  loan_term?: number;
  property_type: PropertyType;
  self_managed: boolean;
  estimated_nightly_rate?: number;
  estimated_occupancy?: number;
}

export interface IncomeScenario {
  title: string;
  conditions: string;
  caveat?: string;
  description: string;
}

export interface CostUnderestimation {
  area: string;
  description: string;
}

export interface AnalysisReport {
  verdict: Verdict;
  verdictReasoning: string;

  incomeReality: {
    strongYear: IncomeScenario;
    typicalYear: IncomeScenario;
    weakYear: IncomeScenario;
  };

  costReality: CostUnderestimation[];

  fragility: {
    criticalAssumption: string;
    dependency: string;
    whenItWeakens: string;
  };

  downsideReality: {
    monthlyBleed: string;
    duration: string;
    emotionalImpact: string;
    survivability: string;
  };

  whatWouldNeedToBeTrue: string[];

  finalPerspective: string;

  metadata: {
    loanAmount: number;
    monthlyPrincipalInterest: number;
    appliedOccupancy: number;
    appliedNightlyRate: number;
    conservativeOverrides: string[];
  };
}
