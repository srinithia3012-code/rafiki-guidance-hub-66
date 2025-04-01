# How to Use the CI/CD Pipeline

This document explains how to set up and use the GitHub Actions CI/CD pipeline defined in `.github/workflows/ci-cd.yml`.

## Overview

The pipeline automates the process of testing, building, and deploying the frontend of your Vite application to GitHub Pages.

**Workflow:**

1.  **Trigger:** Runs automatically on every `push` to the `main` branch and on any `pull_request` targeting the `main` branch.
2.  **Jobs:**
    *   `build-and-deploy`:
        *   Checks out the repository code.
        *   Sets up Node.js (version 20).
        *   Installs dependencies using `npm ci` (clean install).
        *   Creates a temporary `.env` file using secrets configured in the repository.
        *   Runs the linter (`npm run lint`).
        *   Builds the production version of the Vite app (`npm run build`), setting the correct `base` URL for GitHub Pages.
        *   Configures GitHub Pages.
        *   Uploads the built `dist` folder as an artifact.
        *   Deploys the uploaded artifact to GitHub Pages.

## Setup Steps

To enable and use this pipeline, follow these steps:

**1. GitHub Repository Secrets:**

   The pipeline requires your Supabase URL and Anon Key to be available during the build process so they can be embedded into the production build. These **must** be stored as encrypted secrets in your GitHub repository settings.

   *   Navigate to your repository on GitHub.
   *   Go to `Settings` -> `Secrets and variables` -> `Actions`.
   *   Under `Repository secrets`, click `New repository secret`.
   *   Create a secret named `VITE_SUPABASE_URL` and paste your **production** Supabase URL as the value.
   *   Create another secret named `VITE_SUPABASE_ANON_KEY` and paste your **production** Supabase Anon Key as the value.
   *   **Important:** Ensure these values match the ones Supabase provides for your *live* project, not your local development keys.
   *   If your application build requires other environment variables prefixed with `VITE_`, add them as secrets here as well.

**2. Enable GitHub Pages:**

   The pipeline deploys to GitHub Pages.

   *   Navigate to your repository on GitHub.
   *   Go to `Settings` -> `Pages`.
   *   Under `Build and deployment`, select `GitHub Actions` as the `Source`.
   *   (You might need to trigger the workflow once by pushing to `main` for the deployment options to fully appear).

**3. Commit and Push the Workflow File:**

   *   Make sure the `.github/workflows/ci-cd.yml` file created by the assistant is committed to your repository.
   *   Push your changes to the `main` branch on GitHub.

## How It Works

*   **Push to `main`:** When you push code to the `main` branch, the `build-and-deploy` job will automatically run. If the build and lint steps are successful, the new version of your site will be deployed to GitHub Pages.
*   **Pull Request:** When you open a pull request targeting the `main` branch, the workflow will run the install, lint, and build steps (but not deploy) to ensure the changes integrate correctly and pass checks before merging.
*   **Accessing the Deployed Site:** After a successful deployment, you can find the URL to your live site in:
    *   The `environment:` section of the workflow run logs on GitHub Actions.
    *   The `Pages` section of your repository settings.
    *   The URL format is typically `https://<your-github-username>.github.io/<your-repo-name>/`.

## Notes and Considerations

*   **Base URL:** The build step (`npm run build -- --base=/${REPO_NAME}/`) is configured specifically for deployment to a subpath on GitHub Pages (e.g., `/<your-repo-name>/`). If you deploy to a custom domain or the root of `github.io`, you might need to adjust or remove the `--base` flag.
*   **Environment Variables:** Only environment variables prefixed with `VITE_` are exposed to your frontend code by default in Vite. The pipeline creates the `.env` file during the build, ensuring `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY` have the correct production values in the deployed site.
*   **Supabase Backend/Functions:** This pipeline **only** deploys the static frontend build. Changes to your Supabase database schema, RLS policies, or Edge Functions are **not** deployed by this workflow. These typically need separate deployment processes, potentially using the [Supabase CLI](https://supabase.com/docs/guides/cli) in a different workflow or manual updates via the Supabase dashboard.
*   **Linting:** The `npm run lint` step helps maintain code quality. If the linter finds errors, the build will fail, preventing deployment of broken code. 