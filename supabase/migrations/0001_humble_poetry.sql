/*
  # Create messages table for chat history

  1. New Tables
    - `messages`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `content` (text)
      - `role` (text, either 'user' or 'bot')
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on messages table
    - Add policies for user access
*/

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  role text CHECK (role IN ('user', 'bot')) NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can insert their own messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  USING (auth.uid() = user_id);