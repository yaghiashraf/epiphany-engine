'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Stars, Sparkles, Torus, Sphere, Box, Cylinder, Icosahedron, Text } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// --- SCENE COMPONENTS ---

function FireScene() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((child, i) => {
        const t = state.clock.getElapsedTime();
        child.scale.setScalar(1 + Math.sin(t * 3 + i) * 0.2);
        child.position.y = (Math.sin(t * 2 + i) * 0.5) - 1;
      });
    }
  });

  return (
    <group ref={group}>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[Math.random()*2-1, 0, Math.random()*2-1]} rotation={[Math.random(), Math.random(), Math.random()]}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial 
            color="#ff4400" 
            emissive="#ff2200"
            emissiveIntensity={2}
            toneMapped={false}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      <pointLight position={[0, 0, 0]} intensity={5} color="#ffaa00" distance={5} />
      <Sparkles count={50} scale={4} size={2} speed={0.4} opacity={0.5} color="#ffaa00" />
    </group>
  );
}

function WheelScene() {
  return (
    <group rotation={[0, Math.PI / 4, Math.PI / 2]}>
      <mesh>
        <cylinderGeometry args={[2.5, 2.5, 0.5, 32]} />
        <meshStandardMaterial color="#5d4037" roughness={0.8} />
      </mesh>
      <mesh rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 3, 16]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      {[0, 1, 2, 3].map(i => (
          <mesh key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
              <boxGeometry args={[0.2, 4.8, 0.2]} />
              <meshStandardMaterial color="#3e2723" />
          </mesh>
      ))}
    </group>
  );
}

// Updated: Information Dissemination (Abstract Flow)
function WritingScene() {
    const particles = useMemo(() => {
        return [...Array(20)].map(() => ({
            pos: [Math.random()*4-2, Math.random()*4-2, Math.random()*4-2],
            scale: Math.random() * 0.5 + 0.5
        }));
    }, []);

    useFrame((state) => {
       const t = state.clock.getElapsedTime();
       // Add gentle wave motion to "thought particles"
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {particles.map((p, i) => (
                    <mesh key={i} position={p.pos as any} scale={p.scale}>
                        <boxGeometry args={[0.2, 0.3, 0.05]} /> {/* Tablet/Glyph shape */}
                        <meshStandardMaterial color="#e0c9a6" emissive="#d4af37" emissiveIntensity={0.5} />
                    </mesh>
                ))}
            </Float>
            <Sparkles count={30} scale={5} color="#d4af37" size={2} opacity={0.5} />
        </group>
    );
}

// Updated: Mass Communication (Replication)
function PrintingScene() {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if(groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Central Source */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 1.5, 1]} />
                <meshStandardMaterial color="#555" metalness={0.8} />
            </mesh>
            
            {/* Expanding Circle of Pages */}
            {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                return (
                    <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
                        <mesh position={[Math.cos(angle)*3, Math.sin(angle)*0.5, Math.sin(angle)*3]} rotation={[0, -angle, 0]}>
                            <boxGeometry args={[0.8, 1.2, 0.05]} />
                            <meshStandardMaterial color="white" />
                        </mesh>
                    </Float>
                );
            })}
        </group>
    );
}

function SteamScene() {
    const pistonRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if(pistonRef.current) {
            pistonRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 5) * 1.5;
        }
    });

    return (
        <group>
            <mesh>
                <cylinderGeometry args={[1.2, 1.2, 4, 32]} />
                <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} opacity={0.5} transparent />
            </mesh>
            <mesh ref={pistonRef}>
                <cylinderGeometry args={[1, 1, 0.5, 32]} />
                <meshStandardMaterial color="#aaa" metalness={0.9} roughness={0.1} />
            </mesh>
        </group>
    );
}

function LightbulbScene() {
    return (
        <group>
            <mesh>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshPhysicalMaterial 
                    roughness={0} 
                    transmission={1} 
                    thickness={0.5} 
                    color="white"
                />
            </mesh>
            <mesh>
                <torusGeometry args={[0.5, 0.05, 16, 100]} />
                <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={5} toneMapped={false} />
            </mesh>
            <mesh position={[0, -1.8, 0]}>
                <cylinderGeometry args={[0.6, 0.6, 1, 32]} />
                <meshStandardMaterial color="#333" metalness={1} roughness={0.3} />
            </mesh>
            <pointLight intensity={2} color="#ffaa00" />
        </group>
    );
}

function FlightScene() {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group>
                <mesh rotation={[0, 0, Math.PI/2]} position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.3, 0.3, 4, 16]} />
                    <meshStandardMaterial color="#fff" />
                </mesh>
                <mesh position={[0, 0, 0]} scale={[4, 0.1, 1]}>
                    <boxGeometry />
                    <meshStandardMaterial color="#eee" />
                </mesh>
                <mesh position={[-1.8, 0.5, 0]} scale={[0.8, 1, 0.1]}>
                    <boxGeometry />
                    <meshStandardMaterial color="#eee" />
                </mesh>
            </group>
        </Float>
    );
}

function BlackDeathScene() {
    return (
        <group>
            <Sphere args={[1.5, 32, 32]}>
                <meshStandardMaterial color="#220000" roughness={0.9} />
            </Sphere>
            <Sparkles count={50} color="#ff0000" scale={4} opacity={0.5} />
            {[...Array(20)].map((_, i) => (
                <mesh key={i} rotation={[Math.random()*Math.PI, Math.random()*Math.PI, 0]} position={[0,0,0]}>
                    <cylinderGeometry args={[0.05, 0.02, 3.5]} />
                    <meshStandardMaterial color="#440000" />
                </mesh>
            ))}
        </group>
    );
}

// Updated: Global Conflict (Abstract Globe Impact)
function WW2Scene() {
    return (
        <group>
            <Sphere args={[2, 32, 32]}>
                <meshStandardMaterial color="#1a2a2a" roughness={0.8} />
            </Sphere>
            {/* Impact Zones */}
            {[...Array(6)].map((_, i) => (
                <mesh key={i} position={[Math.random()*2-1, Math.random()*2-1, 2]} scale={[0.2, 0.2, 0.2]}>
                    <sphereGeometry />
                    <meshStandardMaterial color="red" emissive="red" emissiveIntensity={2} />
                </mesh>
            ))}
            <Sparkles count={30} color="red" scale={3} size={2} />
        </group>
    );
}

function MoonScene() {
    return (
        <group>
            <Sphere args={[2, 64, 64]}>
                <meshStandardMaterial color="#cccccc" roughness={0.9} bumpScale={0.1} />
            </Sphere>
            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                <group position={[2.5, 1, 0]} rotation={[0, 0, 0.5]}>
                    <mesh>
                        <coneGeometry args={[0.3, 0.8, 16]} />
                        <meshStandardMaterial color="white" />
                    </mesh>
                    <mesh position={[0, -0.5, 0]}>
                        <cylinderGeometry args={[0.1, 0.2, 0.5]} />
                        <meshStandardMaterial color="orange" emissive="orange" emissiveIntensity={2} />
                    </mesh>
                </group>
            </Float>
            <Stars />
        </group>
    );
}

function InternetScene() {
    const nodes = useMemo(() => {
        return [...Array(15)].map(() => ({
            pos: [Math.random()*4-2, Math.random()*4-2, Math.random()*4-2] as [number, number, number]
        }));
    }, []);

    return (
        <group>
            {nodes.map((n, i) => (
                <mesh key={i} position={n.pos}>
                    <sphereGeometry args={[0.1]} />
                    <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
                </mesh>
            ))}
            <Sparkles count={100} scale={5} color="#00f0ff" size={2} speed={1} />
            <Sphere args={[1, 16, 16]} scale={[0.1, 0.1, 0.1]}>
                 <meshStandardMaterial color="white" />
            </Sphere>
        </group>
    );
}

function CrashScene() {
    return (
        <group>
            <group rotation={[0, 0, -Math.PI/4]}>
                <mesh position={[0, 1, 0]}>
                    <boxGeometry args={[0.5, 4, 0.5]} />
                    <meshStandardMaterial color="red" />
                </mesh>
                <mesh position={[0, -1.5, 0]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.8, 1.5, 4]} />
                    <meshStandardMaterial color="red" />
                </mesh>
            </group>
            {[...Array(5)].map((_, i) => (
                <Float key={i} speed={3} rotationIntensity={2} floatIntensity={2}>
                    <mesh position={[Math.random()*4-2, Math.random()*4-2, Math.random()*2]}>
                        <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
                        <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.3} />
                    </mesh>
                </Float>
            ))}
        </group>
    );
}

function CryptoScene() {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
            <group rotation={[Math.PI/2, 0, 0]}>
                <cylinderGeometry args={[2, 2, 0.2, 64]} />
                <meshStandardMaterial color="#f7931a" metalness={0.8} roughness={0.2} />
            </group>
            <mesh position={[0, 0, 0.15]}>
                <boxGeometry args={[1, 2.5, 0.1]} />
                <meshStandardMaterial color="#fff" />
            </mesh>
        </Float>
    );
}

function CovidScene() {
    return (
        <Float speed={1} rotationIntensity={0.5} floatIntensity={0.2}>
            <mesh>
                <icosahedronGeometry args={[1.5, 1]} />
                <meshStandardMaterial color="#00ff88" roughness={0.5} />
            </mesh>
            {[...Array(20)].map((_, i) => (
                <mesh key={i} rotation={[Math.random()*Math.PI, Math.random()*Math.PI, 0]} position={[0,0,0]}>
                    <cylinderGeometry args={[0.1, 0.1, 3.8]} />
                    <meshStandardMaterial color="#ff3333" />
                </mesh>
            ))}
        </Float>
    );
}

function AIScene() {
    return (
        <group>
            <Float speed={2} rotationIntensity={0.5}>
                <mesh>
                    <icosahedronGeometry args={[1.8, 2]} />
                    <meshStandardMaterial color="#bf00ff" wireframe />
                </mesh>
                <mesh>
                    <icosahedronGeometry args={[1.6, 1]} />
                    <meshStandardMaterial color="#5500aa" opacity={0.5} transparent />
                </mesh>
            </Float>
            <Sparkles count={50} color="#bf00ff" scale={5} size={3} />
        </group>
    );
}

// --- MAIN COMPONENT ---

export default function EventAnimation({ id, color }: { id: string; color: string }) {
  
  const getScene = () => {
    switch (id) {
        case 'fire': return <FireScene />;
        case 'wheel': return <WheelScene />;
        case 'writing': return <WritingScene />;
        case 'blackdeath': return <BlackDeathScene />;
        case 'printing': return <PrintingScene />;
        case 'steam': return <SteamScene />;
        case 'lightbulb': return <LightbulbScene />;
        case 'flight': return <FlightScene />;
        case 'ww2': return <WW2Scene />;
        case 'moon': return <MoonScene />;
        case 'internet': return <InternetScene />;
        case 'crash2008': return <CrashScene />;
        case 'crypto': return <CryptoScene />;
        case 'covid': return <CovidScene />;
        case 'ai': return <AIScene />;
        default: return <Sphere args={[1, 32, 32]}><meshStandardMaterial color={color} /></Sphere>;
    }
  };

  return (
    <div className="w-full h-full">
        {/* Adjusted camera Z for zoom-out context */}
        <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color={color} />
            
            <Environment preset="city" />
            <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1} />
            
            {getScene()}
        </Canvas>
    </div>
  );
}