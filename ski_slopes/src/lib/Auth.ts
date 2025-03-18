// src/lib/Auth.ts
import { supabase } from "./supabase";

// redirects to home page after login
export async function loginWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: "http://127.0.0.1:5173/auth/callback" }, 
  });

  if (error) {
    console.error("Google login failed:", error.message);
    return null;
  }

  return data; 
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Failed to get user:", error.message);
    return null;
  }
  return data.user;
}


export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("signout failed:", error.message);
  }
}