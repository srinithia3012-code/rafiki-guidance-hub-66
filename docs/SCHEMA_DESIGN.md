# Rafiki Guidance Hub: Database Schema Design

This document outlines the proposed database schema design for the Rafiki Guidance Hub project, focusing on the Data Layer and supporting the Application Layer's needs.

## 1. Overview & Goals

The database schema is designed to:

*   Persistently store all essential application data (users, profiles, interactions, etc.).
*   Ensure data integrity and consistency through relationships and constraints.
*   Provide efficient data retrieval for the Application Layer (APIs, services).
*   Be scalable and maintainable as the application evolves.
*   Align with the principles outlined in the project requirements, including separation of concerns (Data Layer vs. Application Layer).

## 2. Architectural Context

*   **Data Layer:** This schema represents the core of the Data Layer. Supabase (PostgreSQL) will serve as the centralized database.
*   **Application Layer:** The Application Layer (potentially built using services, controllers adhering to MVC principles, and APIs) will interact with the Data Layer through well-defined interfaces (e.g., Supabase client library, custom data access objects/repositories).
*   **Design Patterns:**
    *   **MVC:** Controllers in the Application Layer will request data from Models (represented by services interacting with these tables).
    *   **Singleton:** Database connections (managed by the Supabase client library) can be considered a Singleton pattern implementation.
    *   **Factory:** Might be used in the Application Layer to create service instances that interact with specific parts of this schema.

## 3. Core Database Tables (Conceptual)

*(Note: This is a conceptual design. Actual implementation in Supabase might use slightly different naming conventions or additional Supabase-specific columns like `created_at`, `updated_at`, primary keys (`id uuid`)).*

**Table: `users` (Managed by Supabase Auth)**

*   Corresponds to Supabase Auth users. Key information is stored here automatically.
*   `id`: UUID (Primary Key, Foreign Key from `auth.users`)
*   `email`: Text
*   `last_sign_in_at`: Timestamp
*   `created_at`: Timestamp
*   *Other Supabase Auth managed fields...*

**Table: `profiles`**

*   Stores public profile information linked to authenticated users.
*   `id`: UUID (Primary Key, Foreign Key referencing `users.id`)
*   `display_name`: Text (Nullable)
*   `photo_url`: Text (Nullable, URL to avatar image)
*   `created_at`: Timestamp
*   `updated_at`: Timestamp

**Table: `career_profiles`**

*   Stores career-specific details for users.
*   `id`: UUID (Primary Key)
*   `user_id`: UUID (Foreign Key referencing `users.id`, Unique, One-to-One with users)
*   `education_level`: Text (Nullable, e.g., "Bachelor's", "Master's")
*   `interests`: Text[] (Array of text, e.g., ["AI", "Web Dev", "UX"])
*   `skills`: Text[] (Array of text, e.g., ["Python", "React", "Figma"])
*   `preferred_industries`: Text[] (Array of text, e.g., ["Technology", "Healthcare"])
*   `created_at`: Timestamp
*   `updated_at`: Timestamp



**Table: `assessments`** (If dynamic assessments are implemented)

*   Stores definitions of available assessments.
*   `id`: UUID (Primary Key)
*   `title`: Text (e.g., "Career Interest Inventory", "Wellbeing Check-in")
*   `description`: Text
*   `type`: Text (e.g., "CAREER", "WELLBEING")
*   `questions`: JSONB (Stores the structure of questions and answers)
*   `created_at`: Timestamp

**Table: `assessment_results`**

*   Stores user submissions for assessments.
*   `id`: UUID (Primary Key)
*   `user_id`: UUID (Foreign Key referencing `users.id`)
*   `assessment_id`: UUID (Foreign Key referencing `assessments.id`)
*   `assessment_type`: Text (Matches `assessments.type` for easier filtering)
*   `answers`: JSONB (Stores the user's answers, matching the structure in `assessments.questions`)
*   `score`: JSONB (Nullable, Stores calculated scores or interpretations)
*   `completed_at`: Timestamp
*   `created_at`: Timestamp

**Table: `wellbeing_interactions`** (Potential for logging/analysis)

*   Stores interactions with the AI in wellbeing contexts for user history or anonymized analysis.
*   `id`: UUID (Primary Key)
*   `user_id`: UUID (Foreign Key referencing `users.id`)
*   `session_id`: UUID (Optional, to group related messages)
*   `user_message`: Text
*   `ai_response`: Text
*   `sentiment_analysis`: JSONB (Nullable, e.g., `{ score: 0.5, label: 'positive' }`)
*   `suggested_resources`: JSONB (Nullable, Links or IDs of resources shown)
*   `category`: Text (e.g., "mental_health", "stress_management")
*   `created_at`: Timestamp

**Table: `mood_entries`** (If Mood Tracking is implemented)

*   Stores daily or periodic mood entries from users.
*   `id`: UUID (Primary Key)
*   `user_id`: UUID (Foreign Key referencing `users.id`)
*   `mood_rating`: Integer (e.g., 1-5)
*   `notes`: Text (Nullable, Optional context from user)
*   `entry_date`: Date (Or Timestamp, depending on desired granularity)
*   `created_at`: Timestamp

## 4. Relationships & Integrity

*   **One-to-One:** `users` <-> `profiles` (via `id`), `users` <-> `career_profiles` (via `user_id`).
*   **One-to-Many:** `users` -> `job_applications`, `users` -> `assessment_results`, `users` -> `wellbeing_interactions`, `users` -> `mood_entries`.
*   **Many-to-Many:** (Potentially between `users` and `resources` if users can save specific resources, requiring a join table like `user_saved_resources`).
*   Foreign key constraints will be used to enforce referential integrity.
*   Appropriate `NOT NULL` constraints will be applied to required fields.

## 5. Indexing Strategy (Preliminary)

To optimize query performance, indexes should be considered for:

*   **Primary Keys:** Automatically indexed.
*   **Foreign Keys:** Columns frequently used in JOINs (`user_id`, `assessment_id`).
*   **Filtering Columns:** Columns often used in `WHERE` clauses (e.g., `job_applications.status`, `assessment_results.assessment_type`, `mood_entries.entry_date`, `wellbeing_interactions.category`).
*   **JSONB Columns:** If specific keys within JSONB fields (`answers`, `score`, `sentiment_analysis`) are frequently queried, GIN indexes might be beneficial.

## 6. Audit Logs & Feedback

*   **Audit Logs:** Supabase provides some level of logging. For more granular application-level auditing (e.g., specific actions taken by users), a dedicated `audit_logs` table could be created:
    *   `id`: UUID
    *   `user_id`: UUID (Nullable if system action)
    *   `action`: Text (e.g., "CREATE_JOB_APP", "UPDATE_PROFILE")
    *   `details`: JSONB (Contextual data)
    *   `timestamp`: Timestamp
*   **Feedback:** A `feedback` table could capture user submissions:
    *   `id`: UUID
    *   `user_id`: UUID (Nullable if anonymous)
    *   `page_context`: Text (Optional, where feedback was submitted from)
    *   `rating`: Integer (Optional)
    *   `comment`: Text
    *   `submitted_at`: Timestamp

## 7. Conclusion

This conceptual schema provides a solid foundation for the Rafiki Guidance Hub's Data Layer. It captures the necessary entities and relationships identified during the requirements phase. Further refinement will occur during development, including detailed data typing, constraint definition, and performance tuning based on actual usage patterns. This design supports the separation of concerns and provides the necessary persistence for the Application Layer. 