import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabase";

// handles authentication and directes user to homepage
export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        async function handleAuthRedirect() {
            const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);

            if (error) {
                console.error("Auth callback error:", error.message);
            } else {
                console.log("User session:", data.session);
            }

            navigate("/login"); 
        }

        handleAuthRedirect();
    }, [navigate]);

    return <p>Processing login...</p>;
}