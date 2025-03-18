// src/components/Login.tsx
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function Login() {
  const { user, isAuthenticated, signOut, signInWithGoogle, signInWithGithub } = useAuthStore();

  return (
    <div className="flex justify-center items-start min-h-screen">
      <div className="flex flex-col items-center space-y-4 p-6 bg-gray-100 rounded-xl shadow-md mt-40">
        {isAuthenticated ? (
          <>
            <img
              src={user?.user_metadata?.avatar_url || ""}
              alt="User Avatar"
              className="w-16 h-16 rounded-full"
            />
            <p>Welcome, {user?.user_metadata?.full_name}!</p>
            <button
              onClick={signOut}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex flex-col items-centercenter gap-2">
            <button
              onClick={signInWithGoogle}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
            Login with Google
            </button>

            <button 
              onClick={signInWithGithub} 
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
            Login with Github
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
