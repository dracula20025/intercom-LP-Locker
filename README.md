# Intercom LP Locker

Intercom LP Locker is a secure, decentralized application (dApp) designed to provide transparent token locking solutions. Built with a focus on trust and security, it allows project teams and liquidity providers to lock their assets for a specified duration, preventing premature withdrawals and building investor confidence.

## Features

- **Wallet Integration**: Seamlessly connect your Web3 wallet to manage your locks.
- **Token Locking**: Lock any ERC-20/BEP-20 compatible tokens with customizable unlock dates.
- **Transparency**: A public dashboard to view all active locks, including token details, amounts, and unlock schedules.
- **Security**: Built using industry-standard patterns to ensure asset safety.

## Overview

<div align="center">
  <img src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000" alt="App Screenshot" width="800">
  <p><i>Secure and Transparent Token Locking Dashboard</i></p>
</div>

## Technical Stack

- **Frontend**: React, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: TanStack Query

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables (DATABASE_URL)
4. Push the schema: `npm run db:push`
5. Start the development server: `npm run dev`
