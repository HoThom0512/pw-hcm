const { execSync } = require('child_process');

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1; // tháng tính từ 0

let testFile = '';

if (month === 5) {
  if (day >= 12 && day <= 16) testFile = 'tests/stage1-self.spec.ts';
  else if (day >= 13 && day <= 17) testFile = 'tests/stage2-appraiser.spec.ts';
  else if (day >= 14 && day <= 18) testFile = 'tests/stage3-review.spec.ts';
}

if (testFile) {
  console.log(`🟢 Running test for current stage: ${testFile}`);
  execSync(`npx playwright test ${testFile}`, { stdio: 'inherit' });
} else {
  console.log('⚠️ No stage active today — skipping tests.');
}
