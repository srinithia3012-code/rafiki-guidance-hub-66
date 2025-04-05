# Rafiki Guidance Hub - Technical Architecture

## 1. Architecture Overview

### 1.1 System Architecture

The Rafiki Guidance Hub follows a modern web application architecture with the following key components:

- **Frontend**: React-based single-page application (SPA)
- **Backend**: Supabase-powered backend services
- **Database**: PostgreSQL database managed by Supabase
- **Authentication**: Supabase Auth with multiple provider support
- **AI Integration**: Edge functions connecting to AI services
- **Storage**: Supabase Storage for file management

### 1.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Browser                           │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      React Frontend (Vite)                      │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │    Pages    │  │  Components │  │      State/Context      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Routing   │  │    Hooks    │  │      UI Components      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Supabase Client                         │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Supabase Backend                           │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │     Auth    │  │  Database   │  │     Edge Functions      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Storage   │  │ Row Security│  │      Realtime API       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      External Services                          │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ Google Auth │  │LinkedIn Auth│  │      Google Gemini      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 2. Frontend Architecture

### 2.1 Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with shadcn/ui components
- **State Management**: React Context API and custom hooks
- **Routing**: React Router v6
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Native fetch API with Supabase client

### 2.2 Frontend Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/             # Base UI components from shadcn
│   ├── career/         # Career-specific components
│   ├── wellbeing/      # Wellbeing-specific components
│   ├── assessment/     # Assessment-related components
│   └── dashboard/      # Dashboard components
├── pages/              # Page components for each route
├── hooks/              # Custom React hooks
├── services/           # Service modules for API interactions
├── integrations/       # External service integrations
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── lib/                # Library code and helpers
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

### 2.3 Component Architecture

- **Atomic Design Principles**: Components organized following atomic design methodology
- **Component Composition**: Emphasis on composition over inheritance
- **Separation of Concerns**: UI components separated from business logic
- **Reusability**: Focus on creating reusable components with clear interfaces

### 2.4 State Management

- **Local Component State**: useState for component-specific state
- **Context API**: React Context for shared state across component trees
- **Custom Hooks**: Encapsulated state logic in custom hooks
- **Service Layer**: Separation of data fetching and state management

## 3. Backend Architecture

### 3.1 Supabase Integration

- **Authentication**: Supabase Auth for user management
- **Database**: PostgreSQL database with Supabase management
- **API**: RESTful and realtime APIs provided by Supabase
- **Storage**: File storage for user uploads
- **Edge Functions**: Serverless functions for custom backend logic

### 3.2 Database Schema

#### Users and Profiles
```
auth.users                  # Managed by Supabase Auth
profiles                    # Extended user profile information
  - id
  - user_id (FK to auth.users)
  - display_name
  - avatar_url
  - created_at
  - updated_at
```

#### Career-Related Tables
```
career_profiles
  - id
  - user_id (FK to auth.users)
  - interests (array)
  - skills (array)
  - education_level
  - preferred_industries (array)
  - created_at
  - updated_at

job_applications
  - id
  - user_id (FK to auth.users)
  - company_name
  - position
  - application_date
  - status
  - next_steps
  - notes
  - created_at
  - updated_at
```

#### Assessment-Related Tables
```
assessment_results
  - id
  - user_id (FK to auth.users)
  - assessment_id
  - assessment_type
  - answers (jsonb)
  - score (jsonb)
  - completed_at
  - created_at
```

#### Wellbeing-Related Tables
```
mood_entries
  - id
  - user_id (FK to auth.users)
  - rating
  - notes
  - created_at

wellbeing_resources
  - id
  - title
  - description
  - category
  - url
  - created_at
```

#### Chat-Related Tables
```
chat_history
  - id
  - user_id (FK to auth.users)
  - message
  - response
  - category
  - created_at
```

### 3.3 API Structure

- **RESTful Endpoints**: Standard CRUD operations for all resources
- **Row-Level Security**: Policies to ensure users can only access their own data
- **Realtime Subscriptions**: For live updates to relevant data
- **Edge Functions**: For complex operations and external service integration

## 4. Authentication and Authorization

### 4.1 Authentication Methods

- **Email/Password**: Traditional email and password authentication
- **Google OAuth**: Sign in with Google accounts
- **LinkedIn OAuth**: Sign in with LinkedIn accounts
- **Magic Link**: Passwordless email authentication

### 4.2 Authorization Model

- **Row-Level Security (RLS)**: Database-level security policies
- **JWT Tokens**: JSON Web Tokens for authentication
- **Role-Based Access**: Different access levels based on user roles
- **API Authorization**: Proper authorization checks for all API endpoints

## 5. AI Integration

### 5.1 AI Services

- **Google Gemini**: Primary AI model for chat functionality
- **Edge Function Integration**: Serverless functions to connect to AI services
- **Context Management**: Handling of conversation context and user data

### 5.2 AI Features

- **Natural Language Understanding**: Processing and understanding user queries
- **Personalized Responses**: Tailored responses based on user profile and history
- **Sentiment Analysis**: Detection of user sentiment for appropriate responses
- **Recommendation Generation**: AI-powered recommendations for career and wellbeing

## 6. Data Flow

### 6.1 User Authentication Flow

1. User initiates authentication via UI
2. Authentication request sent to Supabase Auth
3. Supabase processes authentication with selected provider
4. JWT token returned to client
5. Client stores token and includes it in subsequent requests
6. User profile loaded based on authenticated user ID

### 6.2 Chat Interaction Flow

1. User sends message through chat interface
2. Message sent to Supabase Edge Function
3. Edge Function forwards request to AI service with context
4. AI service generates response
5. Response returned to client via Edge Function
6. Chat history updated in database
7. Response displayed to user

### 6.3 Assessment Flow

1. User selects assessment to take
2. Assessment questions loaded from predefined set or database
3. User completes assessment questions
4. Answers submitted to backend
5. Results calculated and stored
6. Results displayed to user with recommendations

## 7. Deployment Architecture

### 7.1 Deployment Environments

- **Development**: Local development environment
- **Staging**: Pre-production environment for testing
- **Production**: Live environment for end users

### 7.2 Deployment Process

- **CI/CD Pipeline**: GitHub Actions for automated builds and deployments
- **Frontend Deployment**: Static assets deployed to GitHub Pages
- **Backend Deployment**: Supabase project with appropriate configuration
- **Environment Configuration**: Environment-specific variables and settings

## 8. Security Architecture

### 8.1 Security Measures

- **HTTPS**: Secure communication for all traffic
- **Authentication Security**: Secure authentication with industry standards
- **Data Encryption**: Encryption of sensitive data
- **Input Validation**: Thorough validation of all user inputs
- **CORS Configuration**: Proper Cross-Origin Resource Sharing settings
- **Content Security Policy**: Appropriate CSP headers

### 8.2 Privacy Considerations

- **Data Minimization**: Collection of only necessary data
- **User Consent**: Clear consent mechanisms for data collection
- **Data Retention**: Appropriate data retention policies
- **Data Access**: User control over their own data

## 9. Monitoring and Logging

### 9.1 Monitoring Strategy

- **Application Monitoring**: Frontend and backend performance monitoring
- **Error Tracking**: Capture and notification of application errors
- **Usage Analytics**: Tracking of feature usage and user behavior
- **Performance Metrics**: Monitoring of key performance indicators

### 9.2 Logging Approach

- **Structured Logging**: Consistent, structured log format
- **Log Levels**: Appropriate log levels for different types of information
- **Log Storage**: Secure storage and retention of logs
- **Log Analysis**: Tools and processes for log analysis

## 10. Development Workflow

### 10.1 Version Control

- **Git Workflow**: Feature branch workflow with pull requests
- **Commit Conventions**: Consistent commit message format
- **Code Review**: Mandatory code review process
- **Release Management**: Versioned releases with changelogs

### 10.2 Development Process

- **Issue Tracking**: Tracking of features, bugs, and tasks
- **Development Standards**: Coding standards and best practices
- **Testing Requirements**: Unit, integration, and end-to-end testing
- **Documentation**: Code documentation and technical documentation

## 11. Performance Optimization

### 11.1 Frontend Optimization

- **Code Splitting**: Dynamic loading of code chunks
- **Asset Optimization**: Compression and optimization of assets
- **Caching Strategy**: Appropriate caching of static assets
- **Rendering Optimization**: Efficient component rendering

### 11.2 Backend Optimization

- **Database Indexing**: Proper indexes for query performance
- **Query Optimization**: Efficient database queries
- **Caching**: Strategic caching of expensive operations
- **Rate Limiting**: Protection against abuse through rate limiting

## 12. Scalability Considerations

### 12.1 Horizontal Scaling

- **Stateless Design**: Stateless components for easier scaling
- **Load Balancing**: Distribution of traffic across instances
- **Database Scaling**: Strategies for database scaling

### 12.2 Vertical Scaling

- **Resource Optimization**: Efficient use of available resources
- **Performance Tuning**: Optimization for better resource utilization
- **Capacity Planning**: Proactive planning for resource needs

## 13. Disaster Recovery

### 13.1 Backup Strategy

- **Database Backups**: Regular backups of all database data
- **Configuration Backups**: Backup of all configuration settings
- **Backup Testing**: Regular testing of backup restoration

### 13.2 Recovery Procedures

- **Incident Response**: Defined procedures for handling incidents
- **Recovery Time Objectives**: Targets for recovery time
- **Recovery Point Objectives**: Targets for data loss limitations
- **Failover Mechanisms**: Procedures for service failover
