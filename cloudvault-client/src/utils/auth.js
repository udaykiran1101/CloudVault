import { supabase } from "../supabase";

export const signUp = async (email, password) => {
  return supabase.auth.signUp({ email, password });
};

export const signIn = async (email, password) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const signOut = () => {
  return supabase.auth.signOut();
};
