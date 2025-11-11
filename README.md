# Buzzpoints

Buzzpoints is a tool that uses a web app to visualize advanced stats for quizbowl tournaments run using [MODAQ](https://www.quizbowlreader.com/).

Buzzpoints is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Examples of sites that utilize and/or are built via the Buzzpoints toolset include:

* [buzzpoints.vercel.app](https://buzzpoints.vercel.app)
* [College Quizbowl Stats - Detailed Stats](https://quizbowlstats.com/buzzpoints)
* [Film Set Buzzpoints](https://film-sets.vercel.app)

To create advanced stat visualizations for your own tournament, do the following:

1. Run your quizbowl tournament, using [MODAQ](https://www.quizbowlreader.com/) to collect QBJ files for each game.
2. Use the [buzzpoint migrator](https://github.com/JemCasey/buzzpoint-migrator/) to generate a database file (`database.db`) from the QBJ files.
3. Clone this repository locally, and copy the generated database from the `buzzpoint-migrator` folder into this repository's `data/` folder.
4. Follow the [local deployment steps](#local-deployment) below to visualize your stats on your own machine.
   * The local deployment interface will resemble [buzzpoints.vercel.app](https://buzzpoints.vercel.app).
   * If there are any errors, try debugging by checking the migrator folder database generation and/or [visualizing the database file manually](https://inloop.github.io/sqlite-viewer/).
   * If you're unable to fix the error on your own, [file an issue](#issues).
5. If desired, use Vercel to host the stats online by following the [web deployment steps](#web-deployment-using-vercel) below.

## Local Deployment

Run the development server. You may have to first install [Next.js](https://nextjs.org/docs/app/getting-started/installation#manual-installation) - follow the manual installation instructions.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the live local deployment.

You shouldn't need to modify anything at this point, so if something is broken, double-check your data in the migrator directory.

If you want to develop new features, the source files for the backend are in `/src/app/`. The live local deployment auto-updates as you edit each file.

## Web Deployment using Vercel

The easiest way to deploy the website in order to be able to share the buzzpoints publicly is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

It's recommended that you should create a Vercel account. The simplest way to do this is to use your GitHub account to login to Vercel.

See the [Vercel documentation](https://vercel.com/docs/frameworks/nextjs) for instructions on how to deploy using Vercel once you login. You may have to modify the Node.js version of the build to be `20.x` in the package (since this is what the package uses).

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Next.js details

To learn more about Next.js, take a look at the following resources:

* [Next.js Documentation](https://nextjs.org/docs)
  * Learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn)
  * An interactive Next.js tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions there are welcome!

## Issues

To request bug fixes and/or new features, [file an Issue](https://github.com/JemCasey/buzzpoints/issues/new/choose).

## Contributing

To contribute to or develop this toolset, please [fork the repository](https://github.com/JemCasey/buzzpoints/fork) and [submit a Pull Request](https://github.com/JemCasey/buzzpoints/compare).
