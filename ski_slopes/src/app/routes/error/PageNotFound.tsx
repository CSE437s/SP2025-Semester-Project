import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC  = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <div className="space-y-8 text-center max-w-xl">
                {/* Error Code */}
                <p className="text-8xl font-light text-night-500">404</p>
                
                {/* Error Message */}
                <div className="space-y-4">
                    <h1 className="text-2xl md:text-3xl font-light">
                        Page Not Found
                    </h1>
                    <p className="text-gray-600 leading-relaxed">
                        The page you're looking for has been moved or doesn't exist.
                    </p>
                </div>

                {/* Back Button */}
                <Link 
                    to="/" 
                    className="inline-flex items-center space-x-2 px-8 py-2 border border-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                >
                    <ArrowLeft size={16} />
                    <span>Back to Home</span>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;