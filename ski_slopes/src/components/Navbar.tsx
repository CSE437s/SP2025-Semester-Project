import { Link } from 'react-router';
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

const Navbar: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function checkUser() {
            const { data } = await supabase.auth.getUser();
            setUser(data.user ?? null);
        }

        checkUser();

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return () => listener?.subscription.unsubscribe();
    }, []);

    return (
      <div className="fixed top-0 left-0 w-full h-12 border-b border-gray-500 bg-white z-50">
        <div className="flex items-center h-full px-4 leading-relaxed">
            {/* Logo + Back to home */}
            <Link to="/" className="text-gray-900 text-xl font-semibold">
                <img 
                    src="/assets/logo/temp_logo2.png"
                    alt="Logo" 
                    className="h-10 w-auto object-contain"
                />
            </Link>

            {/* Navigation Links (Centered) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-8">
                {/* <Link to="/about" className="text-gray-900 text-l">
                    About
                </Link> */}

                {/* <Link to="/resorts" className="text-gray-900 text-l">
                    Resorts
                </Link> */}
            </div>

            {/* Login Link (Right side) */}
            {user ? (
                <Link to="/user" className="flex items-center gap-2 text-gray-900 text-l font-semibold ml-auto">
                    <span className="text-gray-900">{user.user_metadata?.full_name ?? user.email}</span>
                    {user.user_metadata?.avatar_url ? (
                        <img 
                            src={user.user_metadata.avatar_url}
                            alt="Profile" 
                            className="h-8 w-8 rounded-full object-cover"
                        />
                    ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 text-sm">{user.email?.[0].toUpperCase()}</span>
                        </div>
                    )}
                </Link>
            ) : (
                <Link to="/login" className="text-gray-900 text-l font-semibold ml-auto">
                    Sign In
                </Link>
            )}
        </div>
      </div>
    );
};

export default Navbar;