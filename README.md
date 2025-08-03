# 🏆 SavingsPilot - AI-Powered Financial Management Platform

A production-grade financial management platform designed for Indian users, combining Google Gemini AI, gamification, and comprehensive accessibility features to democratize financial literacy.

## 🌟 Features

### Core Functionality
- **INR-Native Financial Tracking**: Built specifically for Indian users with proper currency formatting
- **Supabase Backend Integration**: Real-time data synchronization and secure user authentication
- **Smart Expense Management**: Manual entry, CSV upload, and AI-powered expense categorization
- **Advanced Data Visualization**: 5 chart types with interactive filtering and export capabilities
- **Google Gemini AI Coach**: Personalized financial coaching with conversation memory
- **Financial Insights Dashboard**: Income vs Expense Ratio, Emergency Fund Score, and Savings Forecast

### 🎮 Gamification & Learning
- **Achievement System**: Unlockable badges with milestone tracking and celebration effects
- **Daily Progress Tracking**: Visual progress charts for challenges with weekly analytics
- **Interactive Learning Modules**: Scenario-based financial education with real-time feedback
- **Experience Points & Levels**: Progressive advancement with database persistence
- **Challenge Management**: Active, available, and completed challenge states

### 📊 Export & Sharing
- **Multi-format Export**: PDF reports, PNG images, and CSV data export
- **Social Media Integration**: Facebook, Twitter, LinkedIn, and WhatsApp sharing
- **Theme-Consistent Reports**: Maintains dark/light theme in exported documents
- **Email Reports**: Direct email delivery of financial summaries

### ♿ Accessibility & Inclusion
- **WCAG 2.1 AA Compliance**: Complete keyboard navigation and screen reader support
- **Dynamic Font Scaling**: Real-time font size adjustment (14px, 16px, 18px)
- **High Contrast Mode**: Enhanced visibility with automatic contrast adjustment
- **Reduced Motion Support**: Respects user motion preferences
- **Focus Management**: Visible focus indicators and skip links
- **Multi-language Support**: English and Hindi with proper RTL support

### 🌐 Internationalization
- **React-i18next Integration**: Complete translation coverage for all UI elements
- **Language Detection**: Automatic browser language detection with manual override
- **RTL Support**: Proper text direction for Arabic and other RTL languages
- **Cultural Localization**: Date formats, number formatting, and cultural preferences

### Technical Features
- **TypeScript**: Strict type checking throughout the application
- **Error Boundaries**: Comprehensive error handling with user-friendly fallbacks
- **Performance Optimized**: Lazy loading, memoization, and optimized re-renders
- **Mobile-First Design**: Responsive design optimized for Indian mobile users
- **Real-time Updates**: Supabase real-time subscriptions for live data updates

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd savingspilot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Add your Supabase and Gemini AI credentials
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Environment Variables

Required environment variables:
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key

# Application Configuration
VITE_APP_NAME=SavingsPilot
VITE_APP_VERSION=2.0.0
```

## 📊 Usage Guide

### 1. Input Your Financial Data
- Enter your monthly income in INR
- Add expenses manually with proper categorization
- Upload CSV files with preview and validation
- Set emergency fund and current savings amounts

### 2. Analyze Your Financial Health
- View interactive charts (pie, bar, line, doughnut, radar)
- Get insights on Income vs Expense Ratio and Emergency Fund Score
- See 12-month savings forecast with compound interest projections
- Monitor expense efficiency and spending patterns

### 3. Simulate Savings Scenarios
- Use interactive sliders to adjust spending categories
- See real-time INR calculations of potential monthly savings
- View compound interest projections optimized for Indian investment returns

### 4. Get AI Coaching
- Chat with Google Gemini AI for personalized financial advice
- Receive recommendations tailored to Indian financial context
- Get actionable insights with conversation memory

### 5. Export and Share Progress
- Generate PDF reports with theme consistency
- Export data as CSV for external analysis
- Share achievements on social media platforms
- Email reports directly to financial advisors

## 🛠️ Technical Architecture

### Tech Stack
- **Frontend**: React 18+ with TypeScript and strict type checking
- **Backend**: Supabase with PostgreSQL database
- **Styling**: Tailwind CSS with dark/light theme support
- **Charts**: Chart.js with theme-aware configurations
- **Animations**: Framer Motion with accessibility considerations
- **AI Integration**: Google Gemini AI with conversation memory
- **Internationalization**: React-i18next with Hindi and English support
- **Testing**: Vitest with React Testing Library
- **Build Tool**: Vite with optimized production builds

### Project Structure
```
src/
├── components/          # React components
│   ├── AuthScreen.tsx           # Authentication with Supabase
│   ├── EnhancedExpenseInput.tsx # Advanced expense input with CSV preview
│   ├── EnhancedExpenseChart.tsx # Multi-chart visualization with filters
│   ├── FinancialInsightsDashboard.tsx # AI-powered insights and metrics
│   ├── EnhancedGamification.tsx # Gamification with daily progress tracking
│   ├── ExportReports.tsx        # PDF/PNG generation and social sharing
│   ├── AccessibilityPanel.tsx   # WCAG compliance controls
│   ├── ForgotPasswordModal.tsx  # Password reset flow
│   └── ErrorBoundary.tsx        # Error handling and recovery
├── services/            # API and database services
│   ├── database.ts         # Supabase database operations
│   └── geminiService.ts    # Google Gemini AI integration
├── hooks/               # Custom React hooks
│   └── useDatabase.ts      # Database state management hooks
├── utils/               # Utility functions
│   ├── calculations.ts     # Financial calculations
│   ├── currency.ts         # INR formatting and conversion
│   └── csvParser.ts        # CSV processing utilities
├── contexts/            # React contexts
│   └── ThemeContext.tsx    # Dark/light theme management
├── i18n/                # Internationalization
│   └── config.ts           # i18next configuration
├── __tests__/           # Test files
│   ├── components/         # Component tests
│   ├── services/           # Service tests
│   └── utils/              # Utility tests
├── data/                # Static data and configurations
│   ├── personas.ts         # User persona definitions
│   ├── badges.ts           # Achievement badge system
│   └── challenges.ts       # Monthly challenges
├── types/               # TypeScript type definitions
│   └── index.ts
└── App.tsx             # Main application component
```

### Key Components

#### AuthScreen
- Supabase authentication with email/password
- Forgot password flow with email recovery
- Demo account for testing and evaluation
- Form validation with real-time feedback

#### FinancialInsightsDashboard
- Real-time financial health scoring
- Income vs Expense Ratio analysis
- Emergency Fund Score with actionable recommendations
- 12-month savings forecast with compound interest
- Interactive charts with theme support

#### EnhancedExpenseInput
- CSV upload with preview and validation
- Real-time save status with visual feedback
- Auto-save functionality with database persistence
- INR formatting with Indian number system support

#### AccessibilityPanel
- WCAG 2.1 AA compliance controls
- Dynamic font scaling (14px, 16px, 18px)
- High contrast mode with automatic adjustments
- Keyboard navigation help and focus management

## 💰 Financial Calculations

### Compound Interest Formula
```javascript
FV = P * [((1 + r)^n - 1) / r]
```
Where:
- FV = Future Value
- P = Monthly savings contribution
- r = Monthly return rate (0.00833 for 10% annual)
- n = Total number of months

### Health Score Algorithm
- **Excellent (90-100)**: 20%+ savings rate with 6+ months emergency fund
- **Good (70-89)**: 15-20% savings rate with 3-6 months emergency fund
- **Warning (50-69)**: 10-15% savings rate with 1-3 months emergency fund
- **Critical (0-49)**: <10% savings rate with minimal emergency fund

### Indian Financial Context
- **Emergency Fund**: 6 months of expenses (considering job market volatility)
- **Investment Returns**: 10-12% annual returns (aligned with Indian market expectations)
- **Expense Categories**: Adapted for Indian lifestyle (rent, groceries, transportation, etc.)
- **Currency Formatting**: Lakhs and Crores notation for large amounts

## 🎨 Design System

### Color Palette
- **Light Theme**: Blue (#2563EB) and Green (#10B981) gradients
- **Dark Theme**: Gray (#1F2937) and Blue (#1E40AF) gradients
- **Semantic Colors**: Success (#10B981), Warning (#F59E0B), Error (#EF4444)
- **Accessibility**: WCAG AA compliant contrast ratios in both themes

### Typography
- **Responsive Scaling**: CSS custom properties for dynamic font sizing
- **Hindi Support**: Proper font rendering for Devanagari script
- **Accessibility**: High contrast mode with enhanced readability
- **System Fonts**: -apple-system, BlinkMacSystemFont, Segoe UI

### Spacing
- **8px Grid System**: Consistent spacing throughout the application
- **Mobile-First**: Optimized for Indian mobile usage patterns
- **Responsive Breakpoints**: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

## 🔧 Configuration

### Environment Variables
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key

# Application Configuration
VITE_APP_NAME=SavingsPilot
VITE_APP_VERSION=2.0.0

# Feature Flags (Optional)
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_CRASH_REPORTING=false
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Type checking
npm run type-check
```

### Test Scenarios
1. **Authentication Flow**: Login, signup, password reset, demo account
2. **Data Persistence**: Supabase CRUD operations with error handling
3. **Currency Formatting**: INR formatting with Indian number system
4. **Accessibility**: Keyboard navigation, screen reader support, font scaling
5. **Theme Switching**: Dark/light mode with persistent state
6. **Internationalization**: Language switching with proper translations

### Performance Benchmarks
- **Initial Load**: < 3 seconds on 3G networks
- **Database Queries**: < 500ms average response time
- **Chart Rendering**: < 200ms for complex visualizations
- **Theme Switching**: < 100ms transition time
- **Language Switching**: < 50ms content update

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
# Connect to Netlify and deploy
npm run build
# Upload dist/ folder to Netlify
```

### Deploy to Vercel
```bash
npx vercel --prod
```

### Environment Setup for Production
1. Set up Supabase project with proper RLS policies
2. Configure Google Gemini AI API with usage limits
3. Set up error monitoring (Sentry, LogRocket)
4. Configure analytics (Google Analytics, Mixpanel)
5. Set up performance monitoring (Web Vitals)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

### Development Guidelines
- **TypeScript**: Use strict type checking and proper interfaces
- **Testing**: Write tests for all new features and bug fixes
- **Accessibility**: Test with screen readers and keyboard navigation
- **Performance**: Monitor bundle size and runtime performance
- **Internationalization**: Add translations for new UI elements
- **Database**: Follow Supabase best practices for RLS and security

## 📈 Performance Monitoring

### Key Metrics
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size**: < 500KB gzipped for initial load
- **Database Performance**: < 500ms for 95th percentile queries
- **Accessibility Score**: 100/100 on Lighthouse accessibility audit
- **SEO Score**: 90+ on Lighthouse SEO audit

### Monitoring Tools
- **Web Vitals**: Real user monitoring with Core Web Vitals
- **Supabase Analytics**: Database performance and usage metrics
- **Error Tracking**: Comprehensive error logging and alerting
- **User Analytics**: Feature usage and conversion tracking

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Supabase** for backend infrastructure and real-time capabilities
- **Google Gemini AI** for intelligent financial coaching
- **Chart.js** for beautiful, accessible data visualizations
- **Tailwind CSS** for utility-first styling with theme support
- **Framer Motion** for smooth, accessible animations
- **React-i18next** for comprehensive internationalization
- **React Testing Library** for reliable component testing

## 🇮🇳 Made for India

SavingsPilot is specifically designed for Indian users with:
- **INR Currency**: Native support for Indian Rupee with proper formatting
- **Indian Number System**: Lakhs and Crores notation for large amounts
- **Hindi Language**: Complete Hindi translation with Devanagari script support
- **Indian Financial Context**: Investment returns, expense categories, and financial advice tailored for India
- **Mobile-First**: Optimized for Indian mobile usage patterns and network conditions

---

**Built with ❤️ in India to democratize financial literacy and empower every Indian to achieve financial freedom.**

## 📞 Support

For support and feedback:
- **Email**: help@savingspilot.com
- **GitHub Issues**: Report bugs and feature requests
- **Community**: Join our Discord for discussions and support

### Version History

- **v2.0.0** - Production release with Supabase, accessibility, and internationalization
- **v1.5.0** - Added gamification, AI coaching, and export features
- **v1.0.0** - Initial release with basic expense tracking and savings simulation