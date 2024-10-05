import React, {useEffect,useRef} from "react";
import * as THREE from "three";

const AudioVisualizer = () => {
    const mountRef = useRef<any>(null);
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth,window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        const material = new THREE.LineBasicMaterial({
            color: 0x0fff00
        });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        camera.position.z = 5;
        // Web Audio API setup
        const audioContext = new (window.AudioContext)();
        const analyser = audioContext.createAnalyser();
        navigator.mediaDevices.getUserMedia({
            audio:true
        }).then((stream) =>{
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            analyser.fftSize = 256;
            const bufferLenght = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLenght);
       
        const animate = () =>{
            requestAnimationFrame(animate);
            analyser.getByteTimeDomainData(dataArray);
            const position = new Float32Array(bufferLenght * 3);

            for (let index = 0; index < bufferLenght; index++) {
                const x = (index / bufferLenght) * 10 -5;
                const y = (dataArray[index] / 128.0) * 2 - 1;
                position[index * 3] = x;
                position[index * 3 + 1] = y;
                position[index * 3 + 2] = 0;
            }
            geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
            renderer.render(scene, camera);
        };
        animate();
    });
       
        return () => {
            mountRef.current.removeChild(renderer.domElement);
        }
    },[]);
    return <div ref={mountRef} />;
}

export default AudioVisualizer;