import { chromium } from 'playwright';

async function coolifyRedeploy() {
  console.log('🚀 Starting Coolify redeploy automation...\n');

  const browser = await chromium.launch({
    headless: false, // Set to true for headless mode
    slowMo: 500 // Slow down by 500ms for visibility
  });

  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });

  const page = await context.newPage();

  try {
    // Step 1: Navigate to Coolify
    console.log('📍 Step 1: Navigating to Coolify...');
    await page.goto('http://157.180.78.53:8000', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    console.log('✅ Page loaded\n');

    // Step 2: Login
    console.log('🔐 Step 2: Logging in...');

    // Wait for login form
    await page.waitForSelector('input[type="email"], input[name="email"]', { timeout: 10000 });

    // Fill in credentials
    await page.fill('input[type="email"], input[name="email"]', 'admin@dijitalkartvizit.com');
    await page.fill('input[type="password"], input[name="password"]', 'CoolifyAdmin2026!');

    // Click login button
    await page.click('button[type="submit"]');

    // Wait for navigation after login
    await page.waitForLoadState('networkidle');
    console.log('✅ Logged in successfully\n');

    // Step 3: Find and navigate to dijital-kartvizit project
    console.log('🔍 Step 3: Finding dijital-kartvizit project...');

    // Wait a bit for dashboard to load
    await page.waitForTimeout(2000);

    // Look for project link (trying multiple selectors)
    const projectSelectors = [
      'text=dijital-kartvizit',
      'a:has-text("dijital-kartvizit")',
      '[href*="dijital-kartvizit"]'
    ];

    let projectFound = false;
    for (const selector of projectSelectors) {
      try {
        await page.click(selector, { timeout: 5000 });
        projectFound = true;
        break;
      } catch (e) {
        continue;
      }
    }

    if (!projectFound) {
      throw new Error('Could not find dijital-kartvizit project');
    }

    await page.waitForLoadState('networkidle');
    console.log('✅ Project page loaded\n');

    // Step 4: Trigger redeploy
    console.log('🔄 Step 4: Triggering redeploy...');

    // Look for redeploy button
    const redeploySelectors = [
      'button:has-text("Redeploy")',
      'button:has-text("Deploy")',
      '[data-action="redeploy"]',
      'text=Redeploy'
    ];

    let redeployTriggered = false;
    for (const selector of redeploySelectors) {
      try {
        await page.click(selector, { timeout: 5000 });
        redeployTriggered = true;
        break;
      } catch (e) {
        continue;
      }
    }

    if (!redeployTriggered) {
      throw new Error('Could not find Redeploy button');
    }

    // Wait for deployment to start
    await page.waitForTimeout(3000);
    console.log('✅ Redeploy triggered\n');

    // Step 5: Get deployment info
    console.log('📊 Step 5: Getting deployment info...');

    // Try to capture deployment ID and status from the page
    const url = page.url();
    console.log(`Current URL: ${url}`);

    // Take a screenshot for reference
    await page.screenshot({
      path: '/Users/furkanyigit/Desktop/dijitalkartvizit/sanalkartvizitim/deployment-status.png',
      fullPage: true
    });
    console.log('📸 Screenshot saved to deployment-status.png\n');

    // Try to get deployment status text
    try {
      const statusElement = await page.locator('text=/deploying|building|running|started/i').first();
      const status = await statusElement.textContent();
      console.log(`Deployment Status: ${status}`);
    } catch (e) {
      console.log('Note: Could not extract deployment status text');
    }

    // Extract deployment ID from URL if present
    const deploymentIdMatch = url.match(/deployment[\/\-]([a-zA-Z0-9-]+)/);
    if (deploymentIdMatch) {
      console.log(`Deployment ID: ${deploymentIdMatch[1]}`);
    }

    console.log('\n✅ Redeploy automation completed successfully!');
    console.log('📝 Please check the screenshot for visual confirmation.');

    // Keep browser open for 5 seconds to see the result
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('\n❌ Error during automation:', error);

    // Take error screenshot
    await page.screenshot({
      path: '/Users/furkanyigit/Desktop/dijitalkartvizit/sanalkartvizitim/error-screenshot.png',
      fullPage: true
    });
    console.log('📸 Error screenshot saved to error-screenshot.png');

    throw error;
  } finally {
    await browser.close();
  }
}

// Run the automation
coolifyRedeploy().catch(console.error);
