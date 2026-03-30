-- =========================================
-- Rafiki Guidance Hub Database Schema
-- =========================================

-- 1) Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2) Career Profiles Table
CREATE TABLE IF NOT EXISTS career_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id),
  education_level TEXT,
  interests TEXT[],
  skills TEXT[],
  preferred_industries TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3) Assessments Table
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  questions JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4) Assessment Results Table
CREATE TABLE IF NOT EXISTS assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  assessment_id UUID NOT NULL REFERENCES assessments(id),
  assessment_type TEXT NOT NULL,
  answers JSONB NOT NULL,
  score JSONB,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5) Wellbeing Interactions Table
CREATE TABLE IF NOT EXISTS wellbeing_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  session_id UUID,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  sentiment_analysis JSONB,
  suggested_resources JSONB,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6) Mood Entries Table
CREATE TABLE IF NOT EXISTS mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  mood_rating INT NOT NULL CHECK (mood_rating >= 1 AND mood_rating <= 5),
  notes TEXT,
  entry_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7) Audit Logs (Optional)
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  details JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 8) Feedback Table (Optional)
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  page_context TEXT,
  rating INT,
  comment TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- Indexing for performance
-- =========================================

CREATE INDEX IF NOT EXISTS idx_assessment_results_user
ON assessment_results(user_id);

CREATE INDEX IF NOT EXISTS idx_wellbeing_user
ON wellbeing_interactions(user_id);

CREATE INDEX IF NOT EXISTS idx_mood_entries_user
ON mood_entries(user_id);

CREATE INDEX IF NOT EXISTS idx_assessment_type
ON assessment_results(assessment_type);

CREATE INDEX IF NOT EXISTS idx_wellbeing_category
ON wellbeing_interactions(category);

CREATE INDEX IF NOT EXISTS idx_mood_entry_date
ON mood_entries(entry_date);
