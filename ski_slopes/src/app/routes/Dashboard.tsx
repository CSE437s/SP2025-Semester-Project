import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Suspense } from 'react';

const Model: React.FC = () => {
    try {
        const { scene } = useGLTF("/models/jackson-hole.glb");
        return <primitive object={scene} scale={1} position={[0, -1, 0]} />;
    } catch (error) {
        console.error("Error loading model:", error);
        return null; // Don't break the render process
    }
};

const Dashboard: React.FC = () => {
    
    return (
        <main className="h-[calc(100vh-3rem)] mt-12 w-full">
            <div className="grid h-full grid-cols-1 md:grid-cols-12">
                {/* Left half grid container */}
                <div className="bg-yellow-100 col-span-8 h-full">
                    <Canvas>
                        <Suspense fallback={<div>Loading Model...</div>}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[5, 5, 5]} intensity={1} />
                            <Model />
                            <OrbitControls />
                        </Suspense>
                    </Canvas>
                </div>

                {/* Right half grid container */}
                <div className="col-span-4 grid grid-rows-2">
                    {/* Top half */}
                    <div className="bg-blue-100"></div>
                    {/* Bottom half */}
                    <div className="bg-green-100"></div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard;