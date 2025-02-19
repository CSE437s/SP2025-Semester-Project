import { Link } from 'react-router';

const Navbar: React.FC = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-12 border-b border-gray-500 bg-white z-50">
        <div className="flex items-center h-full px-4 leading-relaxed">
            {/* Logo + Back to home */}
            <Link to="/" className="text-gray-900 text-xl font-semibold">
                Logo
            </Link>

            {/* Navigation Links (Centered) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-8">
                <Link to="/about" className="text-gray-900 text-l">
                    About
                </Link>

                <Link to="/resorts" className="text-gray-900 text-l">
                    Resorts
                </Link>
            </div>

            {/* Login Link (Right side) */}
            <Link to="/login" className="text-gray-900 text-l font-semibold ml-auto">
                Log In
            </Link>
        </div>
      </div>
    );
};

export default Navbar;