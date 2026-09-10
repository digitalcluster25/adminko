import { defineConfig, devices } from "@playwright/test";

// Тесты запускаются против прод-сборки на зафиксированном порту 3010.
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  expect: {
    // Допуск на антиалиасинг шрифтов, но не на изменения дизайна.
    toHaveScreenshot: { maxDiffPixelRatio: 0.002 },
  },
  use: {
    baseURL: "http://localhost:3010",
    ...devices["Desktop Chrome"],
    viewport: { width: 1440, height: 900 },
    // В облачном контейнере Chromium предустановлен по этому пути.
    // Локально (macOS) достаточно один раз выполнить: npx playwright install chromium
    launchOptions: process.env.PW_CHROMIUM_PATH
      ? { executablePath: process.env.PW_CHROMIUM_PATH }
      : {},
  },
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3010",
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
