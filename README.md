# ContentFlow

ContentFlow is a modern, premium social media content calendar and management workspace. Designed with a sleek, high-end SaaS aesthetic, it empowers creators to brainstorm ideas, draft posts with AI assistance, and seamlessly schedule their content calendar.

## ✨ Features

- **Dynamic Content Calendar:** Track your scheduled posts, review due dates, and monitor your daily agenda.
- **Ideas Bank:** A dedicated workspace to drop rapid-fire ideas, tag them, and save them for later refinement.
- **Content Studio:** An interactive editor where you can draft your posts.
- **AI Brainstorming:** Integrated AI (powered by Google Gemini) to generate fresh post concepts when you hit writer's block.
- **Premium UI:** A stunning, modern interface featuring smooth micro-animations, glassmorphism (`backdrop-blur`), and a seamless Light/Dark mode tailored with Tailwind CSS v4.
- **Secure Authentication:** Managed authentication with secure login flows.

---

## 🛠 Technical Architecture

ContentFlow is built on a bleeding-edge modern web stack designed for performance, type safety, and scalability.

### Tech Stack
- **Framework:** [Next.js (App Router)](https://nextjs.org/) - React framework for SSR and optimized routing.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS with native CSS variable theming.
- **Database:** [Neon (Serverless Postgres)](https://neon.tech/) - High-performance, scalable PostgreSQL.
- **ORM:** [Prisma](https://www.prisma.io/) - Strongly typed database client and schema management.
- **Authentication:** [Neon Managed Auth](https://neon.tech/docs/guides/neon-auth) - Powered by Better Auth, deeply integrated into the Neon ecosystem using the `@neondatabase/neon-js` SDK.
- **AI:** Google Gemini API for generative AI workflows.

### System Design Highlights
- **Client/Server Boundary:** The application makes careful use of Next.js Server Components and Client Components to ensure fast page loads while maintaining interactive UI elements.
- **Authentication Flow:** Authentication is managed fully by Neon. The Next.js application verifies session state server-side and uses the `@neondatabase/neon-js` UI provider (`<NeonAuthUIProvider>`) for frontend login states and session management.
- **Prisma Schema:** `User`, `Post`, and `Idea` models are managed via Prisma, ensuring end-to-end type safety from the database to the React frontend.

---

## 🚀 Local Development Setup

Follow these steps to run ContentFlow on your local machine.

### 1. Clone & Install
Ensure you have Node.js (v20+) installed.
```bash
git clone https://github.com/your-username/contentflow.git
cd contentflow
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root of the project and add your configuration strings. You will need a Neon Postgres Database and a Gemini API Key.

```env
# Neon Database Connection String
DATABASE_URL="postgresql://neondb_owner:...@...aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Neon Managed Auth Endpoint
NEXT_PUBLIC_NEON_AUTH_URL="https://....neonauth....aws.neon.tech/neondb/auth"

# Google Gemini API Key for AI features
GEMINI_API_KEY="your_gemini_api_key_here"
```

### 3. Sync Database Schema
Push the Prisma schema to your Neon database to create the necessary tables for Posts and Ideas.
```bash
npx prisma db push
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. You will be prompted to sign in using the Neon Auth flow. Once authenticated, you will be redirected to your empty workspace.

---

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Ensure that you run `npm run build` locally to verify that all Next.js type checks pass before submitting a PR.
