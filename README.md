# ContentFlow

ContentFlow is a modern, mobile-friendly social media content calendar and performance tracker. It helps creators manage their publishing schedule, maintain consistency, and organize ideas—all within a fast and beautiful interface.

## 🚀 Features

- **Content Calendar:** Visualize your publishing schedule with monthly and weekly grids.
- **Drag & Drop Organization:** Easily move posts across dates to manage your pipeline.
- **Idea Bank:** Store content ideas, categorize them by content pillars, and convert them to scheduled posts with one click.
- **Customizable Creator Profile:** Set your niche, active platforms (Instagram, TikTok, YouTube, etc.), and track your consistency against a weekly target.
- **Analytics & Metrics:** Log performance metrics (views, likes, comments, shares, saves) to see engagement rates over time.

## 🛠️ Technical Stack

This project is built using modern web development standards to ensure maximum performance and developer experience:

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [Neon (Serverless Postgres)](https://neon.tech/)
- **Authentication:** [Better Auth](https://better-auth.com/) (with Neon DB adapter) & Neon Auth UI

## 📦 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or pnpm
- A Postgres database URL (we recommend Neon.tech)

### Installation

1. **Clone the repository & install dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory and add your connection string and Neon configuration:
   ```env
   DATABASE_URL="postgres://username:password@your-database-host.com/dbname?sslmode=require"
   NEXT_PUBLIC_NEON_AUTH_URL="https://your-neon-auth-url"
   ```

3. **Database Setup**
   Run the Prisma migration to initialize your database schema:
   ```bash
   npx prisma db push
   ```

4. **Run the Development Server**
   Start the app locally with Turbopack:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `src/app/`: Next.js pages, layouts, and Server Actions.
- `src/components/`: Reusable React components organized by domain (`Calendar`, `PostModal`, `Onboarding`, etc.).
- `src/context/`: Global React Context (`AppContext.tsx`) managing optimistic updates and state.
- `prisma/`: Prisma ORM schemas and migrations.
- `src/types.ts`: TypeScript interfaces for the application.

## 🎨 Design Philosophy

ContentFlow aims to be a "normal", human-centric tool. It prioritizes:
- **Clean UI:** No cluttered toolbars or overly "AI-generated" aesthetics. 
- **Performance:** Instant feedback via optimistic UI updates in React State before server mutations complete.
- **Reliability:** Standard form validations and solid database architecture with Postgres.

## 🤝 Contributing

Contributions are welcome! Please ensure that your code adheres to the existing styling standards and passes all TypeScript checks before submitting a PR.
