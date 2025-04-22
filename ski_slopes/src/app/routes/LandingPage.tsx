import { Link } from 'react-router';
import { useAuthStore } from "@/store/authStore";

const LandingPage = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <div className="flex flex-col gap-16 max-w-screen mx-auto leading-relaxed mt-16">
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
            <section className="max-w-7xl mx-auto px-6 py-12 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="p-8 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
                        <span className="absolute -top-2 -left-2 bg-blue-50 text-blue-600 text-3xl font-light w-14 h-14 flex items-center justify-center rounded-br-lg opacity-50 group-hover:opacity-80 transition-opacity">01</span>
                        <div className="pl-4 pt-4">
                            <h3 className="text-2xl font-medium text-gray-800 mb-4">3D Interactive Tour</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Explore stunning mountains with ultra-realistic 3D terrain mapping and interactive trail overlays that bring the slopes to life.
                            </p>
                        </div>
                    </div>
                    <div className="p-8 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
                        <span className="absolute -top-2 -left-2 bg-blue-50 text-blue-600 text-3xl font-light w-14 h-14 flex items-center justify-center rounded-br-lg opacity-50 group-hover:opacity-80 transition-opacity">02</span>
                        <div className="pl-4 pt-4">
                            <h3 className="text-2xl font-medium text-gray-800 mb-4">Resort Details</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Access real-time snow conditions, elevation profiles, trail difficulty ratings, and insider tips for an unparalleled mountain experience.
                            </p>
                        </div>
                    </div>
                    <div className="p-8 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
                        <span className="absolute -top-2 -left-2 bg-blue-50 text-blue-600 text-3xl font-light w-14 h-14 flex items-center justify-center rounded-br-lg opacity-50 group-hover:opacity-80 transition-opacity">03</span>
                        <div className="pl-4 pt-4">
                            <h3 className="text-2xl font-medium text-gray-800 mb-4">Plan Your Visit</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Compare resorts, save favorites, and visualize terrain difficulty to craft the perfect ski getaway tailored to your skill level and preferences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Work Section */}
            <section className="max-w-7xl mx-auto px-6 pt-8 pb-20">
                <div className="mb-12 relative">
                    <h2 className="text-3xl font-light text-gray-800 relative inline-block">
                        Resort Features
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-100"></span>
                    </h2>
                    <p className="text-gray-600 mt-3 max-w-2xl">Discover the beauty and excitement waiting for you at our featured ski destinations.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 overflow-hidden rounded-xl shadow-md group relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 z-10 transition-opacity duration-300"></div>
                        <img 
                            src="/assets/features/skiing.jpg" 
                            alt="Skiing" 
                            className="w-full h-full object-cover aspect-video transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 p-5 z-20 text-white">
                            <h3 className="text-xl font-medium">Pristine Slopes</h3>
                            <p className="text-sm text-gray-200 mt-1">Experience world-class skiing on perfectly groomed runs</p>
                        </div>
                    </div>
                    
                    <div className="overflow-hidden rounded-xl shadow-md group relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 z-10 transition-opacity duration-300"></div>
                        <img 
                            src="/assets/features/resort.jpg" 
                            alt="Resort" 
                            className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 p-5 z-20 text-white">
                            <h3 className="text-xl font-medium">Luxury Accommodations</h3>
                            <p className="text-sm text-gray-200 mt-1">Relax in comfort after a day on the mountain</p>
                        </div>
                    </div>
                    
                    <div className="overflow-hidden rounded-xl shadow-md group relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 z-10 transition-opacity duration-300"></div>
                        <img 
                            src="/assets/features/sunset.jpg" 
                            alt="Sunset" 
                            className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 p-5 z-20 text-white">
                            <h3 className="text-xl font-medium">Breathtaking Views</h3>
                            <p className="text-sm text-gray-200 mt-1">Witness spectacular alpine sunsets</p>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-2 overflow-hidden rounded-xl shadow-md group relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 z-10 transition-opacity duration-300"></div>
                        <img 
                            src="/assets/features/family.jpg" 
                            alt="Family" 
                            className="w-full h-full object-cover aspect-video transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 p-5 z-20 text-white">
                            <h3 className="text-xl font-medium">Family Adventures</h3>
                            <p className="text-sm text-gray-200 mt-1">Create lasting memories with activities for all ages</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section - two-column layout */}
            <section className="max-w-7xl mx-auto px-6 py-20 bg-gray-50 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-light text-gray-800 relative inline-block">
                            Discover Your Next Adventure
                            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-blue-100"></span>
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Explore resorts in immersive 3D and get all the details you need for planning your perfect ski trip. Sign up for updates on new features and resort additions.
                        </p>
                        <div className="flex items-center space-x-4 mt-8">
                            <div className="bg-white p-3 rounded-full shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-gray-700">We'll never share your email with anyone else.</span>
                        </div>
                    </div>
                    
                    {/* Contact form */}
                    <form className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-medium text-gray-800 mb-6">Stay Updated</h3>
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-600 font-medium">Name</label>
                                <input 
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-600 font-medium">Email</label>
                                <input 
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                                />
                            </div>
                            <div className="pt-3">
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                                    <span>Send</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
