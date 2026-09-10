import { test, expect } from "@playwright/test";

// Визуальные эталоны: любое незаказанное изменение внешнего вида
// (тень, оверлей, отступ, размер шрифта) роняет тест.
// Обновлять эталоны только осознанно: npm run test:ui:update
const PAGES = [
  ["dashboard", "/"],
  ["admin-settings", "/admin-settings"],
  ["catalog", "/catalog"],
  ["categories", "/categories"],
  ["users", "/users"],
] as const;

for (const [name, url] of PAGES) {
  test(`внешний вид: ${name}`, async ({ page }) => {
    await page.goto(url);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: false });
  });
}
