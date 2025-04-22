import { useWeatherStore } from "@/store/weatherStore";

const Dashboard: React.FC = () => {
    const { weather, fetchWeather, isLoading } = useWeatherStore();

    const handleFetchWeather = () => {
        fetchWeather("Mt Baker, WA");
    };

    return (
        <main className="min-h-screen w-full mt-12">
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Ski Weather Dashboard</h1>
                
                <div className="mb-6">
                    <button 
                        onClick={handleFetchWeather}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Get Mt Baker Weather"}
                    </button>
                </div>

                {isLoading ? (
                    <div className="text-center py-10">
                        <p className="text-lg">Loading weather data...</p>
                    </div>
                ) : weather ? (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold mb-4">Mt Baker, WA</h2>
                        <p className="text-lg mb-2">Date: {weather.date}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="text-xl font-medium mb-2">Snow Conditions</h3>
                                <p>Chance of Snow: {weather.snowfall_chance}%</p>
                                <p>Expected Snowfall: {weather.snowfall_total}cm</p>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-xl font-medium mb-2">Daylight</h3>
                                {weather.astronomy && weather.astronomy[0] && (
                                    <>
                                        <p>Sunrise: {weather.astronomy[0].sunrise}</p>
                                        <p>Sunset: {weather.astronomy[0].sunset}</p>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        <div className="mt-6">
                            <h3 className="text-xl font-medium mb-3">Temperature</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-indigo-50 p-4 rounded-lg">
                                    <h4 className="font-medium">Summit</h4>
                                    <p>{weather.temperature.top.min_f}°F to {weather.temperature.top.max_f}°F</p>
                                    <p className="text-gray-600">({weather.temperature.top.min_c}°C to {weather.temperature.top.max_c}°C)</p>
                                </div>
                                
                                <div className="bg-indigo-50 p-4 rounded-lg">
                                    <h4 className="font-medium">Mid-Mountain</h4>
                                    <p>{weather.temperature.mid.min_f}°F to {weather.temperature.mid.max_f}°F</p>
                                    <p className="text-gray-600">({weather.temperature.mid.min_c}°C to {weather.temperature.mid.max_c}°C)</p>
                                </div>
                                
                                <div className="bg-indigo-50 p-4 rounded-lg">
                                    <h4 className="font-medium">Base</h4>
                                    <p>{weather.temperature.bottom.min_f}°F to {weather.temperature.bottom.max_f}°F</p>
                                    <p className="text-gray-600">({weather.temperature.bottom.min_c}°C to {weather.temperature.bottom.max_c}°C)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <p className="text-lg">Click the button to fetch weather data</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Dashboard;