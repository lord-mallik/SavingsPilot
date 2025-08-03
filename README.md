# SavingsPilot

A comprehensive web application that analyzes monthly expenses, simulates savings strategies, and visualizes investment growth potential through an AI-powered financial coach interface.

## 🌟 Features

### Core Functionality
- **Expense Input System**: Manual entry and CSV file upload with validation
- **Data Analysis & Visualization**: Interactive charts using Chart.js showing spending patterns
- **Interactive Savings Simulator**: Dynamic sliders for adjusting discretionary spending
- **AI Financial Coach**: Personalized insights and recommendations
- **Investment Projections**: Compound interest calculations for 5, 10, and 15-year periods
- **Savings Health Score**: Comprehensive scoring system based on savings rate

### Technical Features
- **Mobile-Responsive Design**: Optimized for all screen sizes
- **Real-time Calculations**: Instant updates as users adjust parameters
- **Accessible Interface**: WCAG-compliant design with proper contrast and navigation
- **Modern UI/UX**: Clean, professional design with smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd savings-simulator-ai
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Environment Setup

For AI features, create a `.env` file in the root directory:
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

## 📊 Usage Guide

### 1. Input Your Financial Data
- Enter your monthly income
- Add expenses manually by category
- Or upload a CSV file with your expense data
- Download the sample CSV template to see the required format

### 2. Analyze Your Spending
- View interactive pie charts and bar graphs
- See expense breakdown by categories (Needs, Wants, Optional)
- Understand your spending patterns

### 3. Simulate Savings Scenarios
- Use sliders to adjust discretionary spending categories
- See real-time calculations of potential monthly savings
- View compound interest projections for different time periods

### 4. Get AI Coaching
- Generate personalized insights from the AI financial coach
- Receive actionable recommendations for improving your savings
- Get a savings health score and motivational guidance

## 🛠️ Technical Architecture

### Tech Stack
- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **File Processing**: PapaParse for CSV handling
- **Icons**: Lucide React
- **Build Tool**: Vite

### File Structure
```
src/
├── components/          # React components
│   ├── ExpenseInput.tsx    # Expense input form and CSV upload
│   ├── ExpenseChart.tsx    # Data visualization components
│   ├── SavingsSimulator.tsx # Interactive savings calculator
│   ├── AICoach.tsx         # AI insights interface
│   └── Slider.tsx          # Custom slider component
├── utils/               # Utility functions
│   ├── calculations.ts     # Financial calculations
│   └── csvParser.ts        # CSV processing utilities
├── types/               # TypeScript type definitions
│   └── index.ts
└── App.tsx             # Main application component
```

### Key Components

#### ExpenseInput
- Manual expense entry with category validation
- CSV file upload with error handling
- Real-time income vs. expenses tracking

#### ExpenseChart
- Pie chart for expense type distribution
- Bar chart for category-wise spending
- Interactive tooltips and legends

#### SavingsSimulator
- Dynamic sliders for spending adjustments
- Real-time savings calculations
- Compound interest projections with detailed breakdowns

#### AICoach
- Mock AI insights (replace with OpenAI API integration)
- Savings health score calculation
- Personalized recommendations and strategies

## 📈 Financial Calculations

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
- 90-100: Excellent (20%+ savings rate)
- 70-89: Good (15-20% savings rate)
- 50-69: Fair (10-15% savings rate)
- 30-49: Poor (5-10% savings rate)
- 0-29: Critical (<5% savings rate)

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563EB) - Trust and stability
- **Secondary**: Green (#10B981) - Growth and prosperity  
- **Accent**: Orange (#F97316) - Energy and motivation
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Headings**: 120% line height, font weights 600-700
- **Body**: 150% line height, font weight 400
- **System Fonts**: -apple-system, BlinkMacSystemFont, Segoe UI

### Spacing
- Consistent 8px spacing system
- Responsive breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

## 🔧 Customization

### Adding New Expense Categories
Edit the `EXPENSE_CATEGORIES` array in `src/components/ExpenseInput.tsx`:

```typescript
const EXPENSE_CATEGORIES = [
  { value: 'custom-category', label: 'Custom Category', type: 'wants' as const },
  // ... existing categories
];
```

### Modifying Calculation Parameters
Update the default values in `src/utils/calculations.ts`:

```typescript
export const calculateCompoundInterest = (
  monthlyContribution: number,
  annualRate: number = 0.07, // Change default return rate
  years: number
) => {
  // ... calculation logic
};
```

## 🧪 Testing

### Sample Data
Use the included sample CSV file for testing:
- Located at `sample-data/sample-expenses.csv`
- Contains realistic expense categories and amounts
- Download directly from the application interface

### Test Scenarios
1. **Empty State**: Test with no income/expenses
2. **High Earner**: Test with $10,000+ monthly income
3. **Tight Budget**: Test with expenses close to income
4. **Various Categories**: Test with different expense types

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel
```bash
npx vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Chart.js for beautiful data visualizations
- Tailwind CSS for utility-first styling
- Lucide React for clean, modern icons
- React and TypeScript communities for excellent tooling

---

Built with ❤️ to help people achieve financial freedom through intelligent planning and analysis.