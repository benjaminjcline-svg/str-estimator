import type { STRInput, AnalysisReport, Verdict, PropertyType } from "./types";

const DEFAULT_INTEREST_RATE = 7.25;
const DEFAULT_LOAN_TERM = 30;
const CONSERVATIVE_OCCUPANCY = 55;
const CONSERVATIVE_OCCUPANCY_CAP = 65;
const TYPICAL_OCCUPANCY = 58;

function applyConservativeDefaults(input: STRInput): {
  loanAmount: number;
  monthlyPI: number;
  appliedOccupancy: number;
  appliedNightlyRate: number;
  overrides: string[];
} {
  const overrides: string[] = [];
  const downPayment = (input.purchase_price * input.down_payment_percent) / 100;
  const loanAmount = input.purchase_price - downPayment;
  const rate =
    input.interest_rate === "current market"
      ? DEFAULT_INTEREST_RATE
      : Number(input.interest_rate);
  if (input.interest_rate === "current market") {
    overrides.push(
      `Interest rate assumed ${rate}% (current market) — verify against actual quote`
    );
  }
  const term = input.loan_term ?? DEFAULT_LOAN_TERM;
  const monthlyRate = rate / 100 / 12;
  const n = term * 12;
  const monthlyPI =
    loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

  let appliedOccupancy = input.estimated_occupancy ?? TYPICAL_OCCUPANCY;
  if (input.estimated_occupancy !== undefined && input.estimated_occupancy > CONSERVATIVE_OCCUPANCY_CAP) {
    appliedOccupancy = Math.min(input.estimated_occupancy, CONSERVATIVE_OCCUPANCY_CAP);
    overrides.push(
      `Occupancy capped at ${CONSERVATIVE_OCCUPANCY_CAP}% — assumptions above ~65% are fragile`
    );
  } else if (input.estimated_occupancy === undefined) {
    appliedOccupancy = CONSERVATIVE_OCCUPANCY;
    overrides.push(
      `Occupancy assumed ${CONSERVATIVE_OCCUPANCY}% — no data provided; this materially affects outcome`
    );
  }

  const baseRateByType: Record<PropertyType, number> = {
    SFH: 175,
    condo: 140,
    duplex: 155,
  };
  const appliedNightlyRate =
    input.estimated_nightly_rate ?? baseRateByType[input.property_type];
  if (!input.estimated_nightly_rate) {
    overrides.push(
      `Nightly rate assumed $${appliedNightlyRate} (${input.property_type}) — cannot verify; increases risk`
    );
  }

  return {
    loanAmount,
    monthlyPI,
    appliedOccupancy,
    appliedNightlyRate,
    overrides,
  };
}

export function analyzeSTR(input: STRInput): AnalysisReport {
  const {
    loanAmount,
    monthlyPI,
    appliedOccupancy,
    appliedNightlyRate,
    overrides,
  } = applyConservativeDefaults(input);

  const nightsPerYear = 365 * (appliedOccupancy / 100);
  const grossAnnualRevenue = nightsPerYear * appliedNightlyRate;
  const grossMonthlyRevenue = grossAnnualRevenue / 12;

  const cleaningPerStay = input.self_managed ? 80 : 120;
  const staysPerYear = Math.round(nightsPerYear / 3.5);
  const annualCleaning = staysPerYear * cleaningPerStay;

  const propertyTax = input.purchase_price * 0.01;
  const insurance = input.purchase_price * 0.0025;
  const utilitiesMonthly = input.property_type === "condo" ? 80 : 150;
  const utilitiesAnnual = utilitiesMonthly * 12;
  const consumablesAndWear = grossAnnualRevenue * 0.04;
  const capexMonthly = input.purchase_price * 0.001;
  const capexAnnual = capexMonthly * 12;

  const totalAnnualCosts =
    monthlyPI * 12 +
    propertyTax +
    insurance +
    utilitiesAnnual +
    annualCleaning +
    consumablesAndWear +
    capexAnnual;
  const totalMonthlyCosts = totalAnnualCosts / 12;
  const netMonthly = grossMonthlyRevenue - totalMonthlyCosts;

  let verdict: Verdict;
  let verdictReasoning: string;

  if (netMonthly >= 200 && appliedOccupancy >= 50 && overrides.length <= 2) {
    verdict = "Proceed";
    verdictReasoning = `At ${appliedOccupancy}% occupancy and conservative costs, the deal works. Numbers hold under typical STR conditions. Do due diligence—zoning, HOA rules, local demand—and you're good to go.`;
  } else if (
    netMonthly >= -300 &&
    netMonthly < 200 &&
    appliedOccupancy >= 45
  ) {
    verdict = "Borderline";
    verdictReasoning = `Cash flow's thin or slightly negative. This deal lives or dies on hitting your occupancy and rate assumptions. A weak year? Meaningful stress. Only proceed if you've got reserves and can stomach 6–12 months of break-even.`;
  } else {
    verdict = "Walk Away";
    verdictReasoning = `Under conservative assumptions, this doesn't work. The gap between revenue and costs is too big. Walking away means you're not subsidizing a property or hoping optimistic projections pan out.`;
  }

  const incomeReality = {
    strongYear: {
      title: "Strong Year",
      conditions: `Peak demand, limited competition, rates at or above $${appliedNightlyRate}/night, 70–75% occupancy.`,
      caveat: "Don't bank on this. It's not typical.",
      description: `Gross revenue could run 20–25% above baseline. Cash flow gets comfortable. But you can't count on this—favorable conditions don't last forever.`,
    },
    typicalYear: {
      title: "Typical Year",
      conditions: `Seasonality. Vacancy gaps. Rate pressure.`,
      description: `Most owners see 50–60% occupancy in established markets. Shoulder season? Discounts. Cleaning, turnover, platform fees—they eat into gross. Typical year usually underperforms the hype.`,
    },
    weakYear: {
      title: "Weak Year",
      conditions: `New regs. More competition. Economic pullback. Bad weather.`,
      description: `Occupancy drops into the 40s. Rates get cut. First thing that breaks: cash flow. Goes negative. Recovery? 12–24 months. Many owners can't sustain the bleed.`,
    },
  };

  const costReality = [
    {
      area: "Fixed vs variable",
      description:
        "Mortgage, tax, insurance—fixed. Revenue? Variable. A 10% occupancy drop can wipe months of thin profit.",
    },
    {
      area: "Turnover and cleaning",
      description: `Every stay: $${cleaningPerStay}+ for cleaning, restocking, coordination. ${staysPerYear}+ stays/year adds up. Self-manage? Saves money, costs time.`,
    },
    {
      area: "Utilities, consumables, wear",
      description:
        "STRs burn more utilities and supplies than LTR. Furnishings, linens, finishes—wear accelerates. Budget 4–6% of revenue.",
    },
    {
      area: "Insurance and tax",
      description:
        "STR insurance keeps going up. Some cities are adding STR taxes. These costs move—often without much warning.",
    },
    {
      area: "CapEx creep",
      description: `Roof, HVAC, appliances age. $${Math.round(capexMonthly)}/month feels low now—compounds over 5–10 years.`,
    },
  ];

  const criticalAssumption =
    appliedOccupancy > 0
      ? `Occupancy at ${appliedOccupancy}% or higher`
      : "Ability to achieve meaningful occupancy in this market";

  const fragility = {
    criticalAssumption,
    dependency: `Deal works only if occupancy holds near ${appliedOccupancy}% and rates stay around $${appliedNightlyRate}.`,
    whenItWeakens: `First thing that breaks: monthly cash flow. Occupancy drops 5–10 points or rates compress? The gap narrows fast. Negative flow can hit in 1–2 months.`,
  };

  const monthlyBleed =
    netMonthly < 0
      ? `Roughly $${Math.abs(Math.round(netMonthly))}–$${Math.abs(Math.round(netMonthly * 1.3))}/month depending on actual performance.`
      : `Break-even to small positive in a weak year — could swing to $${Math.round(totalMonthlyCosts * 0.15)}/month negative if occupancy drops 10+ points.`;

  const downsideReality = {
    monthlyBleed,
    duration:
      "Stress lasts 6–18 months. Markets don't bounce overnight.",
    emotionalImpact:
      "Carrying a negative-cash-flow STR is draining. Financial and mental load—right when you hoped for passive income.",
    survivability:
      netMonthly < -200
        ? "The downside compounds. Without reserves—not survivable."
        : netMonthly < 0
          ? "Survivable with reserves. Not comfortable. Every negative month erodes your cushion."
          : "Survivable with 6–12 months of reserves. Weak years happen.",
  };

  const whatWouldNeedToBeTrue: string[] = [
    `Verified occupancy data from this specific market (we cannot confirm this)`,
    `Zoning and HOA explicitly allow STRs without material restriction`,
    `You have 6–12 months of reserves to cover potential negative cash flow`,
    `Nightly rates of $${appliedNightlyRate}+ are achievable based on comps you've validated`,
    `You are prepared to self-manage or have confirmed management costs`,
  ];

  const finalPerspective =
    verdict === "Proceed"
      ? "My take: proceed with due diligence. Verify zoning, comps, local demand before you close. Reasonable deal to run seriously."
      : verdict === "Borderline"
        ? "My take: pause unless you've got strong reserves and conviction. Most disciplined buyers pass on borderline when better deals exist. Reasonable to walk."
        : "My take: walk. Most disciplined buyers wouldn't take on something that fails under conservative assumptions. Reasonable to pass.";

  return {
    verdict,
    verdictReasoning,
    incomeReality,
    costReality,
    fragility,
    downsideReality,
    whatWouldNeedToBeTrue,
    finalPerspective,
    metadata: {
      loanAmount,
      monthlyPrincipalInterest: monthlyPI,
      appliedOccupancy,
      appliedNightlyRate,
      conservativeOverrides: overrides,
    },
  };
}
