
import { supabase } from "@/integrations/supabase/client";
import { Session, User, Provider } from "@supabase/supabase-js";
import { toast } from "sonner";

// Types
export type { Session, User, Provider };

// Authentication functions
export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
};

export const signUpWithEmail = async (email: string, password: string, userData: { displayName: string }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: userData.displayName,
      }
    }
  });
  
  if (error) throw error;
  return data;
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
  
  if (error) throw error;
  return data;
};

export const signInWithLinkedIn = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'linkedin_oidc',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getSession = async (): Promise<Session | null> => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

export const onAuthChange = (callback: (session: Session | null) => void) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  }).data.subscription;
};

// User profile functions
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId as any)
    .single();
    
  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
  
  return data;
};

export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId as any);
    
  if (error) throw error;
  return data;
};

// Chat functions
export const saveChat = async (userId: string, message: string, response: string, category: string) => {
  try {
    // This is a placeholder - we need to create a 'chats' table in Supabase to use this
    toast.info("Chat history functionality will be available soon");
    console.log("Chat would be saved for user:", userId, { message, response, category });
    // Once we have a chats table, we would use:
    // const { error } = await supabase.from('chats').insert({
    //   user_id: userId,
    //   message,
    //   response,
    //   category,
    // });
    // if (error) throw error;
  } catch (error) {
    console.error("Error saving chat", error);
    throw error;
  }
};

export const getUserChats = async (userId: string) => {
  try {
    // This is a placeholder - we need to create a 'chats' table in Supabase to use this
    console.log("Would fetch chats for user:", userId);
    // Once we have a chats table, we would use:
    // const { data, error } = await supabase
    //   .from('chats')
    //   .select('*')
    //   .eq('user_id', userId)
    //   .order('created_at', { ascending: false });
    // if (error) throw error;
    // return data;
    return [];
  } catch (error) {
    console.error("Error fetching user chats:", error);
    return [];
  }
};
