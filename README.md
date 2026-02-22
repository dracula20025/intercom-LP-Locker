# Intercom LP Locker

Intercom LP Locker is a secure, decentralized application (dApp) designed to provide transparent token locking solutions. Built with a focus on trust and security, it allows project teams and liquidity providers to lock their assets for a specified duration, preventing premature withdrawals and building investor confidence.

## Features

- **Wallet Integration**: Seamlessly connect your Web3 wallet to manage your locks.
- **Token Locking**: Lock any ERC-20/BEP-20 compatible tokens with customizable unlock dates.
- **Transparency**: A public dashboard to view all active locks, including token details, amounts, and unlock schedules.
- **Security**: Built using industry-standard patterns to ensure asset safety.

## Trac Wallet address: trac1cufya0jmmtst7l8zzymvgsyn7hd6acym4m8venz36pcl0ryjgk4s3q00gw
## Overview

<div align="center">
  <img src="https://pin.it/7aGG3U21v" alt="App Screenshot" width="800">
  <p><i>Secure and Transparent Token Locking Dashboard</i></p>
  <img src="https://pin.it/3gLjYm36f" alt="App Screenshot" width="800">
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
