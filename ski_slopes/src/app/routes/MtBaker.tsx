import { useState, useEffect } from 'react';

const MtBaker = () => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imagePath = "/assets/cardsinfo/mtbaker-map.webp";
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero section with parallax effect */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden bg-emerald-900">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(/assets/baker/mtbaker.png)', 
            transform: 'translateZ(0)',
            filter: 'brightness(70%)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/80"></div>
        <div className="relative h-full flex items-end z-10">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              Mt. Baker Ski Area
            </h1>
            <p className="text-lg text-emerald-100 mt-2 max-w-3xl">
              Legendary powder paradise in Washington's North Cascades
            </p>
          </div>
        </div>
      </div>
      
      {/* Content section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-6 md:p-8">
            {/* Left column - Map */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              {isLoading ? (
                <div className="animate-pulse bg-gray-200 rounded-lg h-96 w-full"></div>
              ) : imageError ? (
                <div className="bg-gray-100 rounded-lg p-6 text-center h-96 flex items-center justify-center">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-4 text-gray-600">Image not found. Please check that {imagePath} exists.</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-[1.01] duration-300">
                  <img
                    src={imagePath}
                    alt="Mt. Baker Map"
                    className="w-full h-auto rounded-lg"
                    onError={() => {
                      console.error("Failed to load image:", imagePath);
                      setImageError(true);
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm">Trail map of Mt. Baker Ski Area</p>
                  </div>
                </div>
              )}
              
              {/* Description */}
              <div className="mt-8 bg-emerald-50 p-6 rounded-lg border border-emerald-100">
                <h2 className="text-2xl font-bold text-emerald-900 mb-4">About the Resort</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Known for its record-breaking snowfall and rugged terrain, Mt. Baker Ski Area is a powder paradise tucked away in Washington's North Cascades. It's popular with advanced skiers and backcountry adventurers.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Mt. Baker holds the world record for the most snowfall in a single season (1,140 inches in 1998-99) and is known for its natural terrain features, cliff drops, and challenging runs. Despite its impressive stats, the resort maintains a laid-back, local vibe that stands in contrast to more commercialized destinations.
                </p>
              </div>
            </div>
            
            {/* Right column - Details */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-emerald-900 rounded-lg p-6 text-white">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Resort Details
                </h2>
                <ul className="space-y-3 text-emerald-100">
                  <li className="flex justify-between border-b border-emerald-800 pb-2">
                    <span className="font-medium">Location:</span>
                    <span>Bellingham, Washington</span>
                  </li>
                  <li className="flex justify-between border-b border-emerald-800 pb-2">
                    <span className="font-medium">Top Elevation:</span>
                    <span>5,089 ft</span>
                  </li>
                  <li className="flex justify-between border-b border-emerald-800 pb-2">
                    <span className="font-medium">Base Elevation:</span>
                    <span>3,500 ft</span>
                  </li>
                  <li className="flex justify-between border-b border-emerald-800 pb-2">
                    <span className="font-medium">Vertical Drop:</span>
                    <span className="font-bold text-white">1,589 ft</span>
                  </li>
                  <li className="flex justify-between border-b border-emerald-800 pb-2">
                    <span className="font-medium">Skiable Terrain:</span>
                    <span>1,000+ acres</span>
                  </li>
                  <li className="flex justify-between border-b border-emerald-800 pb-2">
                    <span className="font-medium">Number of Trails:</span>
                    <span>38</span>
                  </li>
                  <li className="flex justify-between border-b border-emerald-800 pb-2">
                    <span className="font-medium">Annual Snowfall:</span>
                    <span className="font-bold text-white">600+ inches</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Lift System:</span>
                    <span className="text-right">10 lifts (8 chairs, 2 rope tows)</span>
                  </li>
                </ul>
              </div>
              
              {/* Difficulty chart */}
              <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Trail Difficulty</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Beginner</span>
                      <span className="text-sm font-medium text-gray-800">24%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Intermediate</span>
                      <span className="text-sm font-medium text-gray-800">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Advanced/Expert</span>
                      <span className="text-sm font-medium text-gray-800">31%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-black h-2 rounded-full" style={{ width: '31%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Call to action */}
              <div className="mt-6 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-lg p-6 text-white shadow-lg">
                <h3 className="text-xl font-bold mb-2 text-center">Plan Your Visit</h3>
                <p className="text-emerald-100 mb-4 text-center">Ready to experience Mt. Baker's legendary powder?</p>
                <div className="flex justify-center">
                  <a href="https://www.mtbaker.us" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-emerald-700 px-5 py-2 rounded-md font-medium hover:bg-emerald-50 transition-colors">
                    Official Website
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map section */}
          <div className="p-6 md:p-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Location</h2>
            <div className="rounded-lg overflow-hidden shadow-md h-96">
              <iframe
                title="Mt. Baker Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2738.431267570204!2d-121.67314138443927!3d48.86006597928803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5484b0c1f30f7e01%3A0x7f670be56127828e!2sMt.%20Baker%20Ski%20Area!5e0!3m2!1sen!2sus!4v1617406106824!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MtBaker; 