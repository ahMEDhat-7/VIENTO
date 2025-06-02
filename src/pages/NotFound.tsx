
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-12 border border-gray-700 max-w-md">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-2xl text-white mb-4">Oops! Page not found</p>
          <p className="text-gray-300 mb-8">The page you're looking for doesn't exist</p>
          <Link 
            to="/" 
            className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
