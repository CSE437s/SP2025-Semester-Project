// import * as THREE from 'three';
import { Canvas, useThree, useFrame  } from '@react-three/fiber';
import { useGLTF, OrbitControls, Html, useProgress, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Suspense, useState, useEffect } from 'react';

const availableModels = [
    { name: "Jackson Hole", path: "/models/jackson-hole.glb" },
    { name: "Telluride", path: "/models/telluride.glb" },
    { name: "Mt. Baker", path: "/models/mt-baker.glb" },
    // { name: "Snowbird", path: "/models/snowbird.glb" }
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

const MountainDropdown: React.FC<{ onSelectModel: (path: string) => void }> = ({ onSelectModel }) => {
    return (
        <div className="absolute top-5 left-3 z-10">
            <div className="bg-white bg-opacity-80 p-2 shadow-md">
                <select 
                className="px-2 py-1 rounded border"
                onChange={(e) => onSelectModel(e.target.value)}
                defaultValue={availableModels[0].path}
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
    const [selectedModel, setSelectedModel] = useState(availableModels[0].path);
    // Set the initial camera distance
    const [cameraDistance, setCameraDistance] = useState(40000);

    // Camera controls component that sets the initial camera position
    const CameraSetup = () => {
        const { camera } = useThree();
        
        useEffect(() => {
            // Position camera at a 45-degree angle above the scene
            // const offset = cameraDistance / Math.sqrt(3); // Equal distance in each direction
            // camera.position.set(offset, offset, offset);
            // camera.lookAt(0, 0, 0);

            // Position camera above the scene
            camera.position.set(0, cameraDistance, 0);
            camera.lookAt(0, 0, 0);
        }, [camera, cameraDistance]);
        
        return null;
    };

    return (
        <main className="h-[calc(100vh-3rem)] mt-12 w-full relative">
            <div id="camera-position" className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded font-mono z-10">
                X: 0 Y: 0 Z: 0
            </div>
            <ModelPreloader />
            <Canvas                 
                camera={{
                    fov: 75,
                    near: 0.1,
                    far: 150000
                }}>
                <Suspense fallback={<Loader />}>
                    <CameraSetup />
                    <OrbitControls 
                        minDistance={1500}
                        maxDistance={50000}
                        enableDamping={true}
                        dampingFactor={0.50}
                        maxPolarAngle={Math.PI/2} // lock camera above horizon
                    />
                    <ambientLight intensity={1} />
                    <Model modelPath={selectedModel} />

                    <GizmoHelper alignment="top-right" margin={[70, 70]}>
                        <GizmoViewport />
                    </GizmoHelper>

                    {/* Display current camera position */}
                    <CameraPosition />
                </Suspense>
            </Canvas>
            <MountainDropdown onSelectModel={setSelectedModel} />
        </main>
    );
};

export default Render;