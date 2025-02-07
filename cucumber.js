module.exports = {
  default: `--require-module ts-node/register --require ./features/step_definitions/**/*.ts --format json:./cucumber-report.json --timeout 30000`
};