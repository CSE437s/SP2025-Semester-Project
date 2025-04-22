import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabase";

// handles authentication and directes user to homepage
export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        async function handleAuthRedirect() {
            try {
                const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
                if (error) {
                    console.error("Auth callback error:", error.message);
                }
                navigate("/", { replace: true });
            } catch (error) {
                console.error("Auth callback error:", error);
                navigate("/", { replace: true });
            }
        }

        handleAuthRedirect();
    }, [navigate]);

    return null;
}