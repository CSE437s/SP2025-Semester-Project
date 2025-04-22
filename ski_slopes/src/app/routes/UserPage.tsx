import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useFavoriteStore } from "@/store/favoriteStore";
import { Link } from "react-router-dom";

const UserPage: React.FC = () => {
    const { user, isAuthenticated, isLoading: authLoading, getUser, signOut } = useAuthStore();
    const { favorites, fetchFavorites, isLoading: favoritesLoading } = useFavoriteStore();
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize auth state when component mounts
        getUser();
    }, []);

    useEffect(() => {
        // Only redirect if we're not loading and not authenticated
        if (!authLoading && !isAuthenticated) {
            navigate("/login");
        }
    }, [authLoading, isAuthenticated, navigate]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchFavorites();
        }
    }, [isAuthenticated]);

    const handleSignOut = async () => {
        await signOut();
    };

    // Show loading state while checking authentication
    if (authLoading) {
        return (
            <div className="min-h-screen w-full mt-12 flex items-center justify-center">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

    // If not authenticated, don't render anything while redirecting
    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <main className="min-h-screen w-full mt-12">
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">User Profile</h1>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            {user.user_metadata?.avatar_url && (
                                <img 
                                    src={user.user_metadata.avatar_url} 
                                    alt="Profile" 
                                    className="w-16 h-16 rounded-full"
                                />
                            )}
                            <div>
                                <h2 className="text-2xl font-semibold">
                                    {user.user_metadata?.full_name || user.email}
                                </h2>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-medium mb-4">Quick Links</h3>
                            <div className="space-y-3">
                                <Link to="/dashboard" className="block text-blue-600 hover:underline">
                                    View Weather Dashboard
                                </Link>
                                <Link to="/resorts" className="block text-blue-600 hover:underline">
                                    Browse Resorts
                                </Link>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-medium mb-4">Account Details</h3>
                            <div className="space-y-2">
                                <p><span className="font-medium">Email:</span> {user.email}</p>
                                <p><span className="font-medium">Provider:</span> {user.app_metadata?.provider || 'Email'}</p>
                                <p><span className="font-medium">Last Sign In:</span> {new Date(user.last_sign_in_at || '').toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Favorites Section */}
                    <div className="mt-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                                <h3 className="text-xl font-medium">Favorite Resorts</h3>
                            </div>
                            
                            {favoritesLoading ? (
                                <div className="flex justify-center py-8">
                                    <div className="text-gray-600 flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading favorites...
                                    </div>
                                </div>
                            ) : favorites.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {favorites.map((resortName) => {
                                        // Create image path based on the resort name
                                        let imagePath;
                                        if (resortName === "Mt. Baker") {
                                            imagePath = "/assets/baker/mtbaker.png";
                                        } else if (resortName === "Jackson Hole") {
                                            imagePath = "/assets/jackson_hole/jackson_hole.png";
                                        } else if (resortName === "Telluride") {
                                            imagePath = "/assets/telluride/telluride.png";
                                        } else if (resortName === "Snowbird") {
                                            imagePath = "/assets/snowbird/snowbird.png";
                                        } else {
                                            // Fallback for any other resorts
                                            const formattedName = resortName.toLowerCase().replace(/ /g, '_');
                                            imagePath = `/assets/${formattedName}/${formattedName}.png`;
                                        }
                                        
                                        return (
                                            <div 
                                                key={resortName} 
                                                className="flex bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                                            >
                                                <div className="w-2/5 h-28 relative">
                                                    <img 
                                                        src={imagePath} 
                                                        alt={resortName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute top-2 left-2">
                                                        <div className="bg-white p-1 rounded-full shadow-sm">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-1 p-4 flex flex-col justify-between">
                                                    <span className="font-medium text-gray-900">
                                                        {resortName}
                                                    </span>
                                                    <Link 
                                                        to={`/resorts/${resortName.toLowerCase().replace(/\./g, '').replace(/\s+/g, '-')}`}
                                                        className="text-blue-600 hover:text-blue-700 hover:underline text-sm mt-2 self-end flex items-center"
                                                    >
                                                        View Resort
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    <p className="text-gray-600">No favorite resorts yet.</p>
                                    <Link 
                                        to="/resorts" 
                                        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Browse Resorts
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UserPage; 