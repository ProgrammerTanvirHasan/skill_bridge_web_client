# SkillBridge 🎓

**"Connect with Expert Tutors, Learn Anything"**

A full-stack web application that connects learners with expert tutors. This repository is the **client** (Next.js frontend).

---

## Tech Stack

| Layer                  | Technologies                                                                    |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Framework**          | Next.js 16 (App Router)                                                         |
| **UI**                 | React 19, TypeScript, Tailwind CSS 4                                            |
| **Components**         | Radix UI (accordion, dialog, dropdown, navigation, sheet, etc.)                 |
| **Forms & Validation** | TanStack Form, Zod                                                              |
| **Auth**               | Better Auth (client) – backend at `https://skill-server-application.vercel.app` |
| **Utilities**          | class-variance-authority, clsx, tailwind-merge, lucide-react, sonner            |

See [PROJECT.md](./PROJECT.md) for full specification, roles, routes, and API endpoints.

---

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

3. **Backend**

   Ensure the SkillBridge API server is running (e.g. at `https://skill-server-application.vercel.app`) for auth and data. Configure `baseURL` in `src/lib/auth-client.ts` if needed.

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (commonLayout)/     # Public layout (navbar + hero)
│   ├── login/              # Login page
│   ├── register/           # Register page
│   ├── tutors/             # Browse tutors, tutor profile
│   ├── dashboard/          # Student dashboard
│   ├── tutor/              # Tutor dashboard & profile
│   └── admin/              # Admin dashboard & management
├── components/             # React components
├── lib/                    # Auth client, API client, utils
└── types/                  # Shared TypeScript types
```

---

## Scripts

| Command         | Description             |
| --------------- | ----------------------- |
| `npm run dev`   | Start dev server        |
| `npm run build` | Build for production    |
| `npm run start` | Start production server |
| `npm run lint`  | Run ESLint              |

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth](https://www.better-auth.com/)
- [PROJECT.md](./PROJECT.md) – full SkillBridge spec
