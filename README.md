
# 🤖 Rafiki AI - Student Guidance & Wellbeing Assistant

Rafiki AI is a comprehensive student support platform designed to provide personalized guidance, academic planning, career advice, and wellbeing resources for university students. The name "Rafiki" - Swahili for "friend" - reflects our mission to be a friendly, supportive companion throughout your academic journey.

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

### Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Enable authentication providers (Email, Google, LinkedIn) in the Auth settings
3. Create required database tables:
   - `profiles`: Store user profile information
   - `chats`: Store chat history (optional)
4. Set up Row Level Security policies for data protection
5. Configure authentication redirect URLs in your Supabase project settings

## 🌐 Deployment

The application can be deployed to various platforms:

- **Netlify**: Connect your GitHub repository for automatic deployments
- **Vercel**: Import the project and configure build settings
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Custom Domain**: Configure DNS settings to use your own domain

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
