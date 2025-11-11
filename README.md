# Buzzpoints

Buzzpoints is a tool that uses a web app to visualize advanced stats for quizbowl tournaments run using [MODAQ](https://www.quizbowlreader.com/). The `buzzpoints` app reads a database file created using the [`buzzpoint-migrator`](https://github.com/JemCasey/buzzpoint-migrator/) tool.

Examples of sites that utilize and/or are built via the Buzzpoints toolset include:

* [buzzpoints.vercel.app](https://buzzpoints.vercel.app)
* [College Quizbowl Stats - Detailed Stats](https://quizbowlstats.com/buzzpoints)
* [Film Set Buzzpoints](https://film-sets.vercel.app)

To create advanced stat visualizations for your own tournament, do the following:

1. Run your quizbowl tournament, using [MODAQ](https://www.quizbowlreader.com/) to collect QBJ files for each game.
2. Use the [buzzpoint migrator](https://github.com/JemCasey/buzzpoint-migrator/) to generate a database file (`database.db`) from the QBJ files.
3. Clone or download this repository locally.
4. Copy the generated database from the `buzzpoint-migrator` folder into this repository's `data/` folder.
5. Follow the [local deployment steps](#local-deployment) below to visualize your stats on your own machine.
   * The local deployment interface will resemble [buzzpoints.vercel.app](https://buzzpoints.vercel.app).
   * If there are any errors, try debugging by checking the migrator folder database generation and/or [visualizing the database file manually](https://inloop.github.io/sqlite-viewer/).
   * If you're unable to fix the error on your own, [file an issue](#issues).
6. If desired, use [Vercel](https://vercel.com/) to host the stats online by following the [web deployment steps](#web-deployment) below.

## Local Deployment

1. Clone this repository via SSH, HTTPS, or downloading as a zip.
2. [Install `Node.js` and `npm`](https://nodejs.org/en/download) on your system if they're not already installed.
   * `Node.js` version `22.12.0` is the recommended version.
3. Open a bash shell (e.g. Terminal), go to the root directory, and run `npm install`.
   * This command will install all the necessary libraries.
4. Run the development server locally:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   * You may have to first install [Next.js](https://nextjs.org/docs/app/getting-started/installation#manual-installation) - follow the manual installation instructions.
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the live local deployment.

You shouldn't need to modify anything at this point, so if something is broken, double-check your data in the migrator directory.

If you want to develop new features, the source files for the backend are in `/src/app/`. The live local deployment auto-updates as you edit each file.

## Web Deployment

The easiest way to share your buzzpoints publicly is to create an online web app using the [Vercel platform](https://vercel.com/new) by the creators of Next.js.

* Once you have verified your site builds properly, commit your changes and push your local version of this repository to a **private** buzzpoints GitHub repository.
  * If your set is not clear and you want to increase the security of your deployment, use a non-easily-guessable name for that repository.
  * E.g., if your set is called `2025 Question Set` you could name the repository `2025-question-set-STRING` where `STRING` is a string of your choice:
    * A random alphanumeric string like `xyz123`
    * A long word or name
  * Alternatively, you can share the per-commit version of your site once it's built.
* It's recommended that you should create a Vercel account. The simplest way to do this is to use your GitHub account to login to Vercel.
* Once logged into Vercel, create a site by [importing your private buzzpoints repository](https://vercel.com/new).
  * You only have to do this once. The site will automatically update whenever you push a new commit to the private buzzpoints repository.

See the [Vercel documentation](https://vercel.com/docs/frameworks/nextjs) for any clarification on instructions. You may have to modify the Node.js version of the build to be `20.x` in the package (since this is what the package uses).

### Next.js

Buzzpoints is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

* [Next.js Documentation](https://nextjs.org/docs)
  * Learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn)
  * An interactive Next.js tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions there are welcome!

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Issues

To request bug fixes and/or new features, [file an Issue](https://github.com/JemCasey/buzzpoints/issues/new/choose).

## Contributing

To contribute to or develop this toolset, please [fork the repository](https://github.com/JemCasey/buzzpoints/fork) and [submit a Pull Request](https://github.com/JemCasey/buzzpoints/compare).
