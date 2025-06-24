# Bookies | MERN Book Store Frontend

Website URL: https://book-store-pied-psi.vercel.app/

⏳ Please Note:
The backend may take up to 50 seconds to load due to hosting limitations.

This delay happens because the server is hosted on Render's free tier, which automatically puts the service to sleep after 15 minutes of inactivity. When a new request comes in, the server needs time to spin back up, causing the delay.

Thank you for your patience!
Backend Repository: https://github.com/KarlieHe/book-store-backend

A modern online bookstore frontend built with React, Redux Toolkit, and Tailwind CSS. This project is part of a MERN stack application.

## Tech Stack

- **React**: UI library for building interactive user interfaces
- **Redux Toolkit**: State management and data fetching (RTK Query)
- **React Router v7**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Fast development server and build tool
- **Heroicons**: Icon set for React
- **Stripe**: Payment integration
- **ESLint**: Linting and code quality

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [Git](https://git-scm.com/)

### Clone the Repository

```sh
git clone https://github.com/KarlieHe/book-store-frontend.git
cd book-store-frontend
```

### Install Dependencies

```sh
npm install
```

### Environment Variables

Manually create a `.env` file:

```
VITE_API_URL=http://localhost:8000
```

### Run the Development Server

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
