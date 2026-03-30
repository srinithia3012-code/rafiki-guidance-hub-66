# Rafiki AI - Student Guidance & Wellbeing Assistant

Rafiki AI is a comprehensive student support platform designed to provide personalized guidance, academic planning, career advice, and wellbeing resources for university students.

## 🌟 Features

### General Capabilities
- **AI-Powered Chat Interface**: Natural conversation with contextual understanding of student needs
- **Authentication System**: Secure login with Google, LinkedIn, or email/password
- **Responsive Design**: Fully responsive interface that works on all devices

### Academic & Career Guidance
- **Career Assessment Tools**: Discover suitable career paths based on interests and strengths
- **Job Market Insights**: View industry trends, job availability, and salary information
- **Resume & Interview Preparation**: Tools to enhance job application readiness
- **Educational Resources**: Access courses and certifications relevant to career goals
- **Skill Development Plans**: Personalized roadmaps for developing professional skills

### Mental Wellbeing Support
- **Emotional Support**: 24/7 AI counseling for stress, anxiety, and emotional challenges
- **Wellbeing Assessment**: Evaluate mental and emotional health through guided assessments
- **Stress Management Techniques**: Evidence-based strategies for managing academic pressure
- **Mindfulness Practices**: Guided meditation and mindfulness exercises
- **Crisis Resources**: Access to emergency resources and professional support options
- **Mood Tracking**: Monitor emotional patterns over time

### Core Pages
- **`/` (Index/Login)**: Landing page for guests, handling authentication.
- **`/dashboard`**: Main dashboard for logged-in users.
- **`/chat`**: Interface for interacting with the AI assistant.
- **`/career`**: Provides career assessment tools, job market insights, and resources.
- **`/wellbeing`**: Offers wellbeing assessments, stress management techniques, and support resources.
- **`/assessments`**: Lists available career and wellbeing assessments.
- **`/assessments/:assessmentId`**: Page for taking a specific assessment.
- **`/assessment-results`**: Displays the results of completed assessments.

## 🚀 Technology Stack
- **Frontend**: React, TypeScript, Vite
- **Styling**: TailwindCSS, shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **AI Integration**: Custom AI models for conversation and sentiment analysis

## 📋 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Supabase account (for authentication and database)
- AI service API keys (if deploying your own instance)

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd rafiki-ai
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Configure environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_AI_API_KEY=your_ai_service_key
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:8080](http://localhost:8080) in your browser to view the application

### Mental Health Forum - Detailed Setup

**Project Title:** Mental Health Forum

1. Installation
   ```bash
   git clone <repository_url>
   ```

2. Open in VS Code
   ```bash
   code .
   ```

3. Install Dependencies
   ```bash
   npm install
   ```

4. Configure Environment Variables
   Create a `.env` file in the root directory and add:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```
   These environment variables are required to connect the application with Supabase and OpenAI services.

5. Run the Project
   ```bash
   npm run dev
   ```
   Then open `http://localhost:8080`.

6. Push Changes to GitHub
   ```bash
   git status -sb
   git add -A
   git commit -m "Your message"
   git push
   ```

#### How to Find Environment Variables

1. `VITE_SUPABASE_URL`
   Steps:
   1. Go to https://supabase.com
   2. Log in to your Supabase account
   3. Select your project
   4. In the left sidebar, click Project Settings
   5. Go to API
   6. Under Project URL, copy the URL
   Use it as:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   ```

2. `VITE_SUPABASE_ANON_KEY`
   Steps:
   1. Open your Supabase project
   2. Navigate to Project Settings → API
   3. Under Project API Keys
   4. Copy the anon public key
   Use it as:
   ```
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   This key is safe for frontend use but should still not be shared publicly.

3. `VITE_OPENAI_API_KEY`
   Steps:
   1. Go to https://platform.openai.com
   2. Sign in to your OpenAI account
   3. Click your profile icon → View API keys
   4. Click Create new secret key
   5. Copy the generated API key
   Use it as:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```
   Keep this key private and do not commit it to GitHub.

### Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Enable authentication providers (Email, Google, LinkedIn) in the Auth settings
3. Create required database tables:
   - `profiles`: Store user profile information
   - `chats`: Store chat history (optional)
4. Set up Row Level Security policies for data protection
5. Configure authentication redirect URLs in your Supabase project settings

## 🌐 Deployment

The application is configured for easy deployment to multiple platforms:

### Netlify Deployment

1. **Automatic Deployment**: Connect your GitHub repository to Netlify for automatic deployments
   - Netlify will detect the `netlify.toml` configuration file
   - Environment variables are pre-configured in the `netlify.toml` file

2. **Manual Deployment**: Use the Netlify CLI
   ```bash
   # Install Netlify CLI if you haven't already
   npm install -g netlify-cli

   # Login to your Netlify account
   netlify login

   # Deploy to Netlify
   npm run deploy:netlify
   ```

### Vercel Deployment

1. **Automatic Deployment**: Connect your GitHub repository to Vercel for automatic deployments
   - Vercel will detect the `vercel.json` configuration file
   - Environment variables are pre-configured in the `vercel.json` file

2. **Manual Deployment**: Use the Vercel CLI
   ```bash
   # Install Vercel CLI if you haven't already
   npm install -g vercel

   # Login to your Vercel account
   vercel login

   # Deploy to Vercel
   npm run deploy:vercel
   ```

### GitHub Pages

- The repository is already configured with GitHub Actions for automated deployment
- See the `.github/workflows/ci-cd.yml` file for configuration details

### Custom Domain

- Configure DNS settings to use your own domain with any of the above platforms
- Follow the platform-specific instructions for adding a custom domain

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Rafiki AI Team

## 💬 Support

For support, email support@rafiki-ai.com or create an issue in this repository.
