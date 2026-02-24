/**
 * Check if an email is a test account that bypasses payment.
 * Test emails are configured via TEST_BYPASS_EMAILS (comma-separated, case-insensitive).
 */
export function isTestAccount(email: string): boolean {
  const bypassList = process.env.TEST_BYPASS_EMAILS ?? "";
  if (!bypassList.trim()) return false;

  const normalized = email.trim().toLowerCase();
  const allowed = bypassList
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return allowed.includes(normalized);
}
