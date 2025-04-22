import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

interface SnowEffectProps {
    count?: number;
    areaWidth?: number;
    areaDepth?: number;
    areaTop?: number;
    areaBottom?: number;
}

export const SnowEffect: React.FC<SnowEffectProps> = ({ 
    count = 5000, 
    areaWidth = 80000, 
    areaDepth = 60000, 
    areaTop = 30000, 
    areaBottom = 0 
}) => {
    const pointsRef = useRef<THREE.Points>(null!);
    
    // Generate random initial positions and speeds for snowflakes
    const [positions, speeds] = useMemo(() => {
        const posArray = new Float32Array(count * 3);
        const speedArray = new Float32Array(count);
        
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            posArray[i3] = Math.random() * areaWidth - areaWidth / 2; // X
            posArray[i3 + 1] = Math.random() * (areaTop - areaBottom) + areaBottom; // Y
            posArray[i3 + 2] = Math.random() * areaDepth - areaDepth / 2; // Z
            
            // Assign a random speed to each snowflake
            speedArray[i] = 400 + Math.random() * 300; // Varied speed between 400-700
        }
        return [posArray, speedArray];
    }, [count, areaWidth, areaDepth, areaTop, areaBottom]);

    // Animate snow falling
    useFrame((_state, delta) => {
        if (!pointsRef.current) return;
        
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const y = i3 + 1; // Y position index
            
            // Move down based on individual speed and time delta
            positions[y] -= speeds[i] * delta;

            // Reset snowflake to the top if it falls below the bottom
            if (positions[y] < areaBottom) {
                positions[y] = areaTop;
                // Randomize X/Z on reset
                positions[i3] = Math.random() * areaWidth - areaWidth / 2;     // X
                positions[i3 + 2] = Math.random() * areaDepth - areaDepth / 2; // Z
            }
        }
        
        // Inform Three.js that the positions need updating
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial 
                transparent 
                color="#ffffff" 
                size={100}
                sizeAttenuation={true} 
                depthWrite={false}
            />
        </Points>
    );
};