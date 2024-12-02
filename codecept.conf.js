const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: 'e2e/**/*.test.js',
  output: 'e2e/output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://localhost:9000',
      show: true,
    },
  },
  include: {
    I: './steps_file.js',
  },
  name: 'Dicoding-Submission-FE-Expert',
  plugins: {
    screenshotOnFail: {
      enabled: true,
      fullPage: true,
    },
  },
};
