import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";

const SPEED = 5;
const JUMP_VELOCITY = 5;
const GRAVITY = -9.8;

const Player: React.FC = () => {
  const controlsRef = useRef<any>(null);
  const keys = useRef<{ [key: string]: boolean }>({});
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const [onGround, setOnGround] = useState(true);

  // Tastatur-Handling
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true;
      if (e.key === " " && onGround) {
        velocity.current.y = JUMP_VELOCITY;
        setOnGround(false);
      }
    };
    const up = (e: KeyboardEvent) => (keys.current[e.key.toLowerCase()] = false);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [onGround]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    const move = new THREE.Vector3();

    // Bewegungsinput
    if (keys.current["w"]) move.z -= SPEED * delta;
    if (keys.current["s"]) move.z += SPEED * delta;
    if (keys.current["a"]) move.x -= SPEED * delta;
    if (keys.current["d"]) move.x += SPEED * delta;

    const camQuat = controlsRef.current.getObject().quaternion;
    move.applyQuaternion(camQuat);

    //  horizontale Bewegung
    move.y = 0;
    controlsRef.current.getObject().position.add(move);

    // Gravity
    velocity.current.y += GRAVITY * delta;
    controlsRef.current.getObject().position.y += velocity.current.y * delta;

    // Bodencheck
    if (controlsRef.current.getObject().position.y <= 1.5) {
      controlsRef.current.getObject().position.y = 1.5;
      velocity.current.y = 0;
      setOnGround(true);
    }
  });

  return <PointerLockControls ref={controlsRef} />;
};

export default Player;
