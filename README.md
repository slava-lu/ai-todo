# Next.js basic boilerplate

This is a basic template to learn all the key concepts of the modern React full stack app based on Next.js 14.  
For a production ready advanced template please use the [advanced boilerplate](https://bitbucket.svc.elca.ch/projects/WEBCC/repos/nextjs-advanced-boilerplate/browse). 

## Features

- TypeScript
- App router
- React Server Components
- Server Actions with the new React hooks `useFormState` and `useFormStatus`
- PostgreSQL with raw SQL queries to manipulate database directly without API
- [shadcn/ui](https://ui.shadcn.com/) library based on [Tailwind CSS](https://tailwindcss.com/)  and [Radix UI](https://www.radix-ui.com/)
- Internationalization with [next-intl](https://next-intl-docs.vercel.app/) including the translations and a language switcher

## Online Demo
https://elca-nextjs-boilerplate-simple.vercel.app


## Getting Started Locally

- Create a Postgres database, add the database credentials in `.env` file. Do not change the variables names.
- Create the table using `/db_init.sql` file
- Install dependencies with `npm i`

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



