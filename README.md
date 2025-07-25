# Kalyan Live Admin Dashboard

A comprehensive admin dashboard for managing Kalyan Live gaming platform built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

### 🎯 Core Features
- **Dashboard Overview**: Real-time statistics, charts, and key metrics
- **User Management**: Complete user lifecycle management with KYC verification
- **Game Management**: Create, control, and monitor games with real-time updates
- **Betting System**: Monitor bets, handle results, and manage payouts
- **Transaction Management**: Handle deposits, withdrawals, and payment processing
- **Analytics**: Comprehensive reporting and data visualization
- **Real-time Monitoring**: Live updates and notifications

### 📊 Dashboard Components
- **Statistics Cards**: Total users, bets, revenue, and active games
- **Interactive Charts**: Revenue trends, bet distribution, and user analytics
- **Quick Actions**: Fast access to common administrative tasks
- **Real-time Updates**: Live data refresh and notifications

### 👥 User Management
- **User Profiles**: Complete user information and activity history
- **KYC Management**: Document verification and approval workflow
- **Account Controls**: Activate, deactivate, or block user accounts
- **Search & Filtering**: Advanced search capabilities
- **Bulk Actions**: Mass operations on multiple users

### 🎮 Game Management
- **Game Controls**: Start, stop, and configure games
- **Result Management**: Declare results and handle disputes
- **Timing Configuration**: Set open/close times and result announcements
- **Bet Monitoring**: Track betting patterns and amounts
- **Payout Management**: Configure multipliers and manage payouts

### 💰 Financial Management
- **Transaction Tracking**: Monitor all financial activities
- **Withdrawal Processing**: Review and approve withdrawal requests
- **Deposit Management**: Handle incoming payments
- **Revenue Analytics**: Detailed financial reporting
- **Payment Methods**: Support multiple payment gateways

## Technology Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Charts**: Recharts
- **Icons**: Lucide React
- **Authentication**: NextAuth.js ready
- **Database**: Ready for integration (PostgreSQL/MongoDB)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kalyan-admin
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Dashboard home page
│   ├── users/          # User management pages
│   ├── games/          # Game management pages
│   └── layout.tsx      # Root layout
├── components/         # Reusable UI components
│   ├── AdminLayout.tsx # Main admin layout
│   ├── Dashboard.tsx   # Dashboard component
│   ├── UsersManagement.tsx
│   └── GamesManagement.tsx
├── lib/               # Utility functions
│   └── utils.ts       # Common utilities
├── types/            # TypeScript type definitions
│   └── index.ts      # Main type definitions
└── globals.css       # Global styles
```

## Key Components

### Dashboard
- Real-time statistics and metrics
- Interactive charts and graphs
- Quick action buttons
- Recent activity feeds

### User Management
- User search and filtering
- KYC verification workflow
- Account status management
- Detailed user profiles

### Game Management
- Game creation and configuration
- Real-time game monitoring
- Result declaration system
- Betting analytics

### Financial Management
- Transaction monitoring
- Withdrawal processing
- Revenue tracking
- Payment gateway integration

## API Integration

The project is structured to easily integrate with backend APIs:

1. **Authentication**: JWT-based admin authentication
2. **Real-time Updates**: WebSocket integration ready
3. **Database**: ORM/ODM integration ready
4. **Payment Gateways**: Payment processing integration
5. **Notifications**: Email/SMS notification system

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Docker (Optional)
```bash
docker build -t kalyan-admin .
docker run -p 3000:3000 kalyan-admin
```

## Security Features

- **Authentication**: Admin login with role-based access
- **Authorization**: Permission-based feature access
- **Input Validation**: Comprehensive form validation
- **CSRF Protection**: Built-in security measures
- **Data Sanitization**: XSS prevention

## Customization

### Styling
- Tailwind CSS for responsive design
- Custom color schemes and themes
- Component-based styling approach

### Features
- Modular component architecture
- Easy feature addition/removal
- Configurable dashboard widgets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary and confidential.

## Support

For support and questions, please contact the development team.

---

**Note**: This is a demo/template project. Replace mock data with real API integrations for production use.
#   k a l y a a n  
 