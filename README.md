# Buzzpoints
Buzzpoints is a tool that allows one to create and visualize advanced stats for quizbowl tournaments run using MODAQ. This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To use this project to create advanced stat visualizations for your own tournament, do the following: 
1. Run your quizbowl tournament, using MODAQ to collect qbj files for each game
2. Use the [buzzpoint migrator] to extract the buzzpoints into a database. This file will have the name `database.db` and live in the root folder of the directory.
3. Clone this repository locally, and copy the generated database into the `data/` folder.

After these steps the stats should be able to be visualized locally. If you want the buzzpoints to be public, they can be deployed as a website using Vercel. Please see below for more instructions about both of these.

## Deployment Details
After these steps the stats should be able to be visualized locally.

First, run the development server (you may have to first install [Next.js](https://nextjs.org/docs/app/getting-started/installation#manual-installation) - follow the manual installation instructions):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file. This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploying Publically using Vercel
The easiest way to deploy the website in order to be able to share the buzzpoints publically is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Next.js details

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
