import { Link } from 'react-router';
import { useAuthStore } from "@/store/authStore";

const LandingPage = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <div className="flex flex-col gap-32 max-w-screen mx-auto leading-relaxed mt-12">
            {/* Hero Section */}
            <section className="min-h-[100vh] grid place-content-center text-center relative overflow-hidden">
                {/* Video background + dark overlay */}
                <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay muted loop playsInline>
                    <source src="/mountains.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 w-full h-full bg-black opacity-40 z-10"></div>
                {/* Content */}
                <div className="relative z-20 text-white">
                    <h1 className="text-4xl md:text-6xl font-light mb-8">
                        Explore Ski Mountain Resorts in 3D.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto mb-12">
                        Discover immersive 3D views and detailed information about your favorite ski resorts.
                    </p>
                    {/* If user is authenticated, show 'View Resorts' button, otherwise show 'Sign In' button */}
                    {isAuthenticated ? (
                        <Link to="/resorts" className="inline-flex mx-auto px-8 py-3 border border-white hover:bg-white hover:text-gray-900 transition-colors text-lg">
                            View Resorts
                        </Link>
                    ) : (
                        <Link to="/login" className="inline-flex mx-auto px-8 py-3 border border-white hover:bg-white hover:text-gray-900 transition-colors text-lg">
                            Sign In
                        </Link>
                    )}
                </div>
            </section>

            {/* Services Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-16 p-4">
                <div className="space-y-4">
                    <span className="text-sm text-gray-400">01</span>
                    <h3 className="text-xl font-medium">3D Interactive Tour</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Experience high-resolution 3D tours of ski resorts from the comfort of your home.
                    </p>
                </div>
                <div className="space-y-4">
                    <span className="text-sm text-gray-400">02</span>
                    <h3 className="text-xl font-medium">Resort Details</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Get comprehensive information on slopes, lifts, amenities, and weather updates.
                    </p>
                </div>
                <div className="space-y-4">
                    <span className="text-sm text-gray-400">03</span>
                    <h3 className="text-xl font-medium">Plan Your Visit</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Gather all the insights you need to plan the perfect ski adventure.
                    </p>
                </div>
            </section>

            {/* Featured Work Section */}
            <section className="space-y-16 p-4">
            <h2 className="text-2xl font-light">Resort Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 aspect-video rounded-lg">
                        <img src="/assets/features/skiing.jpg" alt="Skiing" className="w-full h-full object-cover rounded-lg"/>
                    </div>
                    <div className="aspect-square rounded-lg">
                        <img src="/assets/features/resort.jpg" alt="Resort" className="w-full h-full object-cover rounded-lg"/>
                    </div>
                    <div className="aspect-square rounded-lg">
                        <img src="/assets/features/sunset.jpg" alt="Sunset" className="w-full h-full object-cover rounded-lg"/>
                    </div>
                    <div className="lg:col-span-2 aspect-video rounded-lg">
                        <img src="/assets/features/family.jpg" alt="Family" className="w-full h-full object-cover rounded-lg"/>
                    </div>
                </div>

</section>

            {/* Contact Section - two-column layout */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start pb-32 p-4">
                <div className="space-y-8">
                    <h2 className="text-2xl font-light">Discover Your Next Adventure</h2>
                    <p className="text-gray-600 max-w-md leading-relaxed">
                        Explore resorts in immersive 3D and get all the details you need for planning your ski trip.
                    </p>
                </div>
                
                {/* Contact form */}
                <form className="space-y-6 w-full">
                    <div className="space-y-1">
                        <label className="text-sm text-gray-600">Name</label>
                        <input 
                            type="text"
                            className="w-full border-b p-2 border-gray-200 py-2 focus:outline-none focus:border-gray-400 bg-floralwhite-600"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm text-gray-600">Email</label>
                        <input 
                            type="email"
                            className="w-full border-b p-2 border-gray-200 py-2 focus:outline-none focus:border-gray-400 bg-floralwhite-600"
                        />
                    </div>

                    <button className="px-8 py-2 border border-gray-900 hover:bg-gray-900 hover:text-white transition-colors">
                        Send
                    </button>
                </form>
            </section>
        </div>
    );
};

export default LandingPage;
