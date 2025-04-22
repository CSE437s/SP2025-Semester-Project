import { Canvas, useThree, useFrame  } from '@react-three/fiber';
import { useGLTF, OrbitControls, Html, useProgress, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Suspense, useState, useEffect } from 'react';
import { JacksonResortMarker, JacksonMapMarker, JacksonBillboard, JacksonWeatherSidebar, JacksonTravelSidebar } from "@/components/JacksonObjects";
import { TellurideResortMarker, TellurideMapMarker, TellurideBillboard, TellurideTravelSidebar, TellurideWeatherSidebar } from "@/components/TellurideObjects";
import { BakerResortMarker, BakerMapMarker, BakerBillboard, BakerWeatherSidebar, BakerTravelSidebar } from "@/components/BackerObjects";
import { SnowEffect } from '@/components/SnowEffect'; 
import { useSearchParams } from 'react-router-dom';

const availableModels = [
    { name: "Jackson Hole", path: "/models/jackson-hole.glb", slug: "jackson-hole" },
    { name: "Telluride", path: "/models/telluride.glb", slug: "telluride" },
    { name: "Mt. Baker", path: "/models/mt-baker.glb", slug: "mt-baker" },
    // { name: "Snowbird", path: "/models/snowbird.glb", slug: "snowbird" }
];

const Loader: React.FC = () => {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
};

// Add a preloader component
const ModelPreloader: React.FC = () => {
    useEffect(() => {
        availableModels.forEach(model => {
            useGLTF.preload(model.path);
        });
    }, []);
    return null;
};

const Model: React.FC<{ modelPath: string }> = ({ modelPath }) => {
    const { scene } = useGLTF(modelPath);
    return <primitive object={scene} />;
};

const MountainDropdown: React.FC<{ onSelectModel: (path: string) => void, selectedValue: string }> = ({ onSelectModel, selectedValue }) => {
    return (
        <div className="absolute top-5 left-3 z-10">
            <div className="bg-white bg-opacity-80 p-2 shadow-md">
                <select 
                className="px-2 py-1 rounded border"
                onChange={(e) => onSelectModel(e.target.value)}
                value={selectedValue}
                >
                {availableModels.map((model) => (
                    <option key={model.path} value={model.path}>
                    {model.name}
                    </option>
                ))}
                </select>
            </div>
        </div>
    );
};

const CameraPosition = () => {
    const { camera } = useThree();
    useFrame(() => {
        const pos = camera.position.toArray().map(n => n.toFixed(2));
        const div = document.getElementById('camera-position');
        if (div) {
            div.textContent = `X: ${pos[0]} Y: ${pos[1]} Z: ${pos[2]}`;
        }
    });
    return null;
};

const Render: React.FC = () => {
    const [searchParams] = useSearchParams();
    const resortParam = searchParams.get('resort');
    
    // Find the correct model path based on the resort parameter
    const getInitialModel = () => {
        if (resortParam) {
            const foundModel = availableModels.find(model => model.slug === resortParam);
            return foundModel ? foundModel.path : availableModels[0].path;
        }
        return availableModels[0].path;
    };
    
    const [selectedModel, setSelectedModel] = useState(getInitialModel());
    // Set the initial camera distance
    const [cameraDistance, _setCameraDistance] = useState(40000);
    // const [showSnow, setShowSnow] = useState(true);


    const CameraSetup = () => {
        // Camera controls component that sets the initial camera position
        const { camera} = useThree();
        useEffect(() => {
            // Position camera above the scene
            camera.position.set(0, cameraDistance, 0);
            camera.lookAt(0, 0, 0);
            console.log("cameraDistance", cameraDistance);
        }, [camera, cameraDistance, selectedModel]);
        return null;
    };

    return (
        <main className="h-[calc(100vh-3rem)] mt-12 w-full relative">
            <div id="camera-position" className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded font-mono z-10">
                X: 0 Y: 0 Z: 0
            </div>

            {/* Toggles */}
            <div className="absolute bottom-4 left-3 z-10 bg-white/80 shadow-md rounded p-3 text-sm max-w-sx space-y-1">
                {/* <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={showSnow} onChange={() => setShowSnow(!showSnow)} />
                    <span>Show Snow</span>
                </label> */}
                <h4 className="font-semibold text-gray-700 border-b pb-1 mb-2">Controls</h4>
                <ul className="space-y-1 text-gray-600">
                    <li><kbd className="inline-block px-1.5 py-0.5 border rounded bg-gray-200 font-mono text-xs">RMB</kbd> + Drag: Rotate</li>
                    <li><kbd className="inline-block px-1.5 py-0.5 border rounded bg-gray-200 font-mono text-xs">LMB</kbd> + Drag: Pan</li>
                    <li><kbd className="inline-block px-1.5 py-0.5 border rounded bg-gray-200 font-mono text-xs">Shift</kbd> + <kbd className="inline-block px-1.5 py-0.5 border rounded bg-gray-200 font-mono text-xs">RMB</kbd> + Drag: Pan</li>
                    <li><kbd className="inline-block px-1.5 py-0.5 border rounded bg-gray-200 font-mono text-xs">Scroll</kbd> : Zoom</li>
                </ul>


            </div>

            <ModelPreloader />
            <Canvas               
                camera={{
                    fov: 75,
                    near: 0.1,
                    far: 160000
                }}>
                <Suspense fallback={<Loader />}>
                    <CameraSetup />
                    <OrbitControls 
                        key={selectedModel}
                        minDistance={1500}
                        maxDistance={75000}
                        enableDamping={true}
                        dampingFactor={0.50}
                        maxPolarAngle={Math.PI/2} // lock camera above horizon
                    />
                    {/* <ambientLight intensity={1} /> */}
                    <directionalLight 
                        position={[10000, 20000, 10000]} // Position it high and to the side
                        intensity={1.5}
                        color={0xfff0dd} // Set a warm, slightly yellowish color
                    />
                    <Model modelPath={selectedModel} />
                    {/* Snow Effect */}
                    <SnowEffect key={`snow-${selectedModel}`} count={5000} areaTop={45000} />

                    <GizmoHelper alignment="top-right" margin={[70, 70]}>
                        <GizmoViewport />
                    </GizmoHelper>

                    {selectedModel === "/models/jackson-hole.glb" && 
                        <>
                            <JacksonResortMarker />
                            <JacksonMapMarker />
                            <JacksonBillboard />
                            <JacksonWeatherSidebar />
                            <JacksonTravelSidebar />
                        </>
                    }

                    {selectedModel === "/models/telluride.glb" &&
                        <>
                            <TellurideResortMarker />
                            <TellurideMapMarker />
                            <TellurideBillboard />
                            <TellurideWeatherSidebar />
                            <TellurideTravelSidebar />
                        </>
                    }

                    {selectedModel === "/models/mt-baker.glb" &&
                        <>
                            <BakerResortMarker />
                            <BakerMapMarker />
                            <BakerBillboard />
                            <BakerWeatherSidebar />
                            <BakerTravelSidebar />
                        </>
                    }

                    {/* Display current camera position */}
                    <CameraPosition />
                </Suspense>
            </Canvas>
            <MountainDropdown onSelectModel={setSelectedModel} selectedValue={selectedModel} />
        </main>
    );
};

export default Render;