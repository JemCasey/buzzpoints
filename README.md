# Buzzpoints

Buzzpoints is a tool that uses a web app to visualize advanced stats for quizbowl tournaments run using [MODAQ](https://www.quizbowlreader.com/). The `buzzpoints` app reads a database file created using the [`buzzpoint-migrator`](https://github.com/JemCasey/buzzpoint-migrator/) tool.

Examples of sites that utilize and/or are built via the Buzzpoints toolset include:

* [buzzpoints.vercel.app](https://buzzpoints.vercel.app)
* [College Quizbowl Stats - Detailed Stats](https://quizbowlstats.com/buzzpoints)
* [Film Set Buzzpoints](https://film-sets.vercel.app)
* [2025 ACF Regionals](https://2025-regionals.vercel.app)

## Get Started

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

1. [Clone this repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository#cloning-a-repository) via SSH, HTTPS, or downloading as a zip.
   * Cloning via SSH is recommended, as [setting up SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) at this step can save you a lot of time later.
2. [Install `Node.js` and `npm`](https://nodejs.org/en/download) on your system if they're not already installed.
   * `Node.js` version `22.12.0` is the recommended version.
3. Open a bash shell (e.g. Terminal), go to the root directory of your repository, and run `npm install`.
   * This command will install all the necessary libraries within the `node_modules/` folder of your repository.
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
   * If another local deployment is already running, the process may pick a different local port instead of `3000`.

You shouldn't need to modify anything at this point, so if something is broken, double-check your data in the migrator directory.

If you want to debug or develop new features, the source files for the backend are in `/src/app/`. The live local deployment auto-updates as you edit each file.

## Web Deployment

The easiest way to share your buzzpoints publicly is to create an online web app using the [Vercel platform](https://vercel.com/new) by the creators of Next.js.

### GitHub Repository

* Once you have verified your site builds properly, commit your changes in your local version of this repository with your sets' `database.db` file.
* On GitHub, create a **private** repository.
  * See the [Optional Extra Security](#optional-extra-security) section for optional additional actions at this step to further protect your repository if desired.
* Push your local repository to the newly created private GitHub repository.
  * There are a number of tutorials for creating, committing, and pushing to a remote repository:
    * [GitHub documentation](https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository)
    * [Git SCM tutorial](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)
* After pushing, your repository should look *identical to this one*, just with an additional `data/` folder containing `database.db`. *If your repository looks different, your site will not build properly.*

### Vercel

It's recommended to create a Vercel account. The simplest way to do this is to use your GitHub account to [login to Vercel](https://vercel.com/login).

Once logged into Vercel, create a site by [importing your private buzzpoints repository](https://vercel.com/new) as a Vercel project.

> [!TIP]
> You only have to do this once. The project and site will automatically re-build and update whenever you push a new commit to the private buzzpoints repository.

![Example of importing a repository into Vercel](/example/vercel-import.png)

> [!TIP]
> If you don't see your repository, click `Adjust GitHub App Permissions` and use the popup wizard to add the repository to the collection of repositories Vercel has access to.

![Example of deploying a repository in Vercel](/example/vercel-deploy.png)

> [!IMPORTANT]
> To password-protect your site, add `BASIC_AUTH_PASSWORD` as an environment variable with the password as its value, as shown in the image. See the [Security](#security) for more details.

See the [Vercel documentation](https://vercel.com/docs/frameworks/nextjs) for any clarification on instructions. You may have to modify the Node.js version of the build to be `20.x` in the package (since this is what the package uses).

### Security

#### Password Protection

> [!TIP]
> The recommended way to secure your site is by password-protecting it using a Vercel Environment Variable.

To password-protect your site, add `BASIC_AUTH_PASSWORD` as an Environment Variable with the password as its value. It's easiest to do this in the import wizard, as shown in the image above, but you can do this even after the site has already been deployed. See the [Vercel documentation](https://vercel.com/docs/environment-variables) for more details.

There is no username for the password protection. Leave the username field blank and fill in the password only.

To remove password protection, delete the environment variable from the Vercel project and re-deploy the project.

For local testing of the password protection, you can set the following environment variable in your shell before starting the app:

```sh
export BASIC_AUTH_PASSWORD=mypassword123!
```

This will create an `.env` file in the root of the repository containing the password as an environment variable.

> [!CAUTION]
> Not only is committing the `.env` file to your repository's root strongly discouraged, but doing so will password-protect your **local** deployment *only*, not the published site. Vercel ignores any `.env` file in the repository and only references its system's own environment variables.

### Optional Extra Security

> [!NOTE]
> The following directions are for further security for your site. These steps are no longer explicitly necessary, but can still be taken if you want to be extra careful.

* If your set is not clear and you want to increase the security of your deployment, use a non-easily-guessable name for your private repository.
* E.g., if your set is called `2025 Question Set` you could name the repository `2025-question-set-STRING` where `STRING` is a string of your choice:
  * A random alphanumeric string like `xyz123`
  * A long word or name

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

## Credits

This tool was created by [Jordan Brownstein](https://github.com/JemCasey/). [Ani Perumalla](https://github.com/ani-per/) contributed some features after its initial development.

[Ryan Rosenberg](https://github.com/ryanrosenberg), [Geoffrey Wu](https://github.com/geoffrey-wu), and [Ophir Lifshitz](https://github.com/hftf) have helped debug and develop new features.

[William Horton](https://github.com/wdhorton) added the password protection functionality.
