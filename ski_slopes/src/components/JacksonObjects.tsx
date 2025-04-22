import { Mesh } from 'three';
import { useState, useRef } from 'react';
import { Html } from '@react-three/drei';
import { Sun, Snowflake, Thermometer } from 'lucide-react'


// Jackson Hole Resort

type Resort = {
    name: string;
    imagePath: string;
    url: string;
}

const resortInfo: Resort = {
    name: "Jackson Hole",
    imagePath: "/assets/jackson_hole/resort.jpg",
    url: "https://www.jacksonhole.com/"
}

export const JacksonResortMarker = () => {
    return (
        <group position={[-716.76, 5078.31, -1562.35]} rotation={[0, Math.PI * 0.20, 0]} renderOrder={-50} >
            <Html
                position={[0, 0, 0]}
                center
                distanceFactor={15000}
                transform
            >
                <div className="rounded-lg shadow-xl overflow-hidden w-64 transform transition-transform hover:scale-105 select-none">
                    <div className="relative">
                        <img 
                            src={resortInfo.imagePath} 
                            alt={resortInfo.name} 
                            className="w-full h-24 object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col items-center justify-end p-4">
                            <h3 className="text-white text-2xl font-bold mb-2">{resortInfo.name}</h3>
                            <a href={resortInfo.url} target="_blank" rel="noopener noreferrer" className="text-white/80 text-sm animate-pulse">Click to visit resort</a>
                        </div>
                    </div>
                </div>
            </Html>
        </group>
    );
}

// Jackson Hole Map Markers

type MapMarker = {
    name: string;
    position: [number, number, number];
}

const mapMarkers: MapMarker[] = [
    {
        name: "Jackson Hole Mountain Resort",
        position: [2882.40, 1600.00, 108.00],
    },
    {
        name: "Jackson Hole Airport (JAC)",
        position: [14765.80, 1600.00, -780.87],
    },
    {
        name: "Teton Village",
        position: [5327.32, 1600.00, 3068.72],
    }

];

export const JacksonMapMarker = () => {
    return (
        <>
            {mapMarkers.map((marker, index) => (
                <MapMarkerItem key={index} marker={marker}/>
            ))}
        </>
    );
}

const MapMarkerItem = ({ marker }: { marker: MapMarker }) => {
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef<Mesh>(null);
    
    return (
        <group position={marker.position}>
            <mesh
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={hovered ? 1.2 : 1}
                renderOrder={2}
            >
                <sphereGeometry args={[200, 16, 16]} />
                <meshStandardMaterial 
                    color={'white'} 
                    emissive={'#ff3b3b'}
                    emissiveIntensity={0.5}
                    toneMapped={false}  
                />
            </mesh>
            
            {hovered && (
                <Html
                    position={[0, 1000, 0]}
                    className="pointer-events-none"
                    center
                    // distanceFactor={15000}
                    occlude
                >
                    <div className="bg-white p-3 rounded-lg shadow-lg w-64">
                        <h4 className="text-md font-bold mb-1">{marker.name}</h4>
                    </div>
                </Html>
            )}
        </group>
    );
}

// Jackson Hole Billboard

type Advertisement = {
    title: string;
    imagePath: string;
    url: string;
}

const advertisementData: Advertisement[] = [
    {
        title: "Lodging Specials & Packages",
        imagePath: "/assets/jackson_hole/lodging.jpg", 
        url: "https://www.jacksonhole.com/lodging-packages"
    },
    {
        title: "Buy 4, get 5",
        imagePath: "/assets/jackson_hole/mountain.jpg",
        url: "https://www.jacksonhole.com/buy-4-get-5"
    },
    {
        title: "$400 Air Credit",
        imagePath: "/assets/jackson_hole/air.jpg",
        url: "https://www.jacksonhole.com/300-off"
    },
    {
        title: "Save big with a Mountain Collective Pass",
        imagePath: "/assets/jackson_hole/resort.jpg",
        url: "https://www.jacksonhole.com/mountain-collective-lodging-specials"
    }
];

export const JacksonBillboard = () => {
    return (
        <group position={[0, 17000, -25000]} rotation={[0, 0, 0]} renderOrder={-100} >
            <Html
                position={[0, 0, 0]}
                center
                distanceFactor={20000}
                transform
            >
                <div className="rounded-lg overflow-hidden p-3 w-[1500px]" >
                    <h2 className="text-2xl font-bold text-center mb-3 select-none">Claim Offers</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {advertisementData.map((ad, index) => (
                            <a 
                                key={index}
                                href={ad.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block cursor-pointer bg-white rounded-lg shadow overflow-hidden transition transform hover:scale-105"
                            >
                                <div className="relative shadow-lg">
                                    <img 
                                        src={ad.imagePath} 
                                        alt={ad.title}
                                        className="w-full h-32 object-cover"
                                    />
                                    <div className="p-3">
                                        <h3 className="text-lg font-bold uppercase">{ad.title}</h3>
                                        <p className="text-sm text-gray-600 animate-pulse">Click for more info</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </Html>
        </group>
    );
}

// Jackson Hole Weather

type JacksonWeather = {
    date: string;
    snowfall_chance: number;
    snowfall_total: number;
    astronomy: {
        sunrise: string;
        sunset: string;
    }[];
    temperature: {
        top: {
            min_f: number;
            max_f: number;
            min_c: number;
            max_c: number;
        };
        mid: {
            min_f: number;
            max_f: number;
            min_c: number;
            max_c: number;
        };
        bottom: {
            min_f: number;
            max_f: number;
            min_c: number;
            max_c: number;
        };
    };
}

const WeatherData: JacksonWeather = {
    date: "2025-04-22",
    snowfall_chance: 70,
    snowfall_total: 15,
    astronomy: [{
        sunrise: "7:15 AM",
        sunset: "6:45 PM"
    }],
    temperature: {
        top: {
            min_f: 15,
            max_f: 25,
            min_c: -9,
            max_c: -4
        },
        mid: {
            min_f: 20,
            max_f: 30,
            min_c: -7,
            max_c: -1
        },
        bottom: {
            min_f: 25,
            max_f: 35,
            min_c: -4,
            max_c: 2
        }
    }
};

export const JacksonWeatherSidebar = () => {
    return (
        <group position={[32000.00, 1600.00, -1000.00]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={100}>
            <Html
                position={[0, 0, 0]}
                center
                distanceFactor={20000}
                transform
            >
                <div className="w-[300px] bg-gradient-to-b from-black/80 to-black/60 rounded-lg overflow-y-auto text-white p-4 select-none">
                    <h3 className="text-xl font-bold text-center mb-4">Today's Mountain Conditions</h3>
                    
                    {/* Snow Conditions */}
                    <div className="bg-white/10 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Snowflake className="w-5 h-5 text-blue-300" />
                            <h4 className="font-medium">Snow Conditions</h4>
                        </div>
                        <p className="text-sm">Chance of Snow: {WeatherData.snowfall_chance}%</p>
                        <p className="text-sm">Expected Snowfall: {WeatherData.snowfall_total}cm</p>
                    </div>

                    {/* Daylight */}
                    <div className="bg-white/10 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Sun className="w-5 h-5 text-yellow-300" />
                            <h4 className="font-medium">Daylight</h4>
                        </div>
                        <p className="text-sm">Sunrise: {WeatherData.astronomy[0].sunrise}</p>
                        <p className="text-sm">Sunset: {WeatherData.astronomy[0].sunset}</p>
                    </div>

                    {/* Temperature Levels */}
                    <div className="bg-white/10 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <Thermometer className="text-red-300" />
                            <h4 className="font-medium">Temperature</h4>
                        </div>
                        
                        <div className="space-y-3">
                            <div>
                                <h5 className="text-sm font-medium">Summit</h5>
                                <p className="text-sm">{WeatherData.temperature.top.min_f}°F to {WeatherData.temperature.top.max_f}°F</p>
                                <p className="text-xs text-gray-300">({WeatherData.temperature.top.min_c}°C to {WeatherData.temperature.top.max_c}°C)</p>
                            </div>
                            
                            <div>
                                <h5 className="text-sm font-medium">Mid-Mountain</h5>
                                <p className="text-sm">{WeatherData.temperature.mid.min_f}°F to {WeatherData.temperature.mid.max_f}°F</p>
                                <p className="text-xs text-gray-300">({WeatherData.temperature.mid.min_c}°C to {WeatherData.temperature.mid.max_c}°C)</p>
                            </div>
                            
                            <div>
                                <h5 className="text-sm font-medium">Base</h5>
                                <p className="text-sm">{WeatherData.temperature.bottom.min_f}°F to {WeatherData.temperature.bottom.max_f}°F</p>
                                <p className="text-xs text-gray-300">({WeatherData.temperature.bottom.min_c}°C to {WeatherData.temperature.bottom.max_c}°C)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Html>
        </group>
    );
}

// Jackson Hole Travel Planning


type TellurideTravelPlanning = {
    title: string;
    description: string;
    url: string;
}

const travelPlanningData: TellurideTravelPlanning[] = [
    {
        title: "Find Hotels and Lodging",
        description: "Explore where to stay in Jackson Hole, Wyoming - whether in Teton Village or downtown Jackson",
        url: "https://www.jacksonhole.com/lodging"
    }, 
    {
        title: "Fly to Jackson Hole this Winter",
        description: "With Jackson Hole Airport conveniently located 20 miles from the resort and nonstop flights from 12 major US cities, Jackson Hole is the most accessible destination resort in the Rockies.",
        url: "https://www.jacksonhole.com/by-air"
    },
    {
        title: "Secure Lift Access",
        description: "Discover our lift ticket offerings and information to ensure you are ready for your day on the mountain. Buy tickets, explore deals, and answer any questions you have. See you on the slopes!",
        url: "https://www.jacksonhole.com/lift-tickets"
    },
    {
        title: "Equipment & Gear by JH Sports",
        description: "Arrange for ski or snowboard rentals and book lessons through the Mountain Sports School if needed. Several rental locations are available in Teton Village.",
        url: "https://www.jacksonhole.com/jh-sports"
    },
    {
        title: "Summer Activities",
        description: "Join us at Jackson Hole Mountain Resort to make this summer better than the last.",
        url: "https://www.thepeaksresort.com/"
    }
]

export const JacksonTravelSidebar = () => {
    return (
        <group position={[-31000.00, 1600.00, -1200.00]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={100}>
            <Html
                position={[0, 0, 0]}
                center
                distanceFactor={20000}
                transform
            >
                <div className="w-[200px] h-[575px] bg-gradient-to-b from-black/80 to-black/60 rounded-lg overflow-y-auto">
                    <div className="p-2 space-y-2">
                        <h3 className="text-white text-sm font-bold text-center mb-3">Travel Planning</h3>
                        {travelPlanningData.map((item, index) => (
                            <a 
                                key={index}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-white/10 rounded-lg p-2 hover:bg-white/20 transition-colors"
                            >
                                <h4 className="text-white text-xs font-semibold mb-1">{item.title}</h4>
                                <p className="text-white/70 text-[10px] line-clamp-3">{item.description}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </Html>
        </group>
    );
}