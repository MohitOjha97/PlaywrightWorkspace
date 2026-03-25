# PlaywrightWorkspace 🚀

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.40+-purple.svg)](https://playwright.dev/)
[![Cucumber](https://img.shields.io/badge/Cucumber-9.0+-green.svg)](https://cucumber.io/)
[![BrowserStack](https://img.shields.io/badge/BrowserStack-Integrated-orange.svg)](https://browserstack.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A robust end-to-end automation framework built with Playwright, featuring cross-browser testing, BrowserStack integration, Cucumber BDD, and comprehensive HTML reporting for Portfolio/Managed Products web applications.

## ✨ Features

- **🔄 Cross-Browser Testing**: Chrome, Firefox, Safari, Edge support
- **☁️ BrowserStack Integration**: Cloud-based testing across multiple OS/browser combinations
- **🥒 Cucumber BDD**: Human-readable test scenarios with Gherkin syntax
- **📊 HTML Reporting**: Detailed test reports with screenshots and videos
- **🏗️ TypeScript**: Full type safety and modern development experience
- **🎯 Page Object Model**: Maintainable and reusable test components
- **⚙️ Environment Configuration**: Flexible test environment management
- **📱 Responsive Testing**: Mobile and desktop viewport support

## 📋 Prerequisites

- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **Git**: For version control
- **BrowserStack Account**: For cloud testing (optional)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MohitOjha97/PlaywrightWorkspace.git
   cd PlaywrightWorkspace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.cfg` template and configure your environment variables
   - Set up BrowserStack credentials if using cloud testing

## ⚙️ Configuration

### Environment Variables

Create `src/helper/env/.env.cfg` with the following variables:

```env
# Test Environment
ENVIRONMENT=staging
PRODUCT_NAME=PortfolioProducts

# Browser Configuration
BROWSER=chrome
TAGS=@investScenario

# BrowserStack (for cloud testing)
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key
BROWSERSTACK_LOCAL=true

# Release Information
RELEASE_NAME=v1.0.0
```

### BrowserStack Setup

For BrowserStack testing, ensure:
- Valid BrowserStack credentials
- BrowserStack Local running (if testing localhost)
- Appropriate browser/OS combinations configured

## 🏃‍♂️ Usage

### Running Tests

**Run all tests:**
```bash
npm test
```

**Run specific scenario:**
```bash
npm run test -- --tags @investScenario
```

**Run with specific browser:**
```bash
npm run test -- --browser chrome
```

**Run in headed mode (visible browser):**
```bash
npm run test -- --headed
```

### Available Scripts

- `npm run pretest`: Initialize test environment
- `npm test`: Execute test suite
- `npm run posttest`: Generate HTML reports
- `npm run report`: View generated reports

## 📊 Reporting

### HTML Reports

After test execution, HTML reports are generated in `test-results/` directory:

```bash
npm run report
```

Reports include:
- ✅ Test execution summary
- 📸 Screenshots on failure
- 🎥 Video recordings
- 📈 Detailed step-by-step results
- 📋 Cucumber feature reports

### BrowserStack Reports

When running on BrowserStack:
- Real-time test execution on BrowserStack dashboard
- Screenshots and videos automatically captured
- Session status updates (passed/failed)

## 🏗️ Project Structure

```
PlaywrightWorkspace/
├── src/
│   ├── helper/
│   │   ├── browsers/          # Browser management
│   │   ├── env/               # Environment configuration
│   │   ├── report.ts          # Report generation
│   │   ├── init.ts            # Test initialization
│   │   └── utils/             # Utility functions
│   ├── hooks/                 # Cucumber hooks
│   ├── pageObjects/           # Page Object Models
│   └── types/                 # TypeScript definitions
├── test/
│   ├── features/              # Cucumber feature files
│   └── stepDefinitions/       # Step implementations
├── config/
│   └── cucumber.js            # Cucumber configuration
├── test-results/               # Generated reports
├── browserstack.config.ts     # BrowserStack configuration
├── playwright.config.ts       # Playwright configuration
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Test Scenarios

### Auto Investment Features
- User onboarding and knowledge assessment
- Personal contribution setup
- Affordability calculator validation
- Investment theme selection
- Risk level assessment

### Supported Browsers
- **Local**: Chrome, Firefox, Safari
- **BrowserStack**: Windows 11 Chrome/Firefox, macOS Monterey Safari/Chrome

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- 📧 Create an issue on GitHub
- 📖 Check the [Playwright Documentation](https://playwright.dev/)
- 🌐 Visit [BrowserStack Documentation](https://browserstack.com/docs/)

## 🙏 Acknowledgments

- [Playwright](https://playwright.dev/) - Modern web testing framework
- [Cucumber](https://cucumber.io/) - BDD testing framework
- [BrowserStack](https://browserstack.com/) - Cloud testing platform
- [Multiple Cucumber HTML Reporter](https://github.com/WasiqB/multiple-cucumber-html-reporter) - Test reporting

---

**Happy Testing! 🎯**
