import React from "react";

type Resort = {
    name: string;
    imagePath: string;
    description: string;
};

interface ResortCardProps {
    resort: Resort;
}

const resortData: Resort[] = [
    {
        name: "Jackson Hole",
        imagePath: "/assets/jackson_hole/jackson_hole.png",
        description: "Known for its steep terrain and deep powder, Jackson Hole offers a challenging 2,500 acres of terrain and a 4,139-foot vertical rise"
    },
    {
        name: "Mt. Baker",
        imagePath: "/assets/baker/mtbaker.png",
        description: "Renowned for its record-breaking snowfall and rugged terrain, Mt. Baker features steep, technical runs and expansive backcountry access"
    },
    {
        name: "Telluride",
        imagePath: "/assets/telluride/telluride.png",
        description: "Nestled in Colorado's San Juan Mountains, this destination features diverse terrain and a charming historic mountain town" 
    },
    {
        name: "Snowbird",
        imagePath: "/assets/snowbird/snowbird.png",
        description: "Set in Utah\’s Wasatch Range, Snowbird boasts diverse terrain and a stunning alpine village."
    }    
];

const ResortCard: React.FC<ResortCardProps> = ({ resort }) => {
    return (
        <div className="flex flex-col shadow-lg rounded-md w-96 h-96 overflow-hidden">
            {/* Top card with image */}
            <div className="h-3/5 w-full">
                <img src={resort.imagePath} alt={resort.name} className="h-full w-full object-cover"/>
            </div>
            {/* Bottom card with name and description */}
            <div className="flex-grow h-2/5 w-full pl-3 pb-4">
                <h2 className="font-medium tracking-normal text-gray-900 mt-3 mb-1">{resort.name}</h2>
                <p className="text-base leading-loose text-gray-700">{resort.description}</p>
            </div>
        </div>
    );
};

const ResortIndex: React.FC = () => {
    return (
        <main className="h-[calc(100vh-3rem)] w-full mt-12 flex flex-col">
            {/* Top half */}
            <div className="h-1/2 w-full bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-light">Explore Ski Resorts</h1>
                        <p className="text-gray-600 max-w-xl">
                            Discover detailed 3D terrain maps and information about North America's premier ski destinations.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom half - resort cards */}
            <div className="h-1/2 w-full border-t">
                <div className="h-full overflow-x-auto overflow-y-hidden">
                    <div className="flex gap-4 p-4 min-w-min h-full items-center">
                        {resortData.map((resort, index) => (
                            <ResortCard key={index} resort={resort} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ResortIndex;