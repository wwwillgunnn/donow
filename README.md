# DoNow!

A simple full-stack Todo application built with **Next.js 15 (App Router)**, **TypeScript**, **Prisma**, and **shadcn/ui**.  
It demonstrates how to:

- Create, edit, toggle, and delete todos
- Use **React Hook Form + Zod** for form validation
- Use **shadcn/ui** components (`Dialog`, `Input`, `Button`, `Checkbox`)
- Implement **optimistic UI updates**
- Integrate with a **Prisma database** through Next.js API routes

---

## 🚀 Features

- **Add Todos** — enter a task, validate with Zod, and submit.
- **Edit Todos** — inline modal dialog with form validation.
- **Delete Todos** — remove instantly with server sync.
- **Toggle Complete** — mark todos complete/incomplete with a checkbox and strikethrough styling.
- **Optimistic UI** — checkbox updates instantly while persisting in the database.
- **Responsive UI** — styled with Tailwind + shadcn/ui.

---

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for validation
- [shadcn/ui](https://ui.shadcn.com/) for components
- [Prisma](https://www.prisma.io/) ORM
- [SQLite](https://www.sqlite.org/) (default, or swap to PostgreSQL/MySQL)
- [Axios](https://axios-http.com/) for HTTP requests
- [TailwindCSS](https://tailwindcss.com/) for styling

![App Preview](image.png)
