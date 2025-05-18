import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
    autoRefreshToken: true,
    storageKey: 'supabase.auth.token',
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/2.x',
    },
  },
  // Add retryable fetch configuration
  retryOnConflict: true,
  maxRetries: 3
});

// Database types
export interface ChatMessage {
  id: string;
  user_id: string;
  content: string;
  role: 'user' | 'bot';
  created_at: string;
}

// Chat functions
export async function saveMessage(content: string, role: 'user' | 'bot'): Promise<void> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('messages')
    .insert([{ content, role, user_id: user.id }]);

  if (error) {
    console.error('Error saving message:', error);
    throw error;
  }
}

export async function getMessages(): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }

  return data as ChatMessage[];
}