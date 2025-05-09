import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

interface SnowEffectProps {
    count?: number;
    areaWidth?: number; // Width (X) of the area snow falls in
    areaDepth?: number; // Depth (Z) of the area snow falls in
    areaTop?: number;   // Y position where snow starts
    areaBottom?: number; // Y position where snow disappears/resets
}

export const SnowEffect: React.FC<SnowEffectProps> = ({ 
    count = 5000, 
    areaWidth = 60000, 
    areaDepth = 60000, 
    areaTop = 30000, 
    areaBottom = 0 
}) => {
    const pointsRef = useRef<THREE.Points>(null!);

    // Generate random initial positions for snowflakes
    const positions = useMemo(() => {
        const posArray = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i += 3) {
            posArray[i] = Math.random() * areaWidth - areaWidth / 2; // X
            posArray[i + 1] = Math.random() * (areaTop - areaBottom) + areaBottom; // Y
            posArray[i + 2] = Math.random() * areaDepth - areaDepth / 2; // Z
        }
        return posArray;
    }, [count, areaWidth, areaDepth, areaTop, areaBottom]);

    // Animate snow falling
    useFrame((_state, delta) => {
        if (!pointsRef.current) return;
        
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const fallSpeed = 500 + Math.random() * 200; // Slightly varied speed

        for (let i = 1; i < positions.length; i += 3) { // Index 1 is Y
            positions[i] -= fallSpeed * delta; // Move down based on time delta

            // Reset snowflake to the top if it falls below the bottom
            if (positions[i] < areaBottom) {
                positions[i] = areaTop;
                 // ~ slightly randomize X/Z on reset
                positions[i - 1] = Math.random() * areaWidth - areaWidth / 2;
                positions[i + 1] = Math.random() * areaDepth - areaDepth / 2;
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
                depthWrite={false} // Prevent writing to depth buffer for better blending
            />
        </Points>
    );
};