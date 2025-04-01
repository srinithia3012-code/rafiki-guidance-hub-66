# CI/CD Pipeline Explanation

This document explains the GitHub Actions CI/CD pipeline defined in `.github/workflows/ci-cd.yml`.

## Overview

The pipeline automates the process of building and deploying the frontend of your Vite application to GitHub Pages.

**Workflow:**

1.  **Trigger:** Runs automatically on every `push` to the `main` branch and on any `pull_request` targeting the `main` branch.
2.  **Jobs:**
    *   `build-and-deploy`:
        *   Checks out the repository code.
        *   Sets up Node.js (version 20).
        *   Installs dependencies using `npm ci` (clean install).
        *   Creates a temporary `.env` file using secrets configured in the repository.
        *   **(Linting Step Currently Disabled):** The `npm run lint` step is commented out in the workflow to allow deployment despite lint errors.
        *   Builds the production version of the Vite app (`npm run build`), setting the correct `base` URL for GitHub Pages.
        *   Configures GitHub Pages.
        *   Uploads the built `dist` folder as an artifact.
        *   Deploys the uploaded artifact to GitHub Pages.

## Required Setup

For this pipeline to deploy successfully, you **must** configure the following in your GitHub repository:

**1. GitHub Repository Secrets:**

   The pipeline requires your Supabase URL and Anon Key to be available during the build process so they can be embedded into the production build.

   *   Navigate to your repository on GitHub.
   *   Go to `Settings` -> `Secrets and variables` -> `Actions`.
   *   Under `Repository secrets`, click `New repository secret`.
   *   Create a secret named `VITE_SUPABASE_URL` and paste your **production** Supabase URL as the value.
   *   Create another secret named `VITE_SUPABASE_ANON_KEY` and paste your **production** Supabase Anon Key as the value.
   *   **Important:** Ensure these values match the ones Supabase provides for your *live* project, not your local development keys.
   *   If your application build requires other environment variables prefixed with `VITE_`, add them as secrets here as well.

**2. Enable GitHub Pages:**

   *   Navigate to your repository on GitHub.
   *   Go to `Settings` -> `Pages`.
   *   Under `Build and deployment`, select `GitHub Actions` as the `Source`.

## How It Works

*   **Push to `main`:** When you push code to the `main` branch, the `build-and-deploy` job will automatically run. If the build step is successful, the new version of your site will be deployed to GitHub Pages.
*   **Pull Request:** When you open a pull request targeting the `main` branch, the workflow will run the install and build steps (but not deploy) to check for build errors before merging.
*   **Accessing the Deployed Site:** After a successful deployment, you can find the URL to your live site in:
    *   The `environment:` section of the workflow run logs on GitHub Actions.
    *   The `Pages` section of your repository settings.
    *   The URL format is typically `https://<your-github-username>.github.io/<your-repo-name>/`.

## Notes and Considerations

*   **Linting Disabled:** The code linting step (`npm run lint`) is currently disabled in the workflow file (`ci-cd.yml`). It's recommended to eventually fix the lint errors and re-enable this step for better code quality.
*   **Base URL:** The build step (`npm run build -- --base=/${REPO_NAME}/`) is configured specifically for deployment to a subpath on GitHub Pages (e.g., `/<your-repo-name>/`). If you deploy to a custom domain or the root of `github.io`, you might need to adjust or remove the `--base` flag.
*   **Environment Variables:** Only environment variables prefixed with `VITE_` are exposed to your frontend code by default in Vite. The pipeline creates the `.env` file during the build, ensuring `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY` have the correct production values in the deployed site (assuming the secrets are set).
*   **Supabase Backend/Functions:** This pipeline **only** deploys the static frontend build. Changes to your Supabase database schema, RLS policies, or Edge Functions are **not** deployed by this workflow. These typically need separate deployment processes. 