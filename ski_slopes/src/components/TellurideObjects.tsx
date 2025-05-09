import { Mesh } from 'three';
import { useState, useRef } from 'react';
import { Html } from '@react-three/drei';


type Resort = {
    name: string;
    imagePath: string;
    url: string;
}

const resortInfo: Resort = {
    name: "Telluride",
    imagePath: "/assets/telluride/telluride.png",
    url: "https://tellurideskiresort.com/"
}

export const TellurideResortMarker = () => {
    return (
        <group position={[-5230.31, 5086.53, -6215.47]} rotation={[0, Math.PI * 0.05, 0]} renderOrder={-50} >
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
        name: "Telluride Mountain Resort",
        position: [-1826.90, 1600.00, 2599.17],
    },
    {
        name: "Mountain Village",
        position: [-3722.50, 1600.00, -359.65],
    },
];

export const TellurideMapMarker = () => {
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
                    // distanceFactor={25000}
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

type Advertisement = {
    title: string;
    imagePath: string;
    url: string;
}

const advertisementData: Advertisement[] = [
    {
        title: "5th Night Free",
        imagePath: "/assets/telluride/telluride-winter.jpg", 
        url: "https://www.telluride.com/special-offers/5th-night-free-mountain-lodge/"
    },
    {
        title: "Save 15% for 3 Nights this Summer",
        imagePath: "/assets/telluride/telluride-summer.jpg",
        url: "https://www.telluride.com/special-offers/save-15-on-3-nights-at-the-mountain-lodge-this-summer/"
    },
    {
        title: "Save 20% at Hotel Columbia for Ski Season",
        imagePath: "/assets/telluride/telluride-ski.png",
        url: "https://www.telluride.com/special-offers/save-20-at-hotel-columbia-for-ski-season/"
    }
];

export const TellurideBillboard = () => {
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

type TellurideTravelPlanning = {
    title: string;
    description: string;
    url: string;
}

const travelPlanningData: TellurideTravelPlanning[] = [
    {
        title: "Book Your Stay",
        description: "Find lodging that fits your needs, whether it's in the historic town of Telluride or the modern Mountain Village",
        url: "https://tellurideskiresort.com/stay/#Featured%20Lodging"
    }, 
    {
        title: "Arrange Transportation",
        description: "Plan how you'll get to Telluride. This usually involves flying into a nearby airport like Montrose (MTJ) or Telluride (TEX) and arranging ground transport (shuttle, rental car) to the resort.",
        url: "https://tellurides.com/"
    },
    {
        title: "Secure Lift Access",
        description: "Purchase your lift tickets or season passes in advance. Booking early often provides the best rates and ensures you have access during your desired dates.",
        url: "https://shop.tellurideskiresort.com/l/passes-and-tickets/winter-lift-tickets/c/winter-lift-ticket-2"
    },
    {
        title: "Equipment & Gear",
        description: "Decide if you need ski/snowboard lessons or rentals.",
        url: "https://tellurideskiresort.com/telluride-sports/"
    },
    {
        title: "Plan Activities",
        description: "Explore other activities available, like dining, shopping, snowshoeing, or spa treatments, and make reservations if necessary.",
        url: "https://www.thepeaksresort.com/"
    }
]

export const TellurideTerrainSidebar = () => {
    return (
        <group position={[28000.00, 1600.00, -475.00]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={100}>
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