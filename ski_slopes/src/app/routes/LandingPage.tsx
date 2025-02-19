import { Link } from 'react-router';

const LandingPage = () => {
    return (
        <div className="flex flex-col gap-32 max-w-7xl mx-auto px-4 md:px-8 leading-relaxed">
            {/* Hero Section */}
            <section className="min-h-[80vh] grid place-content-center text-center">
                <h1 className="text-4xl md:text-6xl font-light mb-8">
                    Explore Ski Mountain Resorts in 3D.
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto mb-12">
                    Discover immersive 3D views and detailed information about your favorite ski resorts.
                </p>
                <Link to="/resorts" className="inline-flex mx-auto px-8 py-3 border border-gray-900 hover:bg-gray-900 hover:text-white transition-colors text-lg">
                    View Resorts
                </Link>
            </section>

            {/* Services Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-16">
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
            <section className="space-y-16">
                <h2 className="text-2xl font-light">Resort Features</h2>
                
                {/* Projects grid with varying column spans */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 aspect-video bg-gray-100 rounded-lg"></div>
                    <div className="aspect-square bg-gray-100 rounded-lg"></div>
                    <div className="aspect-square bg-gray-100 rounded-lg"></div>
                    <div className="lg:col-span-2 aspect-video bg-gray-100 rounded-lg"></div>
                </div>
            </section>

            {/* Contact Section - two-column layout */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start pb-32">
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
