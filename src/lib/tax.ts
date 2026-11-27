/**
 * Albanian payroll and dividend estimates for 2026.
 *
 * Sources (confirm with the firm each January):
 * - Minimum wage ALL 50,000 and maximum social-insurance base ALL 186,416 from 1 Jan 2026
 *   (Council of Ministers Decision No. 776, 19 Dec 2025).
 * - Monthly payroll tax (TAP) bands under Law No. 29/2023, as summarised by PwC Worldwide Tax Summaries.
 * - Dividend tax 8%.
 */
export const RATES_2026 = {
  minWage: 50_000,
  maxSocialBase: 186_416,
  socialEmployer: 0.15,
  socialEmployee: 0.095,
  healthEmployer: 0.017,
  healthEmployee: 0.017,
  dividendTax: 0.08,
};

/** Monthly TAP on gross employment income. */
export function payrollTax(gross: number): number {
  if (gross <= 50_000) return 0;
  if (gross <= 60_000) return Math.round((gross - 35_000) * 0.13);
  if (gross <= 200_000) return Math.round((gross - 30_000) * 0.13);
  return Math.round(22_100 + (gross - 200_000) * 0.23);
}

export interface SalaryBreakdown {
  gross: number;
  socialEmployee: number;
  healthEmployee: number;
  tap: number;
  net: number;
  socialEmployer: number;
  healthEmployer: number;
  employerCost: number;
}

export function salaryBreakdown(grossInput: number): SalaryBreakdown {
  const r = RATES_2026;
  const gross = Math.max(0, grossInput);
  // Contributions are due on at least the minimum wage and on at most the ceiling (health has no ceiling).
  const socialBase = Math.min(Math.max(gross, r.minWage), r.maxSocialBase);
  const healthBase = Math.max(gross, r.minWage);

  const socialEmployee = Math.round(socialBase * r.socialEmployee);
  const healthEmployee = Math.round(healthBase * r.healthEmployee);
  const socialEmployer = Math.round(socialBase * r.socialEmployer);
  const healthEmployer = Math.round(healthBase * r.healthEmployer);
  const tap = payrollTax(gross);

  return {
    gross,
    socialEmployee,
    healthEmployee,
    tap,
    net: Math.max(0, gross - socialEmployee - healthEmployee - tap),
    socialEmployer,
    healthEmployer,
    employerCost: gross + socialEmployer + healthEmployer,
  };
}

export function dividendBreakdown(amount: number) {
  const gross = Math.max(0, amount);
  const tax = Math.round(gross * RATES_2026.dividendTax);
  return { gross, tax, net: gross - tax };
}
