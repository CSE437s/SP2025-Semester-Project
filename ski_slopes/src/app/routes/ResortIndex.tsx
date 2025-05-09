import React, { useEffect } from "react";
import { Link } from "react-router";
import { useFavoriteStore } from "@/store/favoriteStore";
import { useAuthStore } from "@/store/authStore";
import toast, { Toaster } from 'react-hot-toast';

type Resort = {
    name: string;
    imagePath: string;
    description: string;
};

interface ResortCardProps {
    resort: Resort;
}

const resortData: Resort[] = [
    {
        name: "Jackson Hole",
        imagePath: "/assets/jackson_hole/jackson_hole.png",
        description: "Known for its steep terrain and deep powder, Jackson Hole offers a challenging 2,500 acres of terrain and a 4,139-foot vertical rise"
    },
    {
        name: "Telluride",
        imagePath: "/assets/telluride/telluride.png",
        description: "Nestled in Colorado's San Juan Mountains, this destination features diverse terrain and a charming historic mountain town" 
    },
    {
        name: "Mt. Baker",
        imagePath: "/assets/baker/mtbaker.png",
        description: "Renowned for its record-breaking snowfall and rugged terrain, Mt. Baker features steep, technical runs and expansive backcountry access"
    },
    {
        name: "Snowbird",
        imagePath: "/assets/snowbird/snowbird.png",
        description: "Set in Utah's Wasatch Range, Snowbird boasts diverse terrain and a stunning alpine village."
    }    
];

const ResortCard: React.FC<ResortCardProps> = ({ resort }) => {
    const { toggleFavorite, isFavorite, isLoading } = useFavoriteStore();
    const { isAuthenticated } = useAuthStore();
    const [isStarred, setIsStarred] = React.useState(false);

    // Update local state when favorites change, auth state changes, or loading completes
    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            const favorited = isFavorite(resort.name);
            setIsStarred(favorited);
        } else {
            setIsStarred(false);
        }
    }, [isAuthenticated, resort.name, isFavorite, isLoading]);

    const handleFavoriteClick = async (e: React.MouseEvent) => {
        e.preventDefault();  // Prevent link navigation
        
        if (!isAuthenticated) {
            toast.error('Please log in to favorite resorts', {
                duration: 2000,
                position: 'bottom-center',
                style: {
                    background: '#FEF2F2',
                    color: '#991B1B',
                    border: '1px solid #FEE2E2'
                },
            });
            return;
        }

        try {
            const newStarredState = !isStarred;
            setIsStarred(newStarredState); // Update local state immediately
            await toggleFavorite(resort.name);
            
            if (newStarredState) {
                toast.success(`${resort.name} added to favorites!`, {
                    duration: 2000,
                    position: 'bottom-center',
                    style: {
                        background: '#F0FDF4',
                        color: '#166534',
                        border: '1px solid #BBF7D0'
                    },
                });
            }
        } catch (error) {
            // Revert local state if there was an error
            setIsStarred(!isStarred);
            toast.error('Failed to update favorite', {
                duration: 2000,
                position: 'bottom-center',
                style: {
                    background: '#FEF2F2',
                    color: '#991B1B',
                    border: '1px solid #FEE2E2'
                },
            });
        }
    };

    return (
        <div className="flex flex-col shadow-lg rounded-md w-full h-[400px] overflow-hidden relative group">
            {/* Favorite Star Button */}
            <button 
                onClick={handleFavoriteClick}
                className="absolute top-3 right-3 z-50 p-2.5 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all transform hover:scale-110 border border-gray-200"
            >
                {isStarred ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-yellow-500">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-gray-700 hover:text-gray-900">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                )}
            </button>

            {/* Top card with image */}
            <div className="h-3/5 w-full">
                <img src={resort.imagePath} alt={resort.name} className="h-full w-full object-cover"/>
            </div>
            {/* Bottom card with name and description */}
            <div className="flex-grow h-2/5 w-full p-4">
                <h2 className="font-medium tracking-normal text-gray-900 text-xl mb-2">{resort.name}</h2>
                <p className="text-base text-gray-700">{resort.description}</p>
            </div>
        </div>
    );
};

const ResortIndex: React.FC = () => {
    const { fetchFavorites } = useFavoriteStore();
    const { isAuthenticated } = useAuthStore();

    // Fetch favorites when component mounts and when auth state changes
    useEffect(() => {
        if (isAuthenticated) {
            console.log('Fetching favorites on mount/auth change');
            fetchFavorites();
        }
    }, [isAuthenticated, fetchFavorites]);

    return (
        <main className="min-h-screen w-full mt-12 pb-12">
            <Toaster />
            
            {/* Hero header section */}
            <div className="relative">
                {/* Background image with overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/assets/resorts/resort.avif" 
                        alt="Snowy mountains" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 md:py-32">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Explore <span className="text-blue-300">Ski Resorts</span>
                        </h1>
                        <p className="text-lg text-gray-200 mb-8">
                            Discover detailed 3D terrain maps and information about North America's premier ski destinations.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link 
                                to="/render" 
                                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2 shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                                </svg>
                                <span>View in 3D</span>
                            </Link>
                            <Link 
                                to="/dashboard" 
                                className="bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2 shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                                </svg>
                                <span>Weather Dashboard</span>
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
                        <path fill="#ffffff" fillOpacity="1" d="M0,128L60,117.3C120,107,240,85,360,96C480,107,600,149,720,165.3C840,181,960,171,1080,149.3C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                    </svg>
                </div>
            </div>

            {/* Resort cards section subtitle */}
            <div className="max-w-7xl mx-auto px-4 mt-8 mb-10">
                <h2 className="text-2xl font-semibold text-gray-800">Featured Resorts</h2>
                <p className="text-gray-600 mt-2">Select a resort to view details and add to your favorites.</p>
            </div>

            {/* Resort cards section */}
            <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resortData.map((resort, index) => {
                    const slug = resort.name
                        .toLowerCase()
                        .replace(/\./g, '')         
                        .replace(/\s+/g, '-');      
                    const path = `/resorts/${slug}`;

                    return (
                        <Link key={slug} to={path} className="block hover:scale-105 transition">
                            <ResortCard resort={resort} />
                        </Link>
                    );
                })}
            </div>
            </div>
        </main>
    );
};

export default ResortIndex;