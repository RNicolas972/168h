import React, { useEffect } from 'react';
import { ModelsLoader } from '../models/modelsLoader';
import { AnimationsLoader } from '../models/animationsLoader';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Clock } from 'three/src/core/Clock.js';
import { AnimationMixer } from 'three/src/animation/AnimationMixer.js';

import {
    Scene,
    Color,
    AmbientLight,
    AxesHelper,
    WebGLRenderer,
    PerspectiveCamera
} from 'three';

const AnimationComponent = () => {

    const initScene = async () => {

        let clock, mixer, actions, activeAction, previousAction;

        clock = new Clock();

        const canvas = document.getElementById('robot-renderer');
        const containerWidth = document.querySelector('div.main-container').offsetWidth;
        const renderer = new WebGLRenderer({ canvas });

        renderer.setSize(containerWidth, containerWidth / 2);
        document.querySelector('div.main-container').appendChild(renderer.domElement);

        const sceneObj = [];
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const light = new AmbientLight(0xFFFFF, 1);
        sceneObj.push(light);
        // SCENE SETUP
        const scene = new Scene();
        scene.background = new Color("rgb(38, 118, 255)");

        // CAMERA SETUP
        camera.position.x = 3;
        camera.position.z = 5;
        camera.lookAt(0, 0, 0);

        sceneObj.push(camera);
        // AXESHELPER SETUP
        const axesHelper = new AxesHelper(500);
        sceneObj.push(axesHelper);

        const animate = () => {
            setupKeyControls();      
            const dt = clock.getDelta();

			if (mixer) mixer.update(dt);
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        // ORBITCONTROLS SETUP
        const orbit = new OrbitControls(camera, renderer.domElement);
        sceneObj.push(orbit);

        const model = await ModelsLoader.load("RobotExpressive.glb");
        const animations = await AnimationsLoader.load("RobotExpressive.glb");

        model.position.set(0, 0.85, 0);
        model.scale.set(1, 1, 1);

        sceneObj.push(model);

        createGUI(model, animations);

        function createGUI(model, animations) {
            const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'];
            const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'];

            mixer = new AnimationMixer(model);
            actions = {};

            for (let i = 0; i < animations.length; i++) {
                const clip = animations[i];
                const action = mixer.clipAction(clip);
                actions[clip.name] = action;

                if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
                    action.clampWhenFinished = true;
                    action.loop = mixer.LoopOnce;
                }
            }

            activeAction = actions['Idle'];
            activeAction.play();
        }

        function fadeToAction(name, duration) {

			previousAction = activeAction;
			activeAction = actions[name];

			if (previousAction !== activeAction) {

				previousAction.fadeOut(duration);

			}

			activeAction
				.reset()
				.setEffectiveTimeScale(1)
				.setEffectiveWeight(1)
				.fadeIn(duration)
				.play();

		}


        function setupKeyControls(event) {
            document.onkeyup = function(e) {
                fadeToAction("Idle", .2);
            }

            document.onkeydown = function (e) {
                fadeToAction("Walking", .2);
                switch (e.keyCode) {
                    default:
                        break;
                    case 37:
                        
                        model.rotation.y = 1.5;
                        model.position.x += .07;
                        break;
                    case 38:
                        model.rotation.y = -3;
                        model.position.z -= .07;
                        break;
                    case 39:
                        model.rotation.y = -1.5;
                        model.position.x -= .07;
                        break;
                    case 40:
                        model.rotation.y = 0;
                        model.position.z += .07;
                        break;
                    case 32:
                        fadeToAction("Jump", .2);
                        break;
                }
            }      
        }

        sceneObj.forEach((elt) => {
            scene.add(elt);
        });

        animate();
    }


    useEffect(() => {
        (async () => {
            await initScene();
        })()
    });

    return (
        <div className="main-container">
            <h3>Animer un model</h3>
            <p>
                Précedement, nous avons importé un model auquel nous lui avons ajouté la possibilité de se déplacer.<br />
                Dans cette partie, nous allons apprendre à utiliser les animations d'un model dans une scène.
            </p>
            <canvas id="robot-renderer"></canvas>
        </div>
    );
}

export {
    AnimationComponent
}