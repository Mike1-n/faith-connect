-- Create the users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL,
  email text NOT NULL,
  password text NOT NULL,
  profile_picture text,
  bio text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create the posts table
CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create the comments table
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES posts(id),
  user_id uuid NOT NULL REFERENCES users(id),
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create the likes table
CREATE TABLE likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES posts(id),
  user_id uuid NOT NULL REFERENCES users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create the mentorships table
CREATE TABLE mentorships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id uuid NOT NULL REFERENCES users(id),
  mentee_id uuid NOT NULL REFERENCES users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create the discipleship_tracks table
CREATE TABLE discipleship_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create the discipleship_track_steps table
CREATE TABLE discipleship_track_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id uuid NOT NULL REFERENCES discipleship_tracks(id),
  name text NOT NULL,
  description text,
  order integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create the user_discipleship_tracks table
CREATE TABLE user_discipleship_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  track_id uuid NOT NULL REFERENCES discipleship_tracks(id),
  completed_step_id uuid REFERENCES discipleship_track_steps(id),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create the spiritual_gifts table
CREATE TABLE spiritual_gifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create the spiritual_gift_assessment_questions table
CREATE TABLE spiritual_gift_assessment_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  gift_id uuid NOT NULL REFERENCES spiritual_gifts(id),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create the user_spiritual_gift_assessment_answers table
CREATE TABLE user_spiritual_gift_assessment_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  question_id uuid NOT NULL REFERENCES spiritual_gift_assessment_questions(id),
  answer integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create the followers table
CREATE TABLE followers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid NOT NULL REFERENCES users(id),
  following_id uuid NOT NULL REFERENCES users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create the groups table
CREATE TABLE groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create the group_members table
CREATE TABLE group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES groups(id),
  user_id uuid NOT NULL REFERENCES users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create the events table
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  start_time timestamp with time zone NOT NULL,
  end_time timestamp with time zone NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create the event_attendees table
CREATE TABLE event_attendees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id),
  user_id uuid NOT NULL REFERENCES users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
