# NeoGold Backend API

A comprehensive backend API for the NeoGold digital gold platform.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Deployment](#deployment)

## Features

- **User Management**: Registration, authentication, profile management
- **KYC Verification**: Identity verification for users
- **Bank Account Management**: Add, update, and verify bank accounts
- **Gold Transactions**:
  - Buy gold (digital)
  - Sell gold (for cash)
  - Redeem gold (for physical delivery)
- **Wallet Management**: Track gold balance
- **Price Management**: Real-time gold prices
- **Admin Dashboard**: Manage users, transactions, and inventory

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **PostgreSQL**: Relational database
- **Sequelize**: ORM for database operations
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **jest & supertest**: Testing
- **Winston**: Logging
- **nodemailer**: Email services
- **express-validator**: Request validation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/neogold-backend.git
   cd neogold-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file by copying the example:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration details

### Configuration

Update the following configuration in the `.env` file:

```
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=neogold
DB_USER=postgres
DB_PASSWORD=yourpassword

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRY=7d

# Email Configuration
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=noreply@neogold.com
```

### Database Setup

1. Create a PostgreSQL database:
   ```bash
   createdb neogold
   ```

2. Run database migrations:
   ```bash
   npm run db:migrate
   ```

3. (Optional) Seed the database with initial data:
   ```bash
   npm run db:seed
   ```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## API Documentation

The API documentation is available at `/api-docs` when the server is running.

### Main API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/change-password` - Change password
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - Logout

#### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/kyc` - Get user KYC details
- `POST /api/users/kyc` - Submit KYC information

#### Bank Details
- `GET /api/banks` - Get all bank details
- `POST /api/banks` - Create bank detail
- `PUT /api/banks/:id` - Update bank detail
- `DELETE /api/banks/:id` - Delete bank detail
- `PATCH /api/banks/:id/primary` - Set as primary bank

#### Gold Transactions
- `GET /api/buy/price` - Get current buy price
- `POST /api/buy/init` - Initialize buy transaction
- `POST /api/buy/verify` - Verify payment
- `POST /api/buy/confirm` - Confirm buy transaction

- `GET /api/sell/price` - Get current sell price
- `POST /api/sell/init` - Initialize sell transaction
- `POST /api/sell/confirm` - Confirm sell transaction

- `GET /api/redeem/products` - Get available products
- `POST /api/redeem/init` - Initialize redeem transaction
- `POST /api/redeem/confirm` - Confirm redeem transaction

#### Transactions
- `GET /api/transactions` - Get all user transactions
- `GET /api/transactions/:id` - Get transaction details

## Database Schema

The database consists of the following main tables:

- **Users**: User accounts
- **Wallets**: User gold balances
- **BankDetails**: User bank accounts
- **KYC**: User identity verification
- **Transactions**: All transactions (buy, sell, redeem)
- **BuyTransactions**: Additional details for buy transactions
- **SellTransactions**: Additional details for sell transactions
- **RedeemTransactions**: Additional details for redeem transactions
- **Products**: Physical gold products available for redemption
- **GoldPrices**: Historical gold prices
- **Vaults**: Company's physical gold inventory

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Deployment

### Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Docker Deployment

```bash
# Build the Docker image
docker build -t neogold-api .

# Run the container
docker run -p 3000:3000 --env-file .env neogold-api
```

## License

This project is proprietary and confidential.

## Contact

For any inquiries, please contact support@neogold.com. 