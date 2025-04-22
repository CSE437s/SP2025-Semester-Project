import { Mesh } from 'three';
import { useState, useRef } from 'react';
import { Html } from '@react-three/drei';
import { Sun, Snowflake, Thermometer } from 'lucide-react'


type Resort = {
    name: string;
    imagePath: string;
    url: string;
}

const resortInfo: Resort = {
    name: "Baker",
    imagePath: "/assets/baker/mtbaker.png",
    url: "https://www.mtbaker.us/"
}

export const BakerResortMarker = () => {
    return (
        <group position={[22698.90, 7000.00, -24528.46]} rotation={[0, Math.PI * -0.20, 0]} renderOrder={-50} >
            <Html
                position={[0, 0, 0]}
                center
                distanceFactor={25000}
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

type MapMarker = {
    name: string;
    position: [number, number, number];
}

const mapMarkers: MapMarker[] = [
    {
        name: "Mt. Baker",
        position: [211.55, 5614.53, 2035.05],
    },
    {
        name: "Mt. Baker Ski Area",
        position: [14010.19, 3203.12, -6801.96],
    }
];

export const BakerMapMarker = () => {
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


// Baker Billboard

type Advertisement = {
    title: string;
    text: string;
    url: string;
}

const advertisementData: Advertisement[] = [
    {
        title: "Wicket Good Wednesdays",
        text: "Take advantage of the chill midweek vibe at Baker with this wicked good deal on our all-day and afternoon lift ticket rates!",
        url: "https://www.mtbaker.us/tickets-and-passes/wicket-wednesdays/"
    },
    {
        title: "2024-25 Mt. Baker Season Passes",
        text: "The Mt. Baker Any Day Season Pass gives you full access to the mountain every day of operation for the 2024-25 season.",
        url: "https://www.mtbaker.us/tickets-and-passes/2024-25-mt-baker-season-passes/"
    },
];

export const BakerBillboard = () => {
    return (
        <group position={[0, 15000, -25000]} rotation={[0, 0, 0]} renderOrder={-100} >
            <Html
                position={[0, 0, 0]}
                center
                distanceFactor={20000}
                transform
            >
                <div className="rounded-lg overflow-hidden p-3 w-[1500px]" >
                    <h2 className="text-2xl font-bold text-center mb-3 select-none">Claim Offers</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {advertisementData.map((ad, index) => (
                            <a 
                                key={index}
                                href={ad.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block cursor-pointer rounded-lg shadow-sm overflow-hidden transition transform hover:scale-105"
                            >
                                <div className="relative shadow-lg">
                                    <div className="bg-white h-32 flex items-center justify-center p-4">
                                        <h3 className="text-xl font-bold uppercase text-center">{ad.title}</h3>
                                    </div>
                                    <div className="p-3">
                                        <p className="text-sm text-gray-700 mb-2">{ad.text}</p>
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


// Baker Weather

type BakerWeather = {
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

const WeatherData: BakerWeather = {
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

export const BakerWeatherSidebar = () => {
    return (
        <group position={[58000.00, 1600.00, -19000.00]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={100}>
            <Html
                position={[0, 0, 0]}
                center
                distanceFactor={20000}
                transform
            >
                <div className="w-[300px] bg-gradient-to-b from-black/80 to-black/60 rounded-lg overflow-y-auto text-white p-4 select-none">
                    <h3 className="text-xl font-bold text-center mb-4">Mt. Baker Weather</h3>
                    
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


// Baker Travel Planning

type BakerTravelPlanning = {
    title: string;
    description: string;
    url: string;
}

const travelPlanningData: BakerTravelPlanning[] = [
    {
        title: "Book Your Stay",
        description: "Find amazing lodging options in the Mt. Baker foothills and Bellingham areas",
        url: "https://www.mtbaker.us/getting-here/accommodations/"
    }, 
    {
        title: "Arrange Transportation",
        description: "Find transportation options to the ski area",
        url: "https://www.mtbaker.us/getting-here/transportation/"
    },
    {
        title: "Secure Lift Access",
        description: "Daily Lift Tickets are available for purchase ONLY AT THE SKI AREA, DAY-OF. Pre-purchased, digital, or multi-day lift tickets are NOT available.",
        url: "https://www.mtbaker.us/tickets-and-passes/daily-lift-tickets/"
    },
    {
        title: "Equipment & Gear",
        description: "Find Basic and Premium Daily Ski and Snowboard Packages.",
        url: "https://www.mtbaker.us/lessons-rentals/daily-rentals/daily-rental-pricing/"
    },
    {
        title: "Plan Activities",
        description: "Explore must-do activities in the Mt. Baker area like hiking and dining.",
        url: "https://mtbakerlodging.com/activities-attractions/"
    }
]

export const BakerTravelSidebar = () => {
    return (
        <group position={[56000.00, 1600.00, 10000.00]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={100}>
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