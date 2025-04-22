import { useState, useEffect } from 'react';

const Telluride = () => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imagePath = "/assets/cardsinfo/telluride-map.jpg";
  
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
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden bg-orange-900">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(/assets/telluride/telluride.png)', 
            transform: 'translateZ(0)',
            filter: 'brightness(70%)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-900/80"></div>
        <div className="relative h-full flex items-end z-10">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              Telluride Ski Resort
            </h1>
            <p className="text-lg text-orange-100 mt-2 max-w-3xl">
              Colorado's spectacular alpine paradise in the San Juan Mountains
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
                    alt="Telluride Resort Map"
                    className="w-full h-auto rounded-lg"
                    onError={() => {
                      console.error("Failed to load image:", imagePath);
                      setImageError(true);
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm">Trail map of Telluride Ski Resort</p>
                  </div>
                </div>
              )}
              
              {/* Description */}
              <div className="mt-8 bg-amber-50 p-6 rounded-lg border border-amber-100">
                <h2 className="text-2xl font-bold text-amber-900 mb-4">About the Resort</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nestled in Colorado's San Juan Mountains, Telluride Ski Resort offers diverse terrain, historic charm, and panoramic alpine views. It's an ideal mix of challenging slopes and scenic leisure skiing.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  What makes Telluride truly special is its breathtaking setting, surrounded by 13,000 and 14,000-foot peaks, and its authentic mountain town charm. The free gondola connects the historic mining town with Mountain Village, providing both transportation and stunning views. The resort's terrain includes everything from gentle beginner slopes to some of the most challenging expert terrain in North America.
                </p>
              </div>
            </div>
            
            {/* Right column - Details */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-orange-800 rounded-lg p-6 text-white">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Resort Details
                </h2>
                <ul className="space-y-3 text-orange-100">
                  <li className="flex justify-between border-b border-orange-700 pb-2">
                    <span className="font-medium">Location:</span>
                    <span>Telluride, Colorado</span>
                  </li>
                  <li className="flex justify-between border-b border-orange-700 pb-2">
                    <span className="font-medium">Top Elevation:</span>
                    <span className="font-bold text-white">13,150 ft</span>
                  </li>
                  <li className="flex justify-between border-b border-orange-700 pb-2">
                    <span className="font-medium">Base Elevation:</span>
                    <span>8,725 ft</span>
                  </li>
                  <li className="flex justify-between border-b border-orange-700 pb-2">
                    <span className="font-medium">Vertical Drop:</span>
                    <span className="font-bold text-white">4,425 ft</span>
                  </li>
                  <li className="flex justify-between border-b border-orange-700 pb-2">
                    <span className="font-medium">Skiable Terrain:</span>
                    <span>2,000+ acres</span>
                  </li>
                  <li className="flex justify-between border-b border-orange-700 pb-2">
                    <span className="font-medium">Number of Trails:</span>
                    <span>148</span>
                  </li>
                  <li className="flex justify-between border-b border-orange-700 pb-2">
                    <span className="font-medium">Annual Snowfall:</span>
                    <span>330 inches</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Lift System:</span>
                    <span className="text-right">17 lifts</span>
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
                      <span className="text-sm font-medium text-gray-800">23%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Intermediate</span>
                      <span className="text-sm font-medium text-gray-800">36%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '36%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Advanced/Expert</span>
                      <span className="text-sm font-medium text-gray-800">41%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-black h-2 rounded-full" style={{ width: '41%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Best features */}
              <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Featured Attractions</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Free gondola connecting town and Mountain Village</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Historic downtown with Victorian architecture</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Revelation Bowl with expert terrain</span>
                  </li>
                </ul>
              </div>
              
              {/* Call to action */}
              <div className="mt-6 bg-gradient-to-r from-orange-600 to-amber-700 rounded-lg p-6 text-white shadow-lg">
                <h3 className="text-xl font-bold mb-2 text-center">Plan Your Visit</h3>
                <p className="text-amber-100 mb-4 text-center">Experience the magic of Telluride's slopes and charming town!</p>
                <div className="flex justify-center">
                  <a href="https://tellurideskiresort.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-amber-700 px-5 py-2 rounded-md font-medium hover:bg-amber-50 transition-colors">
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
                title="Telluride Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3160.5485595701476!2d-107.81228508469256!3d37.93749087972902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8737bd4378a95b8b%3A0x2f82e9b1c0edcaa6!2sTelluride%20Ski%20Resort!5e0!3m2!1sen!2sus!4v1649795706870!5m2!1sen!2sus"
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

export default Telluride; 